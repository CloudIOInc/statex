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
import useStateXUndo from '../useStateXUndo';
import {
  StateXProvider,
  useStateXSetter,
  useStateXGetter,
} from '../../../core/StateXHooks';
import UndoRedo from '../UndoRedo';

let wrapper: React.FunctionComponent<{}>;
const initialState = { a: { b: 'x' } };
describe('StateX', () => {
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
    expect(ur.getIndex('#')).toBe(1);
    ur.undo('#');
    expect(ur.getIndex('#')).toBe(0);
    ur.add('#', { a: 5 });
    expect(ur.getIndex('#')).toBe(1);
  });

  test('useStateXUndo auto', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const { canRedo, canUndo, redo, reset, undo } = useStateXUndo(
          ['a'],
          '#',
          true,
        );
        return {
          set,
          get,
          canRedo,
          canUndo,
          redo,
          reset,
          undo,
        };
      },
      { wrapper },
    );
    const { set, get, redo, reset, undo } = result.current;
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(get(['a', 'b'])).toBe('x');
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
      reset();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      set(['a', 'c'], 'c');
      set(['a', 'd'], 'd');
    });
    expect(get(['a'])).toStrictEqual({ b: 'y', c: 'c', d: 'd' });
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      set(['a', 'c'], 'c2');
      set(['a', 'd'], 'd2');
    });
    expect(get(['a'])).toStrictEqual({ b: 'y', c: 'c2', d: 'd2' });
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      set(['a', 'c'], 'c3');
      set(['a', 'e'], 'e');
    });
    expect(get(['a'])).toStrictEqual({ b: 'y', c: 'c3', d: 'd2', e: 'e' });
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  test('useStateXUndo manual', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const {
          addToUndo,
          canRedo,
          canUndo,
          redo,
          reset,
          undo,
          updateToUndo,
        } = useStateXUndo(['a'], 'some value', false);
        return {
          set,
          get,
          addToUndo,
          canRedo,
          canUndo,
          redo,
          reset,
          undo,
          updateToUndo,
        };
      },
      { wrapper },
    );
    const { set, get, addToUndo, redo, reset, undo } = result.current;
    act(() => {
      addToUndo();
    });
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(get(['a', 'b'])).toBe('x');
    act(() => {
      set(['a', 'b'], 'y');
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      addToUndo();
    });
    expect(result.current.canUndo).toBe(true);
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
      reset();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  test('useStateXUndo no params', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const {
          addToUndo,
          canRedo,
          canUndo,
          clear,
          isEmpty,
          redo,
          reset,
          undo,
          updateToUndo,
        } = useStateXUndo();
        return {
          addToUndo,
          canRedo,
          canUndo,
          clear,
          get,
          isEmpty,
          redo,
          reset,
          set,
          undo,
          updateToUndo,
        };
      },
      { wrapper },
    );
    const {
      clear,
      isEmpty,
      set,
      get,
      addToUndo,
      redo,
      reset,
      undo,
    } = result.current;
    act(() => {
      reset(); // no effect
    });
    act(() => {
      addToUndo();
    });
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(get(['a', 'b'])).toBe('x');
    act(() => {
      set(['a', 'b'], 'y');
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      addToUndo();
    });
    expect(result.current.canUndo).toBe(true);
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
      reset();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    act(() => {
      reset();
    });
    expect(get(['a', 'b'])).toBe('y');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(isEmpty()).toBe(false);
    act(() => {
      clear();
    });
    expect(isEmpty()).toBe(true);
    act(() => {
      clear();
    });
    expect(isEmpty()).toBe(true);
  });
});
