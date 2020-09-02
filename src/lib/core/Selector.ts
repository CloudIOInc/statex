/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  NodeData,
  NodeDataWithSelector,
  Select,
  SelectorInterface,
  SelectorProps,
  StateXGetter,
  StateXHolder,
  Write,
  isResolvable,
  StateXRefGetter,
  StateXActionCaller,
  StateXReseter,
  StateXRefSetter,
} from './StateXTypes';
import {
  Resolvable,
  StateXSetter,
  Options,
  StateXRemover,
} from './StateXTypes';
import type { Node } from './Trie';
import { Path, Key, isNull } from './ImmutableTypes';
import {
  isPromise,
  applyParamsToPath,
  emptyFunction,
  pathToString,
} from './StateXUtils';
import {
  enterStateX,
  getNode,
  makeGet,
  makeSet,
  makeRemove,
  makeGetRef,
  makeCall,
  makeReset,
  makeSetRef,
} from './StateX';
import { StateX } from './StateXStore';
import { hasIn } from './ImmutableUtils';

function notWritableSelector<T>(): T {
  throw Error('Not a writable selector!');
}

export function areEqualShallow(a: any, b: any) {
  if (isNull(a) && isNull(b)) {
    return true;
  }
  if (isNull(a) || isNull(b)) {
    return false;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (var key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

export default class Selector<T, P> implements SelectorInterface<T, P> {
  private readonly _get: Select<T, P>;
  private readonly _set: Write<T>;
  readonly path?: Path;
  dynamic: boolean = false;
  params = new Map<string, number>();
  pathWithParams: Path;
  defaultValue: T;
  oldProps?: P;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;

  constructor({
    path,
    get,
    set,
    shouldComponentUpdate,
    defaultValue,
  }: SelectorProps<T, P>) {
    this._get = get;
    this._set = set ?? notWritableSelector;
    this.defaultValue = defaultValue;
    this.pathWithParams = path;
    this.shouldComponentUpdate = shouldComponentUpdate;
    for (let i = 0; i < path.length; i++) {
      const key = path[i];
      if (typeof key === 'string' && key.charAt(0) === ':') {
        this.params.set(key.substr(1), i);
      }
    }
    if (this.params.size) {
      this.dynamic = true;
    }
  }

  makeResolvable(
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    self: boolean,
    promiseOrError: Promise<T> | Error,
    params?: Record<string, Key>,
  ) {
    if (selectorNode.data.resolveable) {
      // cancel the pending resolvable
      selectorNode.data.resolveable.cancelled = true;
    }
    const resolvable = new Resolvable<T, P>(selectorNode, self);
    // remove the previous selectorValue if any
    delete selectorNode.data.selectorValue;
    if (isPromise(promiseOrError)) {
      resolvable.promise = promiseOrError;
      promiseOrError
        .then((value) => {
          resolvable.value = value;
          resolvable.status = 'resolved';
          if (!resolvable.cancelled) {
            if (self) {
              // react doesn't re-render if we return the same resolveable... hence clone it
              selectorNode.data.resolveable = resolvable.clone();
              selectorNode.data.selectorValue = value;
              this.inform(store, value, selectorNode, self);
            } else {
              this.update(store, selectorNode, null, params);
            }
          }
          return value;
        })
        .catch((error) => {
          resolvable.error = error;
          resolvable.status = 'error';
          store.catch(error);
          if (!resolvable.cancelled) {
            // react doesn't re-render if we return the same resolveable... hence clone it
            selectorNode.data.resolveable = resolvable.clone();
            selectorNode.data.holders.forEach((holder) =>
              holder.setter(selectorNode.data.resolveable),
            );
          }
        });
    } else {
      resolvable.error = promiseOrError;
      resolvable.status = 'error';
      store.catch(promiseOrError);
    }
    selectorNode.data.resolveable = resolvable;
    return resolvable;
  }

  private _evaluate = (
    store: StateX,
    props: {
      call: StateXActionCaller;
      get: StateXGetter;
      getRef: StateXRefGetter;
      options?: Options<P>;
      remove: StateXRemover;
      reset: StateXReseter;
      set: StateXSetter;
      setRef: StateXRefSetter;
    },
  ): T | Resolvable<T, P> => {
    const { call, get, getRef, set, remove, reset, options, setRef } = props;
    const path = applyParamsToPath(this.pathWithParams, options?.params);
    const selectorNode = getNode(store, path) as Node<
      NodeDataWithSelector<T, P>
    >;
    let value: T | Promise<T>;
    store.activateNode(selectorNode, 'read');
    store.beforeSelectorGet(selectorNode);
    try {
      value =
        this._get(
          {
            call,
            get,
            getRef,
            params: options?.params,
            remove,
            reset,
            set,
            setRef,
          },
          options?.props as P,
        ) ?? this.defaultValue;
    } catch (errorOrPromise) {
      return this.makeResolvable(
        store,
        selectorNode,
        false,
        errorOrPromise,
        options?.params,
      );
    } finally {
      store.afterSelectorGet(selectorNode);
    }
    if (isPromise(value)) {
      return this.makeResolvable(
        store,
        selectorNode,
        true,
        value,
        options?.params,
      );
    } else {
      selectorNode.data.selectorValue = value;
      // remove the previous resolveable if any
      delete selectorNode.data.resolveable;
    }
    return value as T;
  };

  getValue = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    options?: Options<P>,
  ): T | Resolvable<T, P> => {
    if (!areEqualShallow(this.oldProps, options?.props)) {
      selectorNode.data.initialized = false;
    }
    if (!selectorNode.data.initialized) {
      let previousNodes = selectorNode.data.previousNodes;
      let unregisterMap = selectorNode.data.unregisterMap;
      selectorNode.data.unregisterMap = new Map();
      selectorNode.data.previousNodes = new Set();
      selectorNode.data.initialized = true;
      if (store.isMarkedToBeRemoved(selectorNode)) {
        // HMR may have unmounted and mounting it again
        store.unmarkToBeRemoved(selectorNode);
      }
      const value = this.selectValueWithStateXHolder(store, options);
      if (!isResolvable(value)) {
        store.selectorInitialized(selectorNode);
      }
      // defer unsubscribing as the same nodes might be subscribed again
      // deferring will prevent the nodes to be marked for removal
      previousNodes?.forEach((node) => {
        unregisterMap.get(node)?.();
      });
      return value;
    }
    if (selectorNode.data.resolveable) {
      return selectorNode.data.resolveable;
    }
    return selectorNode.data.selectorValue as T;
  };

  setValue = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    value: T,
    options?: Options<P>,
  ): T => {
    try {
      store.beforeSelectorSet(selectorNode);
      return this._set(
        {
          call: makeCall(store),
          get: makeGet(store),
          getRef: makeGetRef(store),
          params: options?.params,
          remove: makeRemove(store),
          reset: makeReset(store),
          set: makeSet(store),
          setRef: makeSetRef(store),
          value,
        },
        value,
      );
    } catch (error) {
      store.catch(error);
      throw error;
    } finally {
      store.afterSelectorSet(selectorNode);
    }
  };

  watchStateXForSelector = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    node: Node<NodeData<any, any>>,
    options?: Options<P>,
  ) => {
    const unreg = selectorNode.data.unregisterMap.get(node);
    /* istanbul ignore next */
    if (unreg) {
      console.warn(
        'Node already registered',
        pathToString(selectorNode.path),
        pathToString(node.path),
      );
      unreg();
    }
    const stateXHolder: StateXHolder<T, P> = {
      // do nothing during initial enterStateX callback
      setter: emptyFunction,
      node: selectorNode,
    };
    const leaveStateX = enterStateX(store, node, stateXHolder);
    stateXHolder.setter = () => this.update(store, selectorNode, node, options);
    selectorNode.data.unregisterMap.set(node, leaveStateX);
  };

  update = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    node: Node<NodeData<any>> | null,
    options?: Options<P>,
  ) => {
    /* istanbul ignore else */
    if (!node || store.trie().hasNode(node.path)) {
      if (node && !hasIn(store.getState(), node.path)) {
        // State at path node.parent.path is deleted! and the node will be unmounted
        // do not execute the select get to avoid population of default values
        node.data.valueRemoved = true;
      }
      const val = this.selectValueWithStateXHolder(store, options);
      if (isResolvable(val)) {
        selectorNode.data.holders.forEach((holder) => holder.setter(val));
      } else {
        selectorNode.data.selectorValue = val;
        this.inform(store, val, selectorNode, true);
      }
    } else {
      // Node at path node.path is deleted!
    }
  };

  selectValueWithStateXHolder = (
    store: StateX,
    options?: Options<P>,
  ): T | Resolvable<T, P> => {
    const path = applyParamsToPath(this.pathWithParams, options?.params);
    const selectorNode = getNode(store, path) as Node<
      NodeDataWithSelector<T, P>
    >;
    if (store.isMarkedToBeRemoved(selectorNode)) {
      throw Error(`selector deleted! ${pathToString(selectorNode.path)}`);
    }
    const nodes = new Set<Node<NodeData<any, any>>>();
    const value = this._evaluate(store, {
      call: makeCall(store),
      get: makeGet(store, nodes),
      getRef: makeGetRef(store),
      options,
      remove: makeRemove(store),
      reset: makeReset(store),
      set: makeSet(store),
      setRef: makeSetRef(store),
    });
    nodes.forEach((node) => {
      /* istanbul ignore next */
      if (selectorNode.data.previousNodes === undefined) {
        console.error(selectorNode);
        throw Error(`invalid node! ${pathToString(selectorNode.path)}`);
      }
      if (!selectorNode.data.previousNodes.has(node)) {
        if (store.isMarkedToBeRemoved(node)) {
          // HMR may have unmounted and mounting the selector again
          store.unmarkToBeRemoved(node);
        }
        // watch the atom
        this.watchStateXForSelector(store, selectorNode, node, options);
      } else {
        // already watching
        selectorNode.data.previousNodes.delete(node);
      }
    });
    selectorNode.data.previousNodes.forEach((node) => {
      // must be conditionally avoided... no need to watch the atom anymore
      selectorNode.data.unregisterMap.get(node)?.();
      selectorNode.data.unregisterMap.delete(node);
    });
    selectorNode.data.previousNodes = nodes;

    return value;
  };

  informInitialChange(
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
  ) {
    this.inform(
      store,
      selectorNode.data.selectorValue as T,
      selectorNode,
      true,
    );
  }

  inform(
    store: StateX,
    val: T,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    self: boolean,
  ) {
    const { oldSelectorValue } = selectorNode.data;
    selectorNode.data.oldSelectorValue = val;
    let shouldSelectorUpdate = true;
    if (this.shouldComponentUpdate) {
      store.beforeShouldComponentUpdate(selectorNode);
      shouldSelectorUpdate = this.shouldComponentUpdate(val, oldSelectorValue);
      store.afterShouldComponentUpdate(selectorNode);
    }
    if (shouldSelectorUpdate) {
      selectorNode.data.holders.forEach((holder) => {
        /* istanbul ignore next */
        if (!holder.holding) {
          return;
        }
        let shouldUpdate = true;
        if (holder.shouldComponentUpdate) {
          store.beforeShouldComponentUpdate(holder.node);
          shouldUpdate = holder.shouldComponentUpdate(val, oldSelectorValue);
          store.afterShouldComponentUpdate(holder.node);
        }
        if (shouldUpdate) {
          holder.setter(val);
        }
        // Do we need to call onChange
        // if atom.shouldComponentUpdate returns false?
        if (holder.onChange) {
          store.beforeOnChange(holder.node);
          holder.onChange({
            call: makeCall(store),
            get: makeGet(store),
            getRef: makeGetRef(store),
            oldValue: oldSelectorValue,
            remove: makeRemove(store),
            reset: makeReset(store),
            set: makeSet(store),
            setRef: makeSetRef(store),
            value: val,
          });
          store.afterOnChange(holder.node);
        }
      });
    }
  }
}
