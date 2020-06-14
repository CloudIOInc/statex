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
  useLayoutEffect,
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
  _getIn,
  enterStateX,
  getNode,
  makeGet,
  makeSet,
  registerStateX,
  removeStateXValue,
  resolvePath,
  setStateXValue,
} from './StateX';
import { emptyFunction } from './StateXUtils';
import { useStateXStore, StateXProvider } from './StateXContext';
import { isPath, Collection } from './ImmutableTypes';
import { Node } from './Trie';
import { setIn } from './ImmutableUtils';

function atom<T>(props: StateXProps<T>): Atom<T> {
  return new Atom(props);
}

function useStateXSetter() {
  const store = useStateXStore();
  return useMemo(() => makeSet(store), [store]);
}

function useStateXGetter() {
  const store = useStateXStore();
  return useMemo(() => makeGet(store), [store]);
}

function useStateXValueGetter() {
  return useStateXGetter();
}

function useStateXCallback<P extends ReadonlyArray<unknown>, R>(
  fn: (props: { set: StateXSetter; get: StateXGetter }, ...args: P) => R,
  deps: DependencyList,
): (...args: P) => R {
  const fnRef = useLatest(fn);
  const store = useStateXStore();
  return useCallback(
    (...args: P) =>
      fnRef.current({ get: makeGet(store), set: makeSet(store) }, ...args),
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

function useStateXValue<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): Readonly<T>;

function useStateXValue<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): Readonly<T>;

function useStateXValue<T>(
  pathOrAtom: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): Readonly<T>;

function useStateXValue<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): Readonly<T> {
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
      // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      'Invalid atom type value! Must be either an atom, selector or path.',
    );
  }
  return useStateXValueInternal(pathOrAtom, defaultValue, options);
}

function useStateXValueInternal<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultValue: T,
  options?: StateXOptions<T>,
): Readonly<T> {
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
): Resolvable<Readonly<T>> {
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
): [Resolvable<Readonly<T>>, Dispatch<T>] {
  const value = useStateXValueResolveable(selector, options);
  const setValue = useStateXValueSetter<T>(selector, options);
  return [value, setValue];
}

function useStateXValueResolveableInternal<T>(
  node: Node<NodeData<T>>,
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultValue: T,
  options?: StateXOptions<T>,
): Readonly<T> | Resolvable<Readonly<T>> {
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
    currentValue = _getIn<T>(
      store,
      node,
      undefined,
      !!options?.mutableRefObject,
    );
    if (currentValue === undefined && defaultValue !== undefined) {
      currentValue = defaultValue;
      // prevent calling onChange callback for default values
      node.data.lastKnownValue = defaultValue;
      store.trackAndMutate(node, defaultValue);
      usedDefaultValue = true;
      store.addToPendingWithoutSchedule(node.path, 'default');
    }
  }

  const ref = useRef({ defaultValue, options, currentValue });

  const [value, setValueInternal] = useState<T | Resolvable<T>>(currentValue);

  useEffect(() => {
    if (usedDefaultValue) {
      if (isSelectorNode(node)) {
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
      store.addToPending(node.path, 'update');
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
      const currentValue = node.data.selector.getValue(store, node, options);
      setSelectorValue(currentValue);
    } else {
      const currentValue = _getIn<T>(
        store,
        node,
        undefined,
        !!options?.mutableRefObject,
      );
      if (currentValue === undefined) {
        // this should never happen as we are calling store.trackAndMutate
        // above during render for updating the store with default value
        if (defaultValue !== undefined) {
          setValue(defaultValue);
          if (!node.data.selector) {
            node.data.lastKnownValue = defaultValue;
            // prevent calling onChange callback for default values
            store.trackAndMutate(node, defaultValue);
            store.addToPending(node.path, 'update');
          }
        }
      } else {
        setValue(currentValue);
      }
    }
  }, [node, setValue, store]);

  useEffect(() => {
    // watch the path
    return enterStateX(node, holderRef.current);
  }, [node, holderRef]);

  return currentValue;
}

function useStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];

function useStateX<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];

function useStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];

function useStateX<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>] {
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
      // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      'Invalid atom type value! Must be either an atom, selector or path.',
    );
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const setValue = useStateXValueSetter<T>(pathOrAtom, options);
  return [value, setValue];
}

function useLatest<T>(value: T) {
  const ref = useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

function selector<T>(props: SelectorProps<T>): Selector<T> {
  return new Selector(props);
}

function useStateXValueRemover<T>(
  pathOrAtom: Path | Atom<T>,
  options?: Options,
): () => Readonly<T> {
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
): [Readonly<T>, () => Readonly<T>];

function useRemoveStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [Readonly<T>, () => Readonly<T>];

function useRemoveStateX<T>(
  pathOrAtom: Path | Atom<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, () => Readonly<T>] {
  let defaultValue: T;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions;
  } else if (isPath(pathOrAtom)) {
    if (defaultOrOptions === undefined) {
      defaultOrOptions = (null as unknown) as T;
      // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
    }
    defaultValue = defaultOrOptions as T;
  } else {
    throw Error(
      'Invalid atom type value! Must be either an atom, selector or path.',
    );
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
  StateXProvider,
  atom,
  Atom,
  selector,
  Selector,
  useDebug,
  useLatest,
  useRemoveStateX,
  useStateX,
  useStateXCallback,
  useStateXGetter,
  useStateXResolveable,
  useStateXSetter,
  useStateXValue,
  useStateXValueGetter,
  useStateXValueInternal,
  useStateXValueRemover,
  useStateXValueResolveable,
  useStateXValueSetter,
  useWithStateX,
};
