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
import { useStateXUndo, useStateXAddToUndo } from '../useStateXUndo';
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
    expect(ur.getIndex('#')).toBe(2);
    ur.undo('#');
    expect(ur.getIndex('#')).toBe(1);
    ur.add('#', { a: 5 });
    expect(ur.getIndex('#')).toBe(2);
  });

  test('useStateXUndo manual', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXSetter();
        const get = useStateXGetter();
        const addToUndo = useStateXAddToUndo();
        const { canRedo, canUndo, redo, undo, clear, isEmpty } = useStateXUndo(
          ['a'],
          'some value',
        );
        return {
          set,
          get,
          canRedo,
          canUndo,
          redo,
          undo,
          addToUndo,
          clear,
          isEmpty,
        };
      },
      { wrapper },
    );
    const { set, get, redo, undo, addToUndo, clear, isEmpty } = result.current;
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
