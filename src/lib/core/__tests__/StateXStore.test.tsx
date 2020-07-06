/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { StateX } from '../StateXStore';
import { StateXProvider, useStateX, useStateXSetter } from '../StateXHooks';
import React, { ReactNode } from 'react';
import { useStateXStore } from '../StateXContext';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, act as ract, fireEvent } from '@testing-library/react';

let spy: jest.SpyInstance;

let wrapper: React.FunctionComponent<{}>;

describe('DefaultErrorHandler', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    spy = jest.spyOn(global.console, 'debug').mockImplementation();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return <StateXProvider>{children}</StateXProvider>;
    };
  });
  afterEach(() => {
    spy.mockRestore();
  });

  test('StateX', () => {
    const a = new StateX();
    expect(a.state).toStrictEqual({});
  });

  test('useDebug', () => {
    const a = new StateX();
    a.debug('test', 'my-action');
    expect(spy).toHaveBeenLastCalledWith(1, 'my-action => test');
    a.debug('test', 'my-action');
    expect(spy).toHaveBeenCalledTimes(2);
    a.debug('test', 'my-action', 'data');
    expect(spy).toHaveBeenCalledTimes(3);
    a.debug('test', 'my-action', 'data');
    expect(spy).toHaveBeenCalledTimes(4);
  });

  test('activateNode to throw error after 10 recursive calls', () => {
    const { result } = renderHook(() => useStateXStore(), { wrapper });
    const store = result.current;
    const node = store.trie().getNode(['a'], true);
    act(() => {
      for (let i = 0; i < 11; i++) {
        store.activateNode(node, 'action');
      }
      expect(() => store.activateNode(node, 'action')).toThrowError(
        'Trying to action ["a"] too many times!',
      );
    });
  });

  test('warn', () => {
    const spy1 = jest.spyOn(global.console, 'warn').mockImplementation();
    const spy2 = jest.spyOn(global.console, 'error').mockImplementation();
    function Parent() {
      const [value, setValue] = useStateX(['a'], '');
      const set = useStateXSetter();
      if (value === 'a') {
        set(['b'], 'x'); // should write to console.warn
      }
      return (
        <div data-testid="a" onClick={() => setValue('a')}>
          {value}
        </div>
      );
    }
    const { getByTestId } = render(<Parent />, { wrapper });
    const btn = getByTestId('a') as HTMLButtonElement;
    ract(() => {
      fireEvent.click(btn, {});
    });
    expect(spy1).toHaveBeenCalled();
    spy1.mockRestore();
    spy2.mockRestore();
  });
});
