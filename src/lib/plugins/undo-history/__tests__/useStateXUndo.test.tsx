/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../../testing/JestInit.ts';

import React, { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  useStateXUndo,
  useStateXAddToUndo,
  useStateXRevertUndo,
} from '../useStateXUndo';
import {
  StateXProvider,
  useStateXSetter,
  useStateXGetter,
} from '../../../core/StateXHooks';
import UndoRedo from '../UndoRedo';

let wrapper: React.FunctionComponent<{}>;
const initialState = { a: { b: 'x' } };
describe('UndoRedo', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return (
        <StateXProvider initialState={initialState} handleError={() => {}}>
          {children}
        </StateXProvider>
      );
    };
  });

  test('UndoRedo', () => {
    const onChange = jest.fn();
    const ur = new UndoRedo({ onChange });
    ur.undo('#');
    expect(onChange).not.toBeCalled();
    ur.redo('#');
    expect(onChange).not.toBeCalled();
    ur.setLimit(2);
    ur.add('#', { a: 1 });
    expect(onChange).not.toBeCalledTimes(1);
    ur.add('#', { a: 2 });
    ur.add('#', { a: 3 });
    ur.add('#', { a: 4 });
    expect(ur.getIndex('#')).toBe(2);
    ur.undo('#');
    expect(ur.getIndex('#')).toBe(1);
    ur.add('#', { a: 5 });
    expect(ur.getIndex('#')).toBe(2);
    ur.setLimit(10);
    ur.add('#', { a: 10 });
    ur.add('#', { a: 11 });
    ur.add('#', { a: 12 });
    expect(ur.getIndex('#')).toBe(5);
    ur.undo('#');
    ur.undo('#');
    expect(ur.getIndex('#')).toBe(3);
    ur.add('#', { a: 13 });
    expect(ur.getIndex('#')).toBe(4);
  });

  test('useStateXUndo manual', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const addToUndo = useStateXAddToUndo();
        const revert = useStateXRevertUndo();
        const { canRedo, canUndo, redo, undo, clear, isEmpty } = useStateXUndo(
          ['a'],
          'some value',
        );
        return {
          addToUndo,
          canRedo,
          canUndo,
          clear,
          get,
          isEmpty,
          redo,
          revert,
          set,
          undo,
        };
      },
      { wrapper },
    );
    const {
      addToUndo,
      clear,
      get,
      isEmpty,
      redo,
      revert,
      set,
      undo,
    } = result.current;
    act(() => {
      addToUndo(['aa', 'bb']); // no effect
    });
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(get(['a', 'b'])).toBe('x');
    act(() => {
      addToUndo(['a', 'b']);
    });
    act(() => {
      set(['a', 'b'], 'y');
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      undo();
    });
    expect(get(['a', 'b'])).toBe('x');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
    act(() => {
      redo();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      clear();
    });
    expect(isEmpty()).toBe(true);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      clear();
    });
    expect(isEmpty()).toBe(true);
  });

  test('useStateXUndo revert', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const addToUndo = useStateXAddToUndo();
        const revert = useStateXRevertUndo();
        const { canRedo, canUndo, isEmpty, undo } = useStateXUndo(
          ['a'],
          'some value',
        );
        return {
          addToUndo,
          canRedo,
          canUndo,
          get,
          isEmpty,
          revert,
          set,
          undo,
        };
      },
      { wrapper },
    );
    const { addToUndo, get, isEmpty, revert, set, undo } = result.current;
    act(() => {
      addToUndo(['a', 'b']);
    });
    act(() => {
      set(['a', 'b'], 'y');
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      revert(['a', 'b']);
    });
    expect(isEmpty()).toBe(true);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);

    act(() => {
      set(['a', 'b'], 'a');
      addToUndo(['a', 'b']);
      set(['a', 'b'], 'b');
      addToUndo(['a', 'b']);
      undo();
    });
    expect(result.current.canRedo).toBe(true);
    act(() => {
      revert(['a', 'b']); // no effect
    });
    expect(result.current.canRedo).toBe(true);
  });

  test('useStateXUndo no params', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const addToUndo = useStateXAddToUndo();
        const { canRedo, canUndo, redo, undo } = useStateXUndo();
        return {
          set,
          get,
          canRedo,
          canUndo,
          redo,
          undo,
          addToUndo,
        };
      },
      { wrapper },
    );
    const { set, get, redo, undo, addToUndo } = result.current;
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(get(['a', 'b'])).toBe('x');
    act(() => {
      addToUndo(['a', 'b']);
    });
    act(() => {
      set(['a', 'b'], 'y');
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      undo();
    });
    expect(get(['a', 'b'])).toBe('x');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
    act(() => {
      redo();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });
});

test('useStateXUndo multi', () => {
  const { result } = renderHook(
    () => {
      const set = useStateXSetter();
      const get = useStateXGetter();
      const addToUndo = useStateXAddToUndo();
      const revert = useStateXRevertUndo();
      const { canRedo, canUndo, isEmpty } = useStateXUndo(['a'], 'some value');
      const {
        canRedo: canRedo2,
        canUndo: canUndo2,
        isEmpty: isEmpty2,
      } = useStateXUndo(['b'], 'some value');
      return {
        addToUndo,
        canRedo,
        canRedo2,
        canUndo,
        canUndo2,
        get,
        isEmpty,
        isEmpty2,
        revert,
        set,
      };
    },
    { wrapper },
  );
  const { addToUndo, get, isEmpty, revert, set } = result.current;
  act(() => {
    addToUndo(['a', 'b']);
  });
  act(() => {
    set(['a', 'b'], 'y');
  });
  expect(get(['a', 'b'])).toBe('y');
  expect(result.current.canUndo2).toBe(false);
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);
  act(() => {
    revert(['a', 'b']);
  });
  expect(isEmpty()).toBe(true);
  expect(result.current.canUndo).toBe(false);
  expect(result.current.canRedo).toBe(false);
});

test('useStateXUndo undo and add', () => {
  const { result } = renderHook(
    () => {
      const set = useStateXSetter();
      const get = useStateXGetter();
      const addToUndo = useStateXAddToUndo();
      const revert = useStateXRevertUndo();
      const { canRedo, canUndo, isEmpty, undo } = useStateXUndo(['x'], '#');
      return {
        addToUndo,
        canRedo,
        canUndo,
        get,
        isEmpty,
        revert,
        set,
        undo,
      };
    },
    { wrapper },
  );
  const { addToUndo, get, isEmpty, revert, set, undo } = result.current;
  act(() => {
    set(['x', 'a'], 'a');
    addToUndo(['x', 'a']);
    set(['x', 'a'], 'b');
    addToUndo(['x', 'a']);
    set(['x', 'a'], 'c');
    addToUndo(['x', 'a']);
  });
  expect(get(['x', 'a'])).toBe('c');
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);
  act(() => {
    undo();
    undo();
  });
  expect(get(['x', 'a'])).toBe('b');
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(true);
  act(() => {
    set(['x', 'a'], 'x');
    addToUndo(['x', 'a']);
  });
});
