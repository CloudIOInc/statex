/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../testing/JestInit.ts';

import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { StateXProvider } from '../StateXContext';
import { useStateXValue, useDebug } from '../StateXHooks';
import ErrorBoundary from '../../../examples/ErrorBoundary';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { testSelector } from '../../testing/TestSelectors';
import { resetDebug, mockDebug } from '../../testing/JestInit';

let wrapper: React.FunctionComponent<{}>;
describe('DefaultErrorHandler', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return <StateXProvider>{children}</StateXProvider>;
    };
  });

  test('DefaultErrorHandler', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();
    const s = testSelector('throw error');
    function Parent() {
      const value = useStateXValue(s);
      return <>{value}</>;
    }
    render(
      <ErrorBoundary>
        <Parent />
      </ErrorBoundary>,
      { wrapper },
    );
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  test('useDebug', () => {
    const spy = jest.spyOn(global.console, 'debug').mockImplementation();
    const { result } = renderHook(() => useDebug(), { wrapper });
    act(() => {
      resetDebug();
      result.current('debug msg', 'my-action');
      mockDebug();
    });
    expect(spy).toHaveBeenLastCalledWith(1, 'my-action => debug msg');
    spy.mockRestore();
  });
});
