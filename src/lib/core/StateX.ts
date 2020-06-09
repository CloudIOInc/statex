/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { SetStateAction } from 'react';
import type {
  NodeData,
  Path,
  StateXHolder,
  Options,
  PathOrStateXOrSelector,
  PathOrStateX,
} from './StateXTypes';
import { isResolvable, Resolvable, isSelectorNode } from './StateXTypes';
import { getIn } from './ImmutableUtils';
import { Node } from './Trie';
import {
  deepFreeze,
  applyParamsToPath,
  emptyObject,
  shouldFreeze,
} from './StateXUtils';
import { StateX } from './StateXStore';
import Atom from './Atom';
import Selector from './Selector';

function _getIn<T>(
  store: StateX,
  node: Node<NodeData<any>>,
  value?: T,
  mutableRefObject = true,
): T {
  if (node.path.length === 0) {
    return (store.getState() as unknown) as T;
  }

  const val = getIn(store.getState(), node.path, value) as T | undefined;
  if (val === undefined) {
    return value as T;
  }
  if (process.env.NODE_ENV === 'development') {
    return !mutableRefObject && val && typeof val === 'object'
      ? deepFreeze(val)
      : val;
  } else {
    return val;
  }
}

function isNodeDirty<T>(store: StateX, node: Node<NodeData<T>>) {
  const value = _getIn(store, node);
  return node.data.lastKnownValue !== value;
}

function getNode<T>(store: StateX, path: Path) {
  const missingParams = path.filter(
    (key) => typeof key === 'string' && key.indexOf(':') !== -1,
  );
  if (missingParams.length) {
    throw Error(
      `Missing parameter values for ${missingParams.join(
        ', ',
      )} in path ${JSON.stringify(path)}!`,
    );
  }
  return store.trie().getNode(path) as Node<NodeData<T>>;
}

function enterStateX<T>(
  node: Node<NodeData<T>>,
  stateXHolder: StateXHolder<T>,
) {
  node.data.holders.add(stateXHolder);
  stateXHolder.holding = true;
  return () => {
    stateXHolder.holding = false;
    node.data.holders.delete(stateXHolder);
  };
}

function getDirtyNodes(store: StateX) {
  const nodes = new Set<Node<NodeData<any>>>();
  let length: number;
  let node: Node<NodeData<any>>;
  let parentNode: Node<NodeData<any>>;
  let j: number;
  store.getPendingPaths().forEach((path) => {
    node = store.trie().getNode(path);
    if (!isNodeDirty(store, node)) {
      return;
    }
    nodes.add(node);
    const dirtyChildren = store
      .trie()
      .getAllChildNodes(path, (node) => isNodeDirty(store, node));
    dirtyChildren.forEach(nodes.add, nodes);
    const parentNodes = store.trie().getAllParentNodes(path);
    length = parentNodes.length;
    for (j = 0; j < length; j++) {
      parentNode = parentNodes[j];
      if (!nodes.has(parentNode)) {
        nodes.add(parentNode);
      } else {
        // parents already exists
        break;
      }
    }
  });
  return nodes;
}

function inform<T>(store: StateX) {
  const nodes = getDirtyNodes(store);
  store.clearPending();
  if (nodes.size === 0) {
    return;
  }
  if (process.env.NODE_ENV === 'development') {
    store.debug('Found ' + nodes.size + ' dirty nodes...', 'inform');
    // nodes.forEach((n) => store.debug(n.path.join('.'), 'inform'));
  }
  let total = 0;
  nodes.forEach((node) => {
    if (!isSelectorNode(node)) {
      const value = _getIn<T>(store, node);
      const { lastKnownValue, holders, atom } = node.data;
      const resolvable =
        isResolvable(lastKnownValue) && lastKnownValue.status === 'pending';
      if (value !== lastKnownValue) {
        node.data.lastKnownValue = value;
        if (
          resolvable ||
          !atom?.shouldComponentUpdate ||
          atom.shouldComponentUpdate(value, lastKnownValue)
        ) {
          holders.forEach((holder) => {
            if (holder.holding) {
              let shouldUpdate = true;
              if (holder.shouldComponentUpdate) {
                store.beforeShouldComponentUpdate(holder.node);
                shouldUpdate = holder.shouldComponentUpdate(
                  value,
                  lastKnownValue,
                );
                store.afterShouldComponentUpdate(holder.node);
              }
              if (resolvable || shouldUpdate) {
                total++;
                holder.setter(resolvable ? resolvable : value);
              }
              if (!resolvable) {
                // Do we need to call onChange
                // if atom.shouldComponentUpdate returns false?
                if (holder.onChange) {
                  store.beforeOnChange(holder.node);
                  holder.onChange({
                    value,
                    oldValue: lastKnownValue,
                    get: makeGet(store),
                    set: makeSet(store),
                  });
                  store.afterOnChange(holder.node);
                }
              }
            }
          });
        }
        if (atom?.onChange) {
          store.beforeAtomOnChange(node);
          atom.onChange({
            value,
            oldValue: lastKnownValue,
            get: makeGet(store),
            set: makeSet(store),
          });
          store.afterAtomOnChange(node);
        }
      }
    }
  });
  if (process.env.NODE_ENV === 'development') {
    store.debug('Triggered re-render for ' + total + ' components...');
  }
}

function isSetStateActionValue<T>(value: SetStateAction<T>): value is T {
  return typeof value !== 'function';
}

function _removeIn<T>(store: StateX, path: Path): T {
  const node = store.trie().getNode(path);
  store.activateNode(node, 'remove');
  const oldValue = _getIn<T>(store, node);
  node.data.lastKnownValue = oldValue;
  store.removingState(node);
  store.trackAndRemove(node);
  if (node.parent) {
    store.addToPending(node.parent.path, 'remove-child');
  }
  store.trie().removeNode(node);
  return oldValue;
}

function _setIn<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  value: SetStateAction<T>,
  options?: Options,
): T {
  store.activateNode(node, 'update', value);
  let newValue: T;
  let returnValue: T;
  if (isSelectorNode(node)) {
    returnValue = node.data.selector.setValue(store, node, value as T, options);
  } else {
    const oldValue = _getIn<T>(store, node);
    if (isSetStateActionValue(value)) {
      newValue = value;
    } else {
      newValue = value(oldValue);
    }
    if (newValue === oldValue) {
      // do nothing
      return oldValue;
    }
    if (typeof node.data.atom?.updater === 'function') {
      store.beforeAtomUpdater(node);
      newValue = node.data.atom.updater({
        value: newValue,
        oldValue,
        get: makeGet(store),
        set: makeSet(store),
      });
      store.afterAtomUpdater(node);
    }
    if (newValue === oldValue) {
      // do nothing
      return oldValue;
    }
    returnValue = newValue;
    if (process.env.NODE_ENV === 'development') {
      if (!options?.mutableRefObject && shouldFreeze(returnValue)) {
        if (Array.isArray(returnValue)) {
          newValue = ([...returnValue] as unknown) as T;
        } else {
          newValue = { ...returnValue };
        }
        // do not deepFreeze
        Object.freeze(returnValue);
      }
    }
    store.updatingState(node);
    store.trackAndMutate(node, newValue);
    store.addToPending(node.path, 'update');
  }
  return returnValue;
}

function hasStateXValue(store: StateX, path: Path) {
  return _getIn(store, store.trie().getNode(path)) !== undefined;
}

function setStateXValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  value: SetStateAction<T>,
  options?: Options,
): T {
  return _setIn(store, node, value, options);
}

function removeStateXValue<T>(
  store: StateX,
  pathWithParams: Path,
  options?: Options,
): Readonly<T> {
  const path = applyParamsToPath(pathWithParams, options?.params);
  return _removeIn(store, path);
}

function getResolvableStateXValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  options?: Options,
): Readonly<T> | Resolvable<Readonly<T>> {
  const { mutableRefObject } = options || emptyObject;
  if (isSelectorNode(node)) {
    return node.data.selector.getValue(store, node, options);
  } else {
    return (
      _getIn<T>(store, node, undefined, mutableRefObject) ??
      node.data.defaultValue
    );
  }
}

function getStateXValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  props?: Options,
): Readonly<T> {
  const value = getResolvableStateXValue<T>(store, node, props);
  if (isResolvable(value)) {
    return value.resolve();
  }
  return value;
}

function registerStateX<T>(
  store: StateX,
  pathOrAtom: PathOrStateXOrSelector<T>,
  node: Node<NodeData<T>>,
) {
  if (pathOrAtom instanceof Atom && node.data.atom !== pathOrAtom) {
    node.data.atom = pathOrAtom;
    node.data.defaultValue = pathOrAtom.defaultValue;
    const val = getIn(store.getState(), node.path, undefined);
    if (val === undefined) {
      store.trackAndMutate(node, pathOrAtom.defaultValue);
    }
  } else if (
    pathOrAtom instanceof Selector &&
    node.data.selector !== pathOrAtom
  ) {
    node.data.selector = pathOrAtom;
    if (isSelectorNode(node)) {
      // re-initialize selector to cleanup existing subscriptions
      node.data.initialized = false;
    }
  }
}

function makeGet(store: StateX, nodes?: Set<Node<NodeData<any>>>) {
  return <V>(
    pathOrAtom: PathOrStateXOrSelector<V>,
    options?: Options,
  ): Readonly<V> => {
    let path: Path;
    if (pathOrAtom instanceof Selector) {
      path = applyParamsToPath(pathOrAtom.pathWithParams, options?.params);
    } else if (pathOrAtom instanceof Atom) {
      path = applyParamsToPath(pathOrAtom.path, options?.params);
    } else {
      path = pathOrAtom;
    }
    const node = getNode<V>(store, path);
    // register the atom or selector to populate the empty state with default value
    registerStateX(store, pathOrAtom, node);
    // collect all the nodes being accessed
    if (nodes) {
      nodes.add(getNode(store, path));
    }
    const value = getStateXValue<V>(store, node, options);

    if (isResolvable(value)) {
      return value.resolve();
    }
    return value;
  };
}

function makeSet(store: StateX) {
  return <V>(
    pathOrAtom: PathOrStateX<V>,
    value: SetStateAction<V>,
    options?: Options,
  ): Readonly<V> => {
    let path: Path;
    if (pathOrAtom instanceof Selector) {
      path = applyParamsToPath(pathOrAtom.pathWithParams, options?.params);
    } else if (pathOrAtom instanceof Atom) {
      path = applyParamsToPath(pathOrAtom.path, options?.params);
    } else {
      path = pathOrAtom;
    }
    const node = getNode<V>(store, path);
    // register the atom or selector to populate the empty state with default value
    registerStateX(store, pathOrAtom, node);
    return setStateXValue<V>(store, node, value, options);
  };
}

export {
  makeGet,
  makeSet,
  _getIn,
  enterStateX,
  getNode,
  getStateXValue,
  hasStateXValue,
  inform,
  isResolvable,
  registerStateX,
  removeStateXValue,
  setStateXValue,
};
