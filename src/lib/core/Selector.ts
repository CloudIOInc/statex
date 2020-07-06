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
} from "./StateXTypes";
import {
  Resolvable,
  StateXSetter,
  Options,
  StateXRemover,
} from "./StateXTypes";
import type { Node } from "./Trie";
import type { Path, Key } from "./ImmutableTypes";
import {
  isPromise,
  applyParamsToPath,
  emptyFunction,
  pathToString,
} from "./StateXUtils";
import {
  enterStateX,
  getNode,
  makeGet,
  makeSet,
  makeRemove,
  makeGetRef,
  makeCall,
} from "./StateX";
import { StateX } from "./StateXStore";

function notWritableSelector<T>(): T {
  throw Error("Not a writable selector!");
}

export default class Selector<T> implements SelectorInterface<T> {
  private readonly _get: Select<T>;
  private readonly _set: Write<T>;
  readonly path?: Path;
  dynamic: boolean = false;
  params = new Map<string, number>();
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
      if (typeof key === "string" && key.charAt(0) === ":") {
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
          resolvable.status = "resolved";
          if (!resolvable.cancelled) {
            if (self) {
              // react doesn't re-render if we return the same resolveable... hence clone it
              selectorNode.data.resolveable = resolvable.clone();
              selectorNode.data.selectorValue = value;
              this.inform(store, value, selectorNode, self);
            } else {
              this.update(store, selectorNode, params);
            }
          }
          return value;
        })
        .catch((error) => {
          resolvable.error = error;
          resolvable.status = "error";
          store.catch(error);
          if (!resolvable.cancelled) {
            // react doesn't re-render if we return the same resolveable... hence clone it
            selectorNode.data.resolveable = resolvable.clone();
            selectorNode.data.holders.forEach((holder) =>
              holder.setter(selectorNode.data.resolveable)
            );
          }
        });
    } else {
      resolvable.error = promiseOrError;
      resolvable.status = "error";
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
      options?: Options;
      remove: StateXRemover;
      set: StateXSetter;
    },
  ): T | Resolvable<T> => {
    const { call, get, getRef, set, remove, options } = props;
    const path = applyParamsToPath(this.pathWithParams, options?.params);
    const selectorNode = getNode(store, path) as Node<NodeDataWithSelector<T>>;
    let value: T | Promise<T>;
    store.activateNode(selectorNode, "read");
    store.beforeSelectorGet(selectorNode);
    try {
      value = this._get({
        call,
        get,
        getRef,
        params: options?.params,
        remove,
        set,
      }) ?? this.defaultValue;
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
      const value = this.selectValueWithStateXHolder(store, options);
      if (!isResolvable(value)) {
        store.selectorInitialized(selectorNode);
      }
      return value;
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
          call: makeCall(store),
          get: makeGet(store),
          getRef: makeGetRef(store),
          params: options?.params,
          remove: makeRemove(store),
          set: makeSet(store),
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
    /* istanbul ignore next */
    if (unreg) {
      console.warn(
        "Node already registered",
        pathToString(selectorNode.path),
        pathToString(node.path),
      );
      unreg();
    }
    const stateXHolder: StateXHolder<T> = {
      // do nothing during initial enterStateX callback
      setter: emptyFunction,
      node: selectorNode,
    };
    const leaveStateX = enterStateX(store, node, stateXHolder);
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
      selectorNode.data.holders.forEach((holder) => holder.setter(val));
    } else {
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
      call: makeCall(store),
      get: makeGet(store, nodes),
      getRef: makeGetRef(store),
      options,
      remove: makeRemove(store),
      set: makeSet(store),
    });
    nodes.forEach((node) => {
      /* istanbul ignore next */
      if (selectorNode.data.previousNodes === undefined) {
        console.log(selectorNode);
        throw Error("invalid node!");
      }
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

  informInitialChange(
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T>>,
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
    selectorNode: Node<NodeDataWithSelector<T>>,
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
            set: makeSet(store),
            value: val,
          });
          store.afterOnChange(holder.node);
        }
      });
    }
  }
}
