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
} from './StateXTypes';
import React, { useCallback, useRef, MutableRefObject, useEffect } from 'react';
import {
  useStateXValue,
  useStateXValueSetter,
  useStateXValueInternal,
} from './StateXHooks';
import Atom from './Atom';
import { useStateXStore } from './StateXContext';
import { getNode } from './StateX';
import { isPath } from './ImmutableTypes';
import { isReactElement } from './StateXUtils';

function useStateXOnChangeForTextInput<T extends HTMLElement>(
  path: PathOrStateXOrSelector<string>,
  options?: Options,
): [(event: React.ChangeEvent<T>) => void, Dispatch<string>] {
  const setValue = useStateXValueSetter<string>(path, options);
  const onChange = useCallback((event) => setValue(event.target.value), [
    setValue,
  ]);

  return [onChange, setValue];
}

function useStateXOnChangeForNumberInput(
  path: PathOrStateXOrSelector<number>,
): [(event: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<number>] {
  const setValue = useStateXValueSetter<number>(path);
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
  const node = getNode(store, path);
  if (!node.data.ref) {
    node.data.ref = newRef;
  }

  useEffect(() => {
    return () => {
      node.data.ref = undefined;
    };
  }, [node]);

  return node.data.ref;
}

function useStateXRefValue<T>(path: Path): MutableRefObject<T> | undefined {
  const store = useStateXStore();
  const node = getNode<T>(store, path);
  return node.data.ref;
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
    if (typeof defaultOrOptions !== 'string') {
      defaultOrOptions = '';
    }
    defaultValue = defaultOrOptions;
  } else {
    throw Error('Invalid atom type value! Must be either an atom or path.');
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
    if (typeof defaultOrOptions !== 'number') {
      defaultOrOptions = 0;
    }
    defaultValue = defaultOrOptions;
  } else {
    throw Error('Invalid atom type value! Must be either an atom or path.');
  }
  const value = useStateXValueInternal(pathOrAtom, defaultValue, options);
  const [onChange] = useStateXOnChangeForNumberInput(pathOrAtom);
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
    if (typeof defaultOrOptions !== 'boolean') {
      defaultOrOptions = false;
    }
    defaultValue = defaultOrOptions;
  } else {
    throw Error('Invalid atom type value! Must be either an atom or path.');
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
    if (typeof defaultOrOptions !== 'boolean') {
      defaultOrOptions = false;
    }
    defaultValue = defaultOrOptions;
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
        `${''.padStart(level * 2, '-')}${node.path.join('.')} ${
          node.data.holders.size
        }`,
      );
      node.data.holders.forEach((holder) => {
        sb.push(
          `${''.padStart(level * 2 + 2, ' ')}${holder.node.path.join('.')}`,
        );
      });
    });
    console.log(sb.join('\n'));
  };
}

export {
  isReactElement,
  usePrintTree,
  useStateXForCheckbox,
  useStateXForNumberInput,
  useStateXForSelect,
  useStateXForTextInput,
  useStateXForToggle,
  useStateXRef,
  useStateXRefValue,
};
