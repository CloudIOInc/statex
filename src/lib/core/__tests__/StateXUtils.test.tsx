/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import '../../testing/JestInit.ts';

import {
  emptyFunction,
  shouldFreeze,
  deepFreeze,
  applyParamsToPath,
  isError,
} from '../StateXUtils';
import { renderHook } from '@testing-library/react-hooks';
import { Resolvable, NodeData, StateXHolder } from '../StateXTypes';
import React, { useEffect, useRef, useState } from 'react';
import Trie from '../Trie';
import { render } from '@testing-library/react';

describe('StateXUtils', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('emptyFunction', () => {
    expect(typeof emptyFunction).toBe('function');
    expect(emptyFunction()).toBe(undefined);
  });

  test('shouldFreeze', () => {
    expect(shouldFreeze({})).toBe(true);
  });

  test('shouldFreeze null', () => {
    expect(shouldFreeze(null)).toBe(false);
  });

  test('deepFreeze ref', () => {
    const { result } = renderHook(() => {
      return useRef(null);
    });
    expect(() => deepFreeze(result.current)).toThrowError(
      'Ref must not be passed to deepFreeze!',
    );
  });

  test('shouldFreeze React Element', () => {
    const ele = <div>test</div>;
    expect(shouldFreeze(ele)).toBe(false);
  });

  test('shouldFreeze function', () => {
    const ele = () => 'test';
    expect(shouldFreeze(ele)).toBe(false);
  });

  test('shouldFreeze ref', () => {
    const { result } = renderHook(() => {
      return shouldFreeze(useRef(null));
    });
    expect(result.current).toStrictEqual(false);
  });

  test('shouldFreeze Promise', () => {
    expect(shouldFreeze(new Promise(() => {}))).toBe(false);
  });

  test('shouldFreeze Resolvable', () => {
    const trie = new Trie<NodeData<any>>(() => ({
      holders: new Set<StateXHolder<any>>(),
      defaultValue: undefined,
    }));
    expect(shouldFreeze(new Resolvable(trie.getNode([]), false))).toBe(false);
  });

  test('shouldFreeze window', () => {
    expect(shouldFreeze(window)).toBe(false);
  });

  test('isError', () => {
    expect(isError(new Error('test'))).toBe(true);
  });

  test('isError', () => {
    expect(isError({})).toBe(false);
  });

  test('applyParamsToPath', () => {
    expect(applyParamsToPath(['a', ':b'], { b: 'x' })).toStrictEqual([
      'a',
      'x',
    ]);
  });

  test('applyParamsToPath error', () => {
    expect(() => applyParamsToPath(['a', ':b'], { x: 'y' })).toThrowError(
      'Missing parameter values for :b in path ["a",":b"]. Params passed {"x":"y"}',
    );
  });

  test('applyParamsToPath error with {}', () => {
    expect(() => applyParamsToPath(['a', ':b'], {})).toThrowError(
      'Missing parameter values for :b in path ["a",":b"]. Params passed {}',
    );
  });

  test('applyParamsToPath error with no params', () => {
    expect(() => applyParamsToPath(['a', ':b'])).toThrowError(
      'Missing parameter values for :b in path ["a",":b"]. No params passed!',
    );
  });

  test('shouldFreeze div', () => {
    const Comp = () => {
      const ref = useRef<HTMLDivElement | null>(null);
      const [val, setVal] = useState(true);
      useEffect(() => {
        setVal(shouldFreeze(ref.current));
      }, []);
      return (
        <div data-testid="a" ref={ref}>
          {String(val)}
        </div>
      );
    };
    const { getByTestId } = render(<Comp />);
    const div = getByTestId('a') as HTMLDivElement;
    expect(div.innerHTML).toBe('false');
  });

  test('shouldFreeze obj', () => {
    expect(shouldFreeze({ nodeType: 1, nodeName: '' })).toBe(true);
  });

  test('shouldFreeze obj', () => {
    //@ts-ignore
    global.window = undefined;
    expect(shouldFreeze({ nodeType: 1, nodeName: '' })).toBe(true);
  });
});
