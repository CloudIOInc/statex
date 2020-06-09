/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  DependencyList,
} from 'react';
import {
  Dispatch,
  Path,
  SelectorProps,
  StateXHolder,
  StateXOptions,
  StateXProps,
  Options,
  PathOrStateXOrSelector,
  isSelectorNode,
  NodeData,
} from './StateXTypes';

import Atom from './Atom';
import Selector from './Selector';
import {
  isResolvable,
  Resolvable,
  StateXSetter,
  StateXGetter,
} from './StateXTypes';
import {
  _getIn,
  enterStateX,
  getNode,
  removeStateXValue,
  setStateXValue,
  getStateXValue,
  registerStateX,
  makeGet,
  makeSet,
} from './StateX';
import { emptyFunction, applyParamsToPath } from './StateXUtils';
import { useStateXStore, StateXProvider } from './StateXContext';
import { isPath, Collection } from './ImmutableTypes';
import { Node } from './Trie';

function atom<T>(props: StateXProps<T>): Atom<T> {
  return new Atom(props);
}

function useStateXValueGetterWithPath() {
  const store = useStateXStore();
  const get = useCallback(
    <T>(path: Path, props?: Options) => {
      return getStateXValue<T>(store, path, props);
    },
    [store],
  );
  return get;
}

function useStateXCallback<T>(
  fn: (props: { set: StateXSetter; get: StateXGetter }) => T,
  deps?: DependencyList,
) {
  const store = useStateXStore();
  return useCallback(
    () => fn({ get: makeGet(store), set: makeSet(store) }),
    // @ts-ignore
    [fn, store],
  );
}

function useStateXValueSetter<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  options?: Options,
): Dispatch<T> {
  let path: Path;
  if (pathOrAtom instanceof Atom) {
    path = pathOrAtom.path;
  } else if (pathOrAtom instanceof Selector) {
    path = pathOrAtom.pathWithParams;
  } else {
    path = pathOrAtom;
  }
  path = applyParamsToPath(path, options?.params);
  const store = useStateXStore();
  const node = getNode(store, path);
  const optionsRef = useLatest(options);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      try {
        return setStateXValue(store, node, value, optionsRef.current) as T;
      } catch (error) {
        console.error(error);
        return undefined;
      }
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
  let path = resolveParams(pathOrAtom);
  path = applyParamsToPath(path, options?.params);
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
  let path = resolveParams(selector);
  path = applyParamsToPath(path, options?.params);
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
    defaultValue,
  );
  let currentValue: T | Resolvable<T>;
  if (pathOrAtom instanceof Selector) {
    if (node !== holderRef.current.node) {
      // must be due to dynamic path change... discard existing selectorValue
      currentValue = defaultValue;
    } else {
      currentValue = selectorValue;
    }
  } else {
    currentValue =
      _getIn<T>(store, node, undefined, !!options?.mutableRefObject) ??
      defaultValue;
  }

  const ref = useRef({ defaultValue, options, currentValue });

  const [, setValueInternal] = useState<T | Resolvable<T>>(currentValue);

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
        if (defaultValue !== undefined && defaultValue !== null) {
          setValue(defaultValue);
          if (!node.data.selector) {
            setStateXValue(store, node, defaultValue, {
              mutableRefObject: !!options?.mutableRefObject,
            });
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

function resolveParams<T>(pathOrAtom: PathOrStateXOrSelector<T>): Path {
  let path: Path;
  if (pathOrAtom instanceof Atom) {
    path = pathOrAtom.path;
  } else if (pathOrAtom instanceof Selector) {
    path = pathOrAtom.pathWithParams;
  } else {
    path = pathOrAtom;
  }
  return path;
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
): Dispatch<T> {
  let path: Path;
  if (pathOrAtom instanceof Atom) {
    path = pathOrAtom.path;
  } else {
    path = pathOrAtom;
  }
  path = applyParamsToPath(path, options?.params);
  const store = useStateXStore();
  const node = getNode(store, path);
  const optionsRef = useLatest(options);

  const removeValue = useCallback(() => {
    return removeStateXValue(store, node.path, optionsRef.current) as T;
  }, [node, optionsRef, store]);

  return removeValue;
}

function useRemoveStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];

function useRemoveStateX<T>(
  atom: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];

function useRemoveStateX<T>(
  pathOrAtom: Path | Atom<T>,
  defaultOrOptions?: T | StateXOptions<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>] {
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

function useWithStateX(state: Collection) {
  const setValue = useStateXValueSetter([]);
  const ref = useRef<Collection>(state);
  useEffect(() => {
    setValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (JSON.stringify(ref.current) !== JSON.stringify(state)) {
      setValue(state);
      ref.current = state;
    }
  }, [setValue, state]);
  return null;
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
  selector,
  useDebug,
  useLatest,
  useRemoveStateX,
  useStateX,
  useStateXCallback,
  useStateXResolveable,
  useStateXValue,
  useStateXValueGetterWithPath,
  useStateXValueInternal,
  useStateXValueRemover,
  useStateXValueResolveable,
  useStateXValueSetter,
  useWithStateX,
};
