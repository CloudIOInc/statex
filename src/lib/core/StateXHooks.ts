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
} from "react";
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
} from "./StateXTypes";

import Atom from "./Atom";
import Selector from "./Selector";
import {
  Resolvable,
  StateXGetter,
  StateXSetter,
  isResolvable,
} from "./StateXTypes";
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
  getAndUpdateUndefinedStateWithDefaultValue,
} from "./StateX";
import { emptyFunction, pathToString } from "./StateXUtils";
import { useStateXStore, StateXProvider } from "./StateXContext";
import { isPath, Collection } from "./ImmutableTypes";
import { Node } from "./Trie";
import { setIn, getIn } from "./ImmutableUtils";
import Action from "./Action";
import { useLatest } from "./StateXUtilHooks";
import ReactDOM from "react-dom";

function atom<T>(props: StateXProps<T>): Atom<T> {
  return new Atom(props);
}

function useStateXSetter() {
  const store = useStateXStore();
  return useMemo(() => makeSet(store), [store]);
}

function useStateXRemover() {
  const store = useStateXStore();
  return useMemo(() => makeRemove(store), [store]);
}

function useStateXGetter() {
  const store = useStateXStore();
  return useMemo(() => makeGet(store), [store]);
}

function useStateXRefGetter() {
  const store = useStateXStore();
  return useMemo(() => makeGetRef(store), [store]);
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

function useStateXValueSetter<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  options?: Options,
): Dispatch<T> {
  const path = resolvePath(pathOrAtom, options?.params);
  const store = useStateXStore();
  const node = getNode<T>(store, path);
  const optionsRef = useLatest(options);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      return setStateXValue(store, node, value, optionsRef.current);
    },
    [store, node, optionsRef],
  );

  return setValue;
}

function useStateXValue<T>(atom: Atom<T>, options?: StateXOptions<T>): T;

function useStateXValue<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): T;

function useStateXValue<T>(
  pathOrAtom: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): T;

function useStateXValue<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): T {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (pathOrAtom instanceof Selector) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    if (defaultOrOptions === undefined) {
      defaultOrOptions = (null as unknown) as T;
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Missing default value for path ${
            pathToString(
              pathOrAtom,
            )
          }. Hence defaulting to null!`,
        );
      }
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      "Invalid state type value! Must be either an atom, selector or path.",
    );
  }
  return useStateXValueInternal(pathOrAtom, defaultValue, options);
}

function useStateXValueInternal<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultValue: T,
  options?: StateXOptions<T>,
): T {
  const path = resolvePath(pathOrAtom, options?.params);
  const store = useStateXStore();
  const node = getNode<T>(store, path);
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

function useStateXValueResolveable<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): Resolvable<T> {
  const path = resolvePath(selector, options?.params);
  const store = useStateXStore();
  const node = getNode<T>(store, path);
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
    return Resolvable.withValue<T>(node, value);
  }
}

function useStateXResolveable<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): [Resolvable<T>, Dispatch<T>] {
  const value = useStateXValueResolveable(selector, options);
  const setValue = useStateXValueSetter<T>(selector, options);
  return [value, setValue];
}

function useStateXValueResolveableInternal<T>(
  node: Node<NodeData<T>>,
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultValue: T,
  options?: StateXOptions<T>,
): T | Resolvable<T> {
  const store = useStateXStore();
  // register the atom or selector to populate the empty state with default value
  registerStateX(store, pathOrAtom, node);
  if (node.data.defaultValue === undefined) {
    node.data.defaultValue = defaultValue;
  }
  const holderRef = useRef<StateXHolder<T>>({
    setter: emptyFunction,
    shouldComponentUpdate: options?.shouldComponentUpdate,
    onChange: options?.onChange,
    node,
  });

  const [selectorValue, setSelectorValue] = useState<T | Resolvable<T>>(
    Resolvable.withValue<T>(node, defaultValue, true),
  );
  let currentValue: T | Resolvable<T>;
  let usedDefaultValue = false;
  if (pathOrAtom instanceof Selector) {
    if (node !== holderRef.current.node) {
      // must be due to dynamic path change... discard existing selectorValue
      currentValue = defaultValue;
      usedDefaultValue = true;
    } else {
      currentValue = selectorValue;
    }
  } else {
    [
      currentValue,
      usedDefaultValue,
    ] = getAndUpdateUndefinedStateWithDefaultValue<T>(
      store,
      node,
      defaultValue,
      options,
    );
  }

  const ref = useRef({ defaultValue, options, currentValue });

  const [value, setValueInternal] = useState<T | Resolvable<T>>(currentValue);

  useEffect(() => {
    if (usedDefaultValue) {
      if (isSelectorNode(node)) {
        /* istanbul ignore next */
        if (
          isResolvable(selectorValue) &&
          selectorValue.isDefault &&
          selectorValue.value !== defaultValue
        ) {
          setSelectorValue(Resolvable.withValue<T>(node, defaultValue, true));
        }
      } else if (value !== defaultValue) {
        setValueInternal(defaultValue);
      }
      store.addToPendingWithoutSchedule(node.path, "default");
    }
  }, [defaultValue, value, node, selectorValue, store, usedDefaultValue]);

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
    ref.current.defaultValue = defaultValue;
    ref.current.options = options;

    holderRef.current.shouldComponentUpdate = options?.shouldComponentUpdate;
    holderRef.current.onChange = options?.onChange;
    holderRef.current.setter = setValue;
    holderRef.current.node = node;
  }, [currentValue, defaultValue, options, node, setValue]);

  useEffect(() => {
    // initial or node changed due to dynamic path
    const { defaultValue, options } = ref.current;
    if (isSelectorNode(node)) {
      // selector may have side effects...
      // hence make the initial call inside useEffect
      setSelectorValue(node.data.selector.getValue(store, node, options));
    } else {
      setValue(
        getAndUpdateUndefinedStateWithDefaultValue<T>(
          store,
          node,
          defaultValue,
          options,
        )[0],
      );
    }
  }, [node, setValue, store]);

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

function useStateX<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): [T, Dispatch<T>];

function useStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [T, Dispatch<T>];

function useStateX<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): [T, Dispatch<T>] {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (pathOrAtom instanceof Selector) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    if (defaultOrOptions === undefined) {
      defaultOrOptions = (null as unknown) as T;
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Missing default value for path ${
            pathToString(
              pathOrAtom,
            )
          }. Hence defaulting to null!`,
        );
      }
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      "Invalid state type value! Must be either an atom, selector or path.",
    );
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const setValue = useStateXValueSetter<T>(pathOrAtom, options);
  return [value, setValue];
}

function selector<T>(props: SelectorProps<T>): Selector<T> {
  return new Selector(props);
}

function action<T = void>(fn: ActionFunction<T>): Action<T> {
  return new Action<T>(fn);
}

function useStateXAction<T = void>(action: Action<T>): (value: T) => void {
  const store = useStateXStore();
  return (value: T) => action.execute(store, value);
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
    if (defaultOrOptions === undefined) {
      defaultOrOptions = (null as unknown) as T;
      /* istanbul ignore next */
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Missing default value for path ${
            pathToString(
              pathOrAtom,
            )
          }. Hence defaulting to null!`,
        );
      }
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error("Invalid state type value! Must be either an atom or path.");
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
          store.trie().isThisOrChildNode(path, node)
        );
        removedNodes = removedNodes.filter((node) =>
          store.trie().isThisOrChildNode(path, node)
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
  const setSnapshot = useCallback(<T>(state: T, path: Path = []) => {
    ReactDOM.unstable_batchedUpdates(() => {
      updateState(store, state, path);
    });
  }, [store]);
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
  StateXProvider,
  action,
  atom,
  selector,
  useDebug,
  useRemoveStateX,
  useStateX,
  useStateXAction,
  useStateXCallback,
  useStateXGetter,
  useStateXRefGetter,
  useStateXRemover,
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
