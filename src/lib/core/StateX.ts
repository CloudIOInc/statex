/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { SetStateAction, MutableRefObject } from 'react';
import type {
  NodeData,
  Path,
  StateXHolder,
  Options,
  PathOrStateXOrSelector,
  PathOrStateX,
  Key,
  NodeDataWithSelector,
} from './StateXTypes';
import { isResolvable, Resolvable, isSelectorNode } from './StateXTypes';
import { getIn } from './ImmutableUtils';
import { Node } from './Trie';
import {
  deepFreeze,
  applyParamsToPath,
  shouldFreeze,
  pathToString,
} from './StateXUtils';
import { StateX } from './StateXStore';
import Atom from './Atom';
import Selector from './Selector';
import Action from './Action';

function _getIn<T>(
  store: StateX,
  node: Node<NodeData<any>>,
  defaultValue?: T,
  mutableRefObject = true,
): T {
  if (node.path.length === 0) {
    return (store.getState() as unknown) as T;
  }

  const val = getIn(store.getState(), node.path, defaultValue) as T | undefined;
  if (val === undefined) {
    return defaultValue as T;
  }
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    return !mutableRefObject && val && typeof val === 'object'
      ? deepFreeze(val)
      : val;
  } else {
    /* istanbul ignore next */
    return val;
  }
}

function isNodeDirty<T>(store: StateX, node: Node<NodeData<T>>) {
  if (isSelectorNode(node)) {
    return node.data.oldSelectorValue !== node.data.selectorValue;
  }
  const value = getIn(store.getState(), node.path, undefined);
  return node.data.lastKnownValue !== value;
}

function getNode<T>(store: StateX, path: Path) {
  const missingParams = path.filter(
    (key) => typeof key === 'string' && key.charAt(0) === ':',
  );
  if (missingParams.length) {
    throw Error(
      `Missing parameter values for ${missingParams.join(
        ', ',
      )} in path ${pathToString(path)}!`,
    );
  }
  return store.trie().getNode(path) as Node<NodeData<T>>;
}

function hasHoldersOnChildren(node: Node<NodeData<any>>) {
  const children = Object.values(node.children);
  const len = children.length;
  for (let i = 0; i < len; i++) {
    const child = children[i];
    if (child.data.holders.size || hasHoldersOnChildren(child)) {
      return true;
    }
  }
  return false;
}

function enterStateX<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  stateXHolder: StateXHolder<T>,
) {
  /* istanbul ignore if */
  if (node.deleted) {
    throw Error(`Node already removed! ${pathToString(node.path)}`);
  }
  store.enteringNode(node);
  node.data.holders.add(stateXHolder);
  stateXHolder.holding = true;
  return () => {
    stateXHolder.holding = false;
    node.data.holders.delete(stateXHolder);
    if (node.data.holders.size === 0 && !hasHoldersOnChildren(node)) {
      if (!store.destroyed) {
        if (isSelectorNode(node)) {
          // keep all the selector nodes to avoid re-evaluating when the component
          // appears again

          // if (node.data.resolveable?.error) {
          // error node might be unmounted due to error boundry
          // keep the node for debug purpose
          return;
          // }
        }
        store.markToBeRemoved(node);
      }
    }
  };
}

function _addParentNodes(
  store: StateX,
  node: Node<NodeData<any>>,
  nodes: Set<Node<NodeData<any>>>,
) {
  const parentNodes = store.trie().getAllParentNodes(node.path);
  const length = parentNodes.length;
  let parentNode: Node<NodeData<any>>;
  for (let j = 0; j < length; j++) {
    parentNode = parentNodes[j];
    if (!nodes.has(parentNode)) {
      nodes.add(parentNode);
    } else {
      // parents already exists
      break;
    }
  }
}

function getDirtyNodes(store: StateX) {
  const nodes = new Set<Node<NodeData<any>>>();
  let node: Node<NodeData<any>>;
  store.getPendingPaths().forEach((path) => {
    node = store.trie().getNode(path);
    if (!isNodeDirty(store, node)) {
      if (
        node.parent &&
        !nodes.has(node.parent) &&
        isNodeDirty(store, node.parent)
      ) {
        _addParentNodes(store, node, nodes);
      }
      return;
    }
    nodes.add(node);
    collectDirtyChildNodes(store, path, nodes);
    _addParentNodes(store, node, nodes);
  });
  return nodes;
}

function collectDirtyChildNodes(
  store: StateX,
  path: Path,
  nodes: Set<Node<NodeData<any>>>,
) {
  const dirtyChildren = store
    .trie()
    .getAllChildNodes(path, (node) => isNodeDirty(store, node));
  dirtyChildren.forEach(nodes.add, nodes);
  return nodes;
}

function updateState<T>(store: StateX, state: T, path: Path) {
  store.updateState(state, path);
  const nodes = new Set<Node<NodeData<any>>>();
  nodes.add(getNode(store, path));
  collectDirtyChildNodes(store, path, nodes);
  informNodes(store, nodes);
}

function inform<T>(store: StateX) {
  const nodes = getDirtyNodes(store);
  store.clearPending();
  informNodes(store, nodes);
}

function informNodes<T>(store: StateX, nodes: Set<Node<NodeData<any>>>) {
  if (nodes.size === 0) {
    return;
  }
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    store.debug('Found ' + nodes.size + ' dirty nodes...', 'inform');
    // nodes.forEach((n) => store.debug(pathToString(n.path), 'inform'));
  }
  let total = 0;
  const informedNodes: Node<NodeData<any>>[] = [];
  nodes.forEach((node) => {
    if (isSelectorNode(node)) {
      // selector's initial change
      node.data.selector.informInitialChange(store, node);
    } else {
      let value = _getIn<T>(store, node);
      const { lastKnownValue, defaultValue, holders, atom } = node.data;
      if (value === undefined) {
        value = defaultValue;
      }
      if (value !== lastKnownValue) {
        node.data.lastKnownValue = value;
        if (
          !atom?.shouldComponentUpdate ||
          atom.shouldComponentUpdate(value, lastKnownValue)
        ) {
          holders.forEach((holder) => {
            /* istanbul ignore next */
            if (!holder.holding) {
              return;
            }
            let shouldUpdate = true;
            if (holder.shouldComponentUpdate) {
              store.beforeShouldComponentUpdate(holder.node);
              shouldUpdate = holder.shouldComponentUpdate(
                value,
                lastKnownValue,
              );
              store.afterShouldComponentUpdate(holder.node);
            }
            if (shouldUpdate) {
              total++;
              holder.setter(value);
              informedNodes.push(holder.node);
            }
            // Do we need to call onChange
            // if atom.shouldComponentUpdate returns false?
            if (holder.onChange) {
              store.beforeOnChange(holder.node);
              holder.onChange({
                call: makeCall(store),
                get: makeGet(store),
                getRef: makeGetRef(store),
                oldValue: lastKnownValue,
                remove: makeRemove(store),
                reset: makeReset(store),
                set: makeSet(store),
                setRef: makeSetRef(store),
                value,
              });
              store.afterOnChange(holder.node);
            }
          });
        }
        if (atom?.onChange) {
          store.beforeAtomOnChange(node);
          atom.onChange({
            call: makeCall(store),
            get: makeGet(store),
            getRef: makeGetRef(store),
            oldValue: lastKnownValue,
            remove: makeRemove(store),
            reset: makeReset(store),
            set: makeSet(store),
            setRef: makeSetRef(store),
            value,
          });
          store.afterAtomOnChange(node);
        }
      }
    }
  });
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    store.debug(
      'Triggered re-render for ' +
        total +
        ' components... ' +
        informedNodes.map((node) => pathToString(node.path)).join(', '),
    );
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
  // node.data.holders.forEach((h) => {
  //   /* istanbul ignore next */
  //   if (h.holding) {
  //     h.setter(undefined);
  //   }
  // });
  // store.trie().removeNode(node);
  return oldValue;
}

function _setIn<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  value: SetStateAction<T>,
  options?: Options,
): T {
  let newValue: T;
  let returnValue: T;
  let oldValue;
  if (isSelectorNode(node)) {
    oldValue = node.data.selectorValue ?? node.data.selector.defaultValue;
  } else {
    oldValue = _getIn<T>(store, node);
  }
  if (isSetStateActionValue(value)) {
    newValue = value;
  } else {
    newValue = value(oldValue);
  }
  if (newValue === oldValue) {
    // do nothing
    return oldValue;
  }
  store.activateNode(node, 'update', value);
  if (isSelectorNode(node)) {
    returnValue = node.data.selector.setValue(store, node, newValue, options);
  } else {
    if (typeof node.data.atom?.updater === 'function') {
      store.beforeAtomUpdater(node);
      newValue = node.data.atom.updater({
        call: makeCall(store),
        get: makeGet(store),
        getRef: makeGetRef(store),
        oldValue,
        remove: makeRemove(store),
        reset: makeReset(store),
        set: makeSet(store),
        setRef: makeSetRef(store),
        value: newValue,
      });
      store.afterAtomUpdater(node);
    }
    if (newValue === oldValue) {
      // do nothing
      return oldValue;
    }
    returnValue = newValue;
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
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
    store.trackAndUpdate(node, newValue);
    store.addToPending(node.path, 'update');
  }
  return returnValue;
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
): T {
  const path = applyParamsToPath(pathWithParams, options?.params);
  return _removeIn(store, path);
}

function updateParentNodesLastKnowValues<T>(
  store: StateX,
  node?: Node<NodeData<T>>,
) {
  if (node && node.data.lastKnownValue === undefined) {
    const value: T = _getIn<T>(store, node);
    if (value !== undefined) {
      node.data.lastKnownValue = value;
      updateParentNodesLastKnowValues(store, node.parent);
    }
  }
}

function getStateValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  options?: Options,
): T {
  return _getIn<T>(store, node, undefined, !!options?.mutableRefObject);
}

function getResolvableStateXValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  options?: Options,
): T | Resolvable<T> {
  if (isSelectorNode(node)) {
    return node.data.selector.getValue(store, node, options);
  } else {
    return getStateValue<T>(store, node, options);
  }
}

function getStateXValue<T>(
  store: StateX,
  node: Node<NodeData<T>>,
  props?: Options,
): T {
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
  defaultValue?: T,
) {
  if (pathOrAtom instanceof Atom) {
    if (node.data.atom === pathOrAtom) {
      return;
    }
    node.data.atom = pathOrAtom;
    /* istanbul ignore else */
    if (!node.data.defaultValueInitialized) {
      node.data.defaultValue = pathOrAtom.defaultValue;
      node.data.defaultValueInitialized = true;
      const val = getIn(store.getState(), node.path, undefined);
      if (val === undefined) {
        /* istanbul ignore else */
        if (pathOrAtom.defaultValue !== undefined) {
          node.data.lastKnownValue = pathOrAtom.defaultValue;
          store.trackAndUpdate(node, pathOrAtom.defaultValue);
          store.addToPendingWithoutSchedule(node.path, 'default');
        }
      } else {
        node.data.lastKnownValue = val;
      }
      updateParentNodesLastKnowValues(store, node.parent);
    }
  } else if (pathOrAtom instanceof Selector) {
    if (node.data.selector !== pathOrAtom) {
      node.data.selector = pathOrAtom;
      // re-initialize selector to cleanup existing subscriptions
      (node as Node<NodeDataWithSelector<T>>).data.initialized = false;
    }
  } else if (!node.data.defaultValueInitialized) {
    node.data.defaultValueInitialized = true;
    const val = getIn(store.getState(), node.path, undefined);
    if (val === undefined) {
      if (defaultValue !== undefined) {
        node.data.lastKnownValue = defaultValue;
        store.trackAndUpdate(node, defaultValue);
        store.addToPendingWithoutSchedule(node.path, 'default');
      }
    } else {
      node.data.lastKnownValue = val;
    }
    updateParentNodesLastKnowValues(store, node.parent);
  }
}

function resolvePath<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  params?: Record<string, Key>,
): Path {
  let path: Path;
  if (pathOrAtom instanceof Atom) {
    path = pathOrAtom.path;
  } else if (pathOrAtom instanceof Selector) {
    path = pathOrAtom.pathWithParams;
  } else if (Array.isArray(pathOrAtom)) {
    path = pathOrAtom;
  } else {
    throw Error(
      `Invalid state ${JSON.stringify(
        pathOrAtom,
      )}. Must be path or atom or selector.`,
    );
  }
  return applyParamsToPath(path, params);
}

function makeGet(store: StateX, nodes?: Set<Node<NodeData<any>>>) {
  return <V>(pathOrAtom: PathOrStateXOrSelector<V>, options?: Options): V => {
    const path = resolvePath(pathOrAtom, options?.params);
    const node = getNode<V>(store, path);
    // register the atom or selector to populate the empty state with default value
    registerStateX(store, pathOrAtom, node);
    // collect all the nodes being accessed
    if (nodes) {
      nodes.add(node);
    }
    return getStateXValue<V>(store, node, options);
  };
}

function makeCall(store: StateX) {
  return <T = void>(action: Action<T>, value: T): void => {
    action.execute(store, value);
  };
}

function makePaths(store: StateX) {
  return (path: Path): Path[] => {
    const paths: Path[] = [];
    store.trie().forEach(path, (node: Node<NodeData<any>>) => {
      paths.push(node.path);
    });
    return paths;
  };
}

function makeGetRef(store: StateX) {
  return <T>(path: Path): MutableRefObject<T> | undefined => {
    const node = getNode<T>(store, path);
    return node.data.ref;
  };
}

function setRef<T>(
  node: Node<NodeData<T>>,
  ref: MutableRefObject<T> | undefined,
) {
  node.data.ref = ref;
  node.data.holders.forEach((holder) => {
    holder.setter(ref);
  });
}

function makeSetRef(store: StateX) {
  return <T>(path: Path, ref: MutableRefObject<T> | undefined): void => {
    const node = getNode<T>(store, path);
    setRef(node, ref);
  };
}

function makeSet(store: StateX) {
  return <V>(
    pathOrAtomOrSelector: PathOrStateXOrSelector<V>,
    value: SetStateAction<V>,
    options?: Options,
  ): V => {
    const path = resolvePath(pathOrAtomOrSelector, options?.params);
    const node = getNode<V>(store, path);
    // register the atom or selector to populate the empty state with default value
    registerStateX(store, pathOrAtomOrSelector, node);
    return setStateXValue<V>(store, node, value, options);
  };
}

function makeRemove(store: StateX) {
  return <V>(pathOrAtom: PathOrStateX<V>, options?: Options): V => {
    const path = resolvePath(pathOrAtom, options?.params);
    const node = getNode<V>(store, path);
    // register the atom or selector to populate the empty state with default value
    registerStateX(store, pathOrAtom, node);
    return removeStateXValue<V>(store, node.path, options);
  };
}

function makeReset(store: StateX) {
  return <V>(atom: Atom<V>, options?: Options): V => {
    const path = resolvePath(atom, options?.params);
    const node = getNode<V>(store, path);
    return setStateXValue<V>(store, node, atom.defaultValue, options);
  };
}

export {
  enterStateX,
  getNode,
  getStateValue,
  getStateXValue,
  inform,
  isResolvable,
  makeCall,
  makeGet,
  makeGetRef,
  makePaths,
  makeRemove,
  makeReset,
  makeSet,
  makeSetRef,
  registerStateX,
  removeStateXValue,
  resolvePath,
  setRef,
  setStateXValue,
  updateState,
};
