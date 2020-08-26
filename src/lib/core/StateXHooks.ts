/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  DependencyList,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dispatch,
  NodeData,
  Options,
  Path,
  PathOrStateXOrSelector,
  SelectorProps,
  StateXHolder,
  StateXOptions,
  StateXProps,
  isSelectorNode,
  ActionFunction,
  StateXRefGetter,
  StateChangeListenerProps,
  StateChangeListenerPropsInternal,
} from './StateXTypes';

import Atom from './Atom';
import Selector from './Selector';
import {
  Resolvable,
  StateXGetter,
  StateXSetter,
  isResolvable,
} from './StateXTypes';
import {
  enterStateX,
  getNode,
  makeGet,
  makeSet,
  registerStateX,
  removeStateXValue,
  resolvePath,
  setStateXValue,
  makeGetRef,
  updateState,
  makeRemove,
  getStateValue,
  makeSetRef,
  makeCall,
  makeReset,
} from './StateX';
import { emptyFunction, pathToString } from './StateXUtils';
import { useStateXStore, StateXProvider } from './StateXContext';
import { isPath, Collection } from './ImmutableTypes';
import { Node } from './Trie';
import { setIn, getIn } from './ImmutableUtils';
import Action from './Action';
import { useLatest } from './StateXUtilHooks';
import ReactDOM from 'react-dom';
import { StateX } from './StateXStore';

const cache = new Set();

function atom<T>(props: StateXProps<T>): Atom<T> {
  if (process.env.NODE_ENV === 'development') {
    const path = pathToString(props.path);
    if (cache.has(path)) {
      throw Error(
        `Duplicate atom with path ${path}! It could also be due to HMR, in which case please refresh your browser.`,
      );
    }
    cache.add(path);
  }
  return new Atom(props);
}

function useStateXSetter() {
  const store = useStateXStore();
  return useMemo(() => makeSet(store), [store]);
}

function useStateXActionCaller() {
  const store = useStateXStore();
  return useMemo(() => makeCall(store), [store]);
}

function useStateXRemover() {
  const store = useStateXStore();
  return useMemo(() => makeRemove(store), [store]);
}

function useStateXResetter() {
  const store = useStateXStore();
  return useMemo(() => makeReset(store), [store]);
}

function useStateXGetter() {
  const store = useStateXStore();
  return useMemo(() => makeGet(store), [store]);
}

function useStateXRefGetter() {
  const store = useStateXStore();
  return useMemo(() => makeGetRef(store), [store]);
}

function useStateXRefSetter() {
  const store = useStateXStore();
  return useMemo(() => makeSetRef(store), [store]);
}

function useStateXValueGetter() {
  return useStateXGetter();
}

function useStateXCallback<P extends ReadonlyArray<unknown>, R>(
  fn: (
    props: { set: StateXSetter; get: StateXGetter; getRef: StateXRefGetter },
    ...args: P
  ) => R,
  deps: DependencyList,
): (...args: P) => R {
  const fnRef = useLatest(fn);
  const store = useStateXStore();
  return useCallback(
    (...args: P) =>
      fnRef.current(
        { get: makeGet(store), set: makeSet(store), getRef: makeGetRef(store) },
        ...args,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, fnRef, store],
  );
}

function useStateXValueSetter<T, P = void>(
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  options?: Options<P>,
): Dispatch<T> {
  const path = resolvePath(pathOrAtom, options?.params);
  const store = useStateXStore();
  const node = getNode<T, P>(store, path);
  const optionsRef = useLatest(options);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      return setStateXValue<T, P>(store, node, value, optionsRef.current);
    },
    [store, node, optionsRef],
  );

  return setValue;
}

function useStateXValue<T>(atom: Atom<T>, options?: StateXOptions<T>): T;

function useStateXValue<T, P = void>(
  selector: Selector<T, P>,
  options?: StateXOptions<T, P>,
): T;

function useStateXValue<T>(
  pathOrAtom: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): T;

function useStateXValue<T, P = void>(
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  defaultOrOptions?: T | StateXOptions<T, P>,
  options?: StateXOptions<T, P>,
): T {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (pathOrAtom instanceof Selector) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    // defaultOrOptions could be undefined
    // the state won't be initialized if the default value is undefined
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      'Invalid state type value! Must be either an atom, selector or path.',
    );
  }
  return useStateXValueInternal(pathOrAtom, defaultValue, options);
}

function useStateXValueInternal<T, P>(
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  defaultValue: T,
  options?: StateXOptions<T, P>,
): T {
  const path = resolvePath(pathOrAtom, options?.params);
  const store = useStateXStore();
  const node = getNode<T, P>(store, path);
  let value = useStateXValueResolveableInternal(
    node,
    pathOrAtom,
    defaultValue,
    options,
  );
  if (isResolvable(value)) {
    value = value.resolveIfSelf(node);
  }
  return value;
}

function useStateXValueResolveable<T, P = void>(
  selector: Selector<T, P>,
  options?: StateXOptions<T, P>,
): Resolvable<T, P> {
  const path = resolvePath(selector, options?.params);
  const store = useStateXStore();
  const node = getNode<T, P>(store, path);
  const value = useStateXValueResolveableInternal(
    node,
    selector,
    selector.defaultValue,
    options,
  );
  if (isResolvable(value)) {
    return value;
  } else {
    // must be default value
    return Resolvable.withValue<T, P>(node, value);
  }
}

function useStateXResolveable<T, P = void>(
  selector: Selector<T, P>,
  options?: StateXOptions<T, P>,
): [Resolvable<T, P>, Dispatch<T>] {
  const value = useStateXValueResolveable(selector, options);
  const setValue = useStateXValueSetter<T, P>(selector, options);
  return [value, setValue];
}

function useStateXValueResolveableInternal<T, P>(
  node: Node<NodeData<T, P>>,
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  dv: T,
  options?: StateXOptions<T, P>,
): T | Resolvable<T, P> {
  const store = useStateXStore();
  // register the atom or selector to populate the empty state with default value
  registerStateX(store, pathOrAtom, node, dv);
  const holderRef = useRef<StateXHolder<T, P>>({
    setter: emptyFunction,
    shouldComponentUpdate: options?.shouldComponentUpdate,
    onChange: options?.onChange,
    node,
  });

  const [selectorValue, setSelectorValue] = useState<T | Resolvable<T, P>>(
    Resolvable.withValue<T, P>(node, dv, true),
  );
  let currentValue: T | Resolvable<T, P>;
  if (pathOrAtom instanceof Selector) {
    if (node !== holderRef.current.node) {
      // must be due to dynamic path change... discard existing selectorValue
      currentValue = dv;
    } else {
      currentValue = selectorValue;
    }
  } else {
    currentValue = getStateValue<T, P>(store, node, options);
  }

  const ref = useRef({ options, currentValue });

  const [, setValueInternal] = useState<T | Resolvable<T, P>>(currentValue);

  const setValue = useCallback(
    (value: T) => {
      if (isSelectorNode(node)) {
        setSelectorValue(value);
      } else {
        setValueInternal(value);
      }
    },
    [setSelectorValue, setValueInternal, node],
  );

  useEffect(() => {
    ref.current.currentValue = currentValue;
    ref.current.options = options;

    holderRef.current.shouldComponentUpdate = options?.shouldComponentUpdate;
    holderRef.current.onChange = options?.onChange;
    holderRef.current.setter = setValue;
    holderRef.current.node = node;
  }, [currentValue, options, node, setValue]);

  const userProps = options?.props;
  useEffect(() => {
    // initial or node changed due to dynamic path
    const { options } = ref.current;
    if (isSelectorNode(node)) {
      // selector may have side effects...
      // hence make the initial call inside useEffect
      setSelectorValue(node.data.selector.getValue(store, node, options));
    } else {
      setValue(getStateValue<T, P>(store, node, options));
    }
  }, [node, setValue, store, userProps]);

  useEffect(() => {
    // watch the path
    return enterStateX(store, node, holderRef.current);
  }, [store, node, holderRef]);

  return currentValue;
}

function useStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [T, Dispatch<T>];

function useStateX<T, P = void>(
  selector: Selector<T, P>,
  options?: StateXOptions<T, P>,
): [T, Dispatch<T>];

function useStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [T, Dispatch<T>];

function useStateX<T, P = void>(
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  defaultOrOptions?: T | StateXOptions<T, P>,
  options?: StateXOptions<T, P>,
): [T, Dispatch<T>] {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (pathOrAtom instanceof Selector) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      'Invalid state type value! Must be either an atom, selector or path.',
    );
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const setValue = useStateXValueSetter<T, P>(pathOrAtom, options);
  return [value, setValue];
}

function selector<T, P = void>(props: SelectorProps<T, P>): Selector<T, P> {
  if (process.env.NODE_ENV === 'development') {
    const path = pathToString(props.path);
    if (cache.has(path)) {
      throw Error(
        `Duplicate selector with path ${path}! It could also be due to HMR, in which case please refresh your browser.`,
      );
    }
    cache.add(path);
  }
  return new Selector(props);
}

function action<T = void>(fn: ActionFunction<T>): Action<T> {
  return new Action<T>(fn);
}

function useStateXAction<T = void>(action: Action<T>): (value: T) => void {
  const store = useStateXStore();
  return useCallback((value: T) => action.execute(store, value), [
    action,
    store,
  ]);
}

function useStateXValueRemover<T>(
  pathOrAtom: Path | Atom<T>,
  options?: Options,
): () => T {
  const path = resolvePath(pathOrAtom, options?.params);
  const store = useStateXStore();
  const node = getNode<T>(store, path);
  const optionsRef = useLatest(options);

  const removeValue = useCallback(() => {
    return removeStateXValue<T>(store, node.path, optionsRef.current);
  }, [node, optionsRef, store]);

  return removeValue;
}

function useRemoveStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [T, () => T];

function useRemoveStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [T, () => T];

function useRemoveStateX<T>(
  pathOrAtom: Path | Atom<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): [T, () => T] {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error('Invalid state type value! Must be either an atom or path.');
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const removeValue = useStateXValueRemover<T>(pathOrAtom, options);
  return [value, removeValue];
}

// internal hook for use with live editor
function useWithStateX(state: Collection) {
  const store = useStateXStore();
  const setValue = useStateXValueSetter([]);
  const ref = useRef<Collection>(state);
  const firstRun = useRef(true);
  if (firstRun.current) {
    firstRun.current = false;
    store.trie().reset();
    store.setState(setIn(store.getState(), [], state));
  }
  useEffect(() => {
    if (JSON.stringify(ref.current) !== JSON.stringify(state)) {
      setValue(state);
      ref.current = state;
    }
  }, [setValue, state]);
}

function useStateXSnapshotCallback<T>(
  callback: (props: StateChangeListenerProps<T>) => void,
  path: Path = [],
): void {
  const store = useStateXStore();
  const node = getNode(store, path);
  const ref = useRef(callback);
  ref.current = callback;
  useEffect(() => {
    const { path } = node;
    function listener(props: StateChangeListenerPropsInternal<T>) {
      let { state, oldState, updatedNodes, removedNodes } = props;
      oldState = getIn(oldState, path, undefined);
      state = getIn(state, path, undefined);
      if (state !== oldState) {
        updatedNodes = updatedNodes.filter((node) =>
          store.trie().isThisOrChildNode(path, node),
        );
        removedNodes = removedNodes.filter((node) =>
          store.trie().isThisOrChildNode(path, node),
        );
        ref.current({
          state,
          oldState,
          updatedPaths: updatedNodes.map((p) => p.path),
          removedPaths: removedNodes.map((p) => p.path),
        });
      }
    }
    return store.addStateChangeListener(listener);
  }, [node, store]);
}

function useStateXSnapshotSetter() {
  const store = useStateXStore();
  const setSnapshot = useCallback(
    <T>(state: T, path: Path = []) => {
      ReactDOM.unstable_batchedUpdates(() => {
        updateState(store, state, path);
      });
    },
    [store],
  );
  return setSnapshot;
}

function useDebug() {
  const store = useStateXStore();
  const debug = useCallback(
    (log: string, action?: string, data?: any) => {
      store.debug(log, action, data);
    },
    [store],
  );
  return debug;
}

export {
  Action,
  Atom,
  Selector,
  StateX,
  StateXProvider,
  action,
  atom,
  selector,
  useDebug,
  useRemoveStateX,
  useStateX,
  useStateXAction,
  useStateXActionCaller,
  useStateXCallback,
  useStateXGetter,
  useStateXRefGetter,
  useStateXRefSetter,
  useStateXRemover,
  useStateXResetter,
  useStateXResolveable,
  useStateXSetter,
  useStateXSnapshotCallback,
  useStateXSnapshotSetter,
  useStateXValue,
  useStateXValueGetter,
  useStateXValueInternal,
  useStateXValueRemover,
  useStateXValueResolveable,
  useStateXValueSetter,
  useWithStateX,
};
