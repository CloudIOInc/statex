/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Node } from './Trie';
import type {
  Dispatch,
  Path,
  StateXOptions,
  UIStateXOptions,
  UIType,
  PathOrStateXOrSelector,
  Options,
  NodeData,
  StateXHolder,
} from './StateXTypes';
import React, {
  useCallback,
  useRef,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import {
  useStateXValue,
  useStateXValueSetter,
  useStateXValueInternal,
} from './StateXHooks';
import Atom from './Atom';
import { useStateXStore } from './StateXContext';
import { getNode, enterStateX, setRef } from './StateX';
import { isPath } from './ImmutableTypes';
import { isReactElement, pathToString } from './StateXUtils';

function useStateXOnChangeForTextInput<T extends HTMLElement>(
  path: PathOrStateXOrSelector<string>,
  options?: Options,
): [(event: React.ChangeEvent<T>) => void, Dispatch<string>] {
  const setValue = useStateXValueSetter<string>(path, options);
  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return [onChange, setValue];
}

function useStateXOnChangeForNumberInput(
  path: PathOrStateXOrSelector<number>,
  options?: UIStateXOptions<number>,
): [(event: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<number>] {
  const setValue = useStateXValueSetter<number>(path, options);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (!Number.isNaN(value)) {
        setValue(value);
      }
    },
    [setValue],
  );
  return [onChange, setValue];
}

function useStateXRef<T>(path: Path, value: T): MutableRefObject<T> {
  const newRef = useRef<T>(value);
  const store = useStateXStore();
  const node = getNode<T>(store, path);
  if (!node.data.ref) {
    setRef(node, newRef);
  }
  useEffect(() => {
    return () => {
      setRef(node, undefined);
    };
  }, [node]);
  return node.data.ref as MutableRefObject<T>;
}

function useStateXRefValue<T>(path: Path): MutableRefObject<T> | undefined {
  const store = useStateXStore();
  const node = getNode<T>(store, path);
  const [value, setValue] = useState(node.data.ref);
  const holderRef = useRef<StateXHolder<T>>({
    setter: setValue,
    node,
  });
  useEffect(() => {
    // watch the path
    return enterStateX(store, node, holderRef.current);
  }, [store, node, holderRef]);
  return value;
}

function useStateXForTextInput(
  atom: Atom<string>,
  options?: UIStateXOptions<string>,
): {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: UIType;
};

function useStateXForTextInput(
  path: Path,
  defaultValue: string,
  options?: UIStateXOptions<string>,
): {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: UIType;
};

function useStateXForTextInput(
  pathOrAtom: Path | Atom<string>,
  defaultOrOptions?: string | UIStateXOptions<string>,
  options?: UIStateXOptions<string>,
): {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: UIType;
} {
  let defaultValue: string;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions as UIStateXOptions<string> | undefined;
  } else if (isPath(pathOrAtom)) {
    if (
      typeof defaultOrOptions === 'string' ||
      typeof defaultOrOptions === 'undefined'
    ) {
      defaultValue = defaultOrOptions as string;
    } else {
      throw Error(
        `Invalid default value passed! Must be a number. Instead got ${typeof defaultOrOptions}`,
      );
    }
  } else {
    throw Error('Invalid state type value! Must be either an atom or path.');
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const [onChange] = useStateXOnChangeForTextInput<HTMLInputElement>(
    pathOrAtom,
    options,
  );
  return { value, onChange, type: options?.type || 'text' };
}

function useStateXForSelect(
  path: Atom<string>,
  options?: UIStateXOptions<string>,
): {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} {
  const value = useStateXValue(path, options) || '';
  const [onChange] = useStateXOnChangeForTextInput<HTMLSelectElement>(
    path,
    options,
  );
  return { value, onChange };
}

function useStateXForNumberInput(
  atom: Atom<number>,
  options?: UIStateXOptions<number>,
): {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'number';
};

function useStateXForNumberInput(
  path: Path,
  defaultValue: number,
  options?: UIStateXOptions<number>,
): {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'number';
};

function useStateXForNumberInput(
  pathOrAtom: Path | Atom<number>,
  defaultOrOptions?: number | UIStateXOptions<number>,
  options?: UIStateXOptions<number>,
): {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'number';
} {
  let defaultValue: number;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions as UIStateXOptions<number> | undefined;
  } else if (isPath(pathOrAtom)) {
    if (
      typeof defaultOrOptions === 'number' ||
      typeof defaultOrOptions === 'undefined'
    ) {
      defaultValue = defaultOrOptions as number;
    } else {
      throw Error(
        `Invalid default value passed! Must be a number. Instead got ${typeof defaultOrOptions}`,
      );
    }
  } else {
    throw Error('Invalid state type value! Must be either an atom or path.');
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const [onChange] = useStateXOnChangeForNumberInput(pathOrAtom, options);
  return { value, onChange, type: 'number' };
}

function useStateXOnToggle(
  pathOrAtom: Path | Atom<boolean>,
  options?: UIStateXOptions<boolean>,
): [() => void, Dispatch<boolean>] {
  const setValue = useStateXValueSetter<boolean>(pathOrAtom, options);
  const onChange = useCallback(() => {
    setValue((value) => !value);
  }, [setValue]);
  return [onChange, setValue];
}

function useStateXForToggle(
  pathOrAtom: Path,
  defaultValue: boolean,
  options?: StateXOptions<boolean>,
): [boolean, () => void];

function useStateXForToggle(
  pathOrAtom: Atom<boolean>,
  options?: StateXOptions<boolean>,
): [boolean, () => void];

function useStateXForToggle(
  pathOrAtom: Path | Atom<boolean>,
  defaultOrOptions?: boolean | StateXOptions<boolean>,
  options?: StateXOptions<boolean>,
): [boolean, () => void] {
  let defaultValue: boolean;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions as StateXOptions<boolean> | undefined;
  } else if (isPath(pathOrAtom)) {
    if (
      typeof defaultOrOptions === 'boolean' ||
      typeof defaultOrOptions === 'undefined'
    ) {
      defaultValue = defaultOrOptions as boolean;
    } else {
      throw Error(
        `Invalid default value passed! Must be a boolean. Instead got ${typeof defaultOrOptions}`,
      );
    }
  } else {
    throw Error('Invalid state type value! Must be either an atom or path.');
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const [onToggle] = useStateXOnToggle(pathOrAtom, options);
  return [!!value, onToggle];
}

function useStateXForCheckbox(
  pathOrAtom: Path,
  defaultValue: boolean,
  options?: StateXOptions<boolean>,
): {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  type: 'checkbox';
};

function useStateXForCheckbox(
  pathOrAtom: Atom<boolean>,
  options?: StateXOptions<boolean>,
): {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  type: 'checkbox';
};

function useStateXForCheckbox(
  pathOrAtom: Path | Atom<boolean>,
  defaultOrOptions?: boolean | StateXOptions<boolean>,
  options?: StateXOptions<boolean>,
): {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  type: 'checkbox';
} {
  let defaultValue: boolean;
  if (pathOrAtom instanceof Atom) {
    defaultValue = pathOrAtom.defaultValue;
    options = defaultOrOptions as StateXOptions<boolean> | undefined;
  } else if (isPath(pathOrAtom)) {
    if (
      typeof defaultOrOptions === 'boolean' ||
      typeof defaultOrOptions === 'undefined'
    ) {
      defaultValue = defaultOrOptions as boolean;
    } else {
      throw Error(
        `Invalid default value passed! Must be a boolean. Instead got ${typeof defaultOrOptions}`,
      );
    }
  } else {
    throw Error('Invalid atom type value! Must be either an atom or path.');
  }

  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const [onChange] = useStateXOnToggle(pathOrAtom, options);
  return { onChange, checked: !!value, type: 'checkbox' };
}

function usePrintTree() {
  const store = useStateXStore();
  return (path: Path) => {
    const sb: string[] = [];
    store.trie().forEach(path, (node: Node<NodeData<any>>, level: number) => {
      sb.push(
        `${''.padStart(level * 2, '-')}${pathToString(node.path)} ${
          node.data.holders.size
        }`,
      );
      node.data.holders.forEach((holder) => {
        sb.push(
          `${''.padStart(level * 2 + 2, ' ')}${pathToString(holder.node.path)}`,
        );
      });
    });
    return sb.join('\n');
  };
}

function useActivePaths() {
  const store = useStateXStore();
  return (path: Path) => {
    const sb: Path[] = [];
    store.trie().forEach(path, (node: Node<NodeData<any>>, level: number) => {
      sb.push(node.path);
    });
    return sb;
  };
}

export {
  isReactElement,
  useActivePaths,
  usePrintTree,
  useStateXForCheckbox,
  useStateXForNumberInput,
  useStateXForSelect,
  useStateXForTextInput,
  useStateXForToggle,
  useStateXRef,
  useStateXRefValue,
};
