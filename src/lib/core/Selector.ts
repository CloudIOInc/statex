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
} from './StateXTypes';
import {
  Resolvable,
  StateXSetter,
  Options,
  StateXRemover,
} from './StateXTypes';
import type { Node } from './Trie';
import type { Path, Key } from './ImmutableTypes';
import { isPromise, applyParamsToPath } from './StateXUtils';
import {
  enterStateX,
  getNode,
  makeGet,
  makeSet,
  makeRemove,
  makeGetRef,
} from './StateX';
import { StateX } from './StateXStore';

function notWritableSelector<T>(): T {
  throw Error('Not a writable selector!');
}

export default class Selector<T> implements SelectorInterface<T> {
  private readonly _get: Select<T>;
  private readonly _set: Write<T>;
  readonly path?: Path;
  dynamic: boolean = false;
  params = new Map();
  pathWithParams: Path;
  defaultValue: T;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;

  constructor({
    path,
    get,
    set,
    shouldComponentUpdate,
    defaultValue,
  }: SelectorProps<T>) {
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
    selectorNode: Node<NodeDataWithSelector<T>>,
    self: boolean,
    promiseOrError: Promise<T> | Error,
    params?: Record<string, Key>,
  ) {
    if (selectorNode.data.resolveable) {
      // cancel the pending resolvable
      selectorNode.data.resolveable.cancelled = true;
    }
    const resolvable = new Resolvable<T>(selectorNode, self);
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
              this.update(store, selectorNode, params);
            }
            // setStateXValue(this.pathWithParams, value, { params });
          }
          return value;
        })
        .catch((error) => {
          resolvable.error = error;
          resolvable.status = 'error';
          if (!resolvable.cancelled) {
            try {
              // react doesn't re-render if we return the same resolveable... hence clone it
              selectorNode.data.resolveable = resolvable.clone();
              selectorNode.data.holders.forEach((holder) =>
                holder.setter(selectorNode.data.resolveable),
              );
            } catch (error) {
              console.error(error);
            }
          }
        });
    } else {
      resolvable.error = promiseOrError;
      resolvable.status = 'error';
    }
    selectorNode.data.resolveable = resolvable;
    return resolvable;
  }

  private _evaluate = (
    store: StateX,
    props: {
      get: StateXGetter;
      getRef: StateXRefGetter;
      set: StateXSetter;
      remove: StateXRemover;
      options?: Options;
    },
  ): T | Resolvable<T> => {
    const { get, getRef, set, remove, options } = props;
    const path = applyParamsToPath(this.pathWithParams, options?.params);
    const selectorNode = getNode(store, path) as Node<NodeDataWithSelector<T>>;
    let value: T | Promise<T>;
    store.activateNode(selectorNode, 'read');
    store.beforeSelectorGet(selectorNode);
    try {
      value = this._get({ get, getRef, set, remove, params: options?.params });
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
    selectorNode: Node<NodeDataWithSelector<T>>,
    options?: Options,
  ): T | Resolvable<T> => {
    if (!selectorNode.data.initialized) {
      selectorNode.data.previousNodes?.forEach((node) => {
        selectorNode.data.unregisterMap.get(node)?.();
      });
      selectorNode.data.unregisterMap = new Map();
      selectorNode.data.previousNodes = new Set();
      selectorNode.data.initialized = true;
      return this.selectValueWithStateXHolder(store, options);
    }
    if (selectorNode.data.resolveable) {
      return selectorNode.data.resolveable;
    }
    return selectorNode.data.selectorValue as T;
  };

  setValue = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T>>,
    value: T,
    options?: Options,
  ): T => {
    try {
      store.beforeSelectorSet(selectorNode);
      return this._set(
        {
          set: makeSet(store),
          getRef: makeGetRef(store),
          get: makeGet(store),
          remove: makeRemove(store),
          params: options?.params,
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
    selectorNode: Node<NodeDataWithSelector<T>>,
    node: Node<NodeData<any>>,
    options?: Options,
  ) => {
    const unreg = selectorNode.data.unregisterMap.get(node);
    if (unreg) {
      console.warn(
        'Node already registered',
        selectorNode.path.join('.'),
        node.path.join('.'),
      );
      unreg();
    }
    const stateXHolder: StateXHolder<T> = {
      setter: () => {
        // do nothing during initial enterStateX callback
      },
      node: selectorNode,
    };
    const leaveStateX = enterStateX(node, stateXHolder);
    stateXHolder.setter = () => this.update(store, selectorNode, options);
    selectorNode.data.unregisterMap.set(node, leaveStateX);
  };

  update = (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T>>,
    options?: Options,
  ) => {
    const val = this.selectValueWithStateXHolder(store, options);
    if (isResolvable(val)) {
      try {
        selectorNode.data.holders.forEach((holder) => holder.setter(val));
      } catch (error) {
        console.error(error);
      }
    } else {
      // update the state... this will trigger re-render on all components watching this atom
      // setStateXValue(this.pathWithParams, val, props);
      // trigger the selector component re-render
      selectorNode.data.selectorValue = val;
      this.inform(store, val, selectorNode, true);
    }
  };

  selectValueWithStateXHolder = (
    store: StateX,
    options?: Options,
  ): T | Resolvable<T> => {
    const path = applyParamsToPath(this.pathWithParams, options?.params);
    const selectorNode = getNode(store, path) as Node<NodeDataWithSelector<T>>;
    const nodes = new Set<Node<NodeData<any>>>();
    const value = this._evaluate(store, {
      get: makeGet(store, nodes),
      getRef: makeGetRef(store),
      set: makeSet(store),
      remove: makeRemove(store),
      options,
    });
    nodes.forEach((node) => {
      if (!selectorNode.data.previousNodes.has(node)) {
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

  private inform(
    store: StateX,
    val: T,
    selectorNode: Node<NodeDataWithSelector<T>>,
    self: boolean,
  ) {
    const { oldValue } = selectorNode.data;
    selectorNode.data.oldValue = val;
    let shouldSelectorUpdate = true;
    if (this.shouldComponentUpdate) {
      store.beforeShouldComponentUpdate(selectorNode);
      shouldSelectorUpdate = this.shouldComponentUpdate(val, oldValue);
      store.afterShouldComponentUpdate(selectorNode);
    }
    if (shouldSelectorUpdate) {
      selectorNode.data.holders.forEach((holder) => {
        if (holder.holding) {
          let shouldUpdate = true;
          if (holder.shouldComponentUpdate) {
            store.beforeShouldComponentUpdate(holder.node);
            shouldUpdate = holder.shouldComponentUpdate(val, oldValue);
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
              value: val,
              oldValue,
              get: makeGet(store),
              getRef: makeGetRef(store),
              set: makeSet(store),
            });
            store.afterOnChange(holder.node);
          }
        }
      });
    }
  }
}
