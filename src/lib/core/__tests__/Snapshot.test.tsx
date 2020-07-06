/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../testing/JestInit.ts';

import React, { ReactNode, useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  StateXProvider,
  useStateXGetter,
  useStateXSnapshotSetter,
  useStateXSnapshotCallback,
  action,
  useWithStateX,
  useStateXAction,
} from '../StateXHooks';

let wrapper: React.FunctionComponent<{}>;
const initialState = {
  root: {
    person: { firstName: 'Steve', lastName: 'Jobs' },
    numArray: [0, 1, 2],
    objArray: [{ a: 'a' }, { b: 'b' }],
    num: 1,
  },
};
describe('Snapshot', () => {
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

  test('useStateXSnapshotCallback', () => {
    const myAction = action<string>(({ set, remove }, value) => {
      set(['a', 'x'], 'y2');
      remove(['b', 1]);
    });
    const { result } = renderHook(
      () => {
        useWithStateX({ a: { x: 'y' }, b: [0, 1] });
        const [s, setS] = useState<any>({});
        useStateXSnapshotCallback(({ state }) => {
          setS(state);
        }, []);
        const myActionFn = useStateXAction(myAction);
        return { myActionFn, s };
      },
      { wrapper },
    );
    act(() => {
      result.current.myActionFn('x');
    });
    expect(result.current.s).toStrictEqual({ a: { x: 'y2' }, b: [0] });
  });

  test('useStateXSnapshotCallback not be call if the path state is not changed', () => {
    const aMock = jest.fn();
    const rootMock = jest.fn();
    const myAction = action(({ remove }) => {
      remove(['b']);
    });
    const { result } = renderHook(
      () => {
        useWithStateX({ a: { x: 'y' }, b: [] });
        const [localState, setLocalState] = useState<any>({});
        useStateXSnapshotCallback(() => {
          aMock();
        }, ['a']);
        useStateXSnapshotCallback(() => {
          rootMock();
        });
        useStateXSnapshotCallback(
          ({ state }) => {
            setLocalState(state);
          },
          ['b'],
        );
        const myActionFn = useStateXAction(myAction);
        return { myActionFn, localState };
      },
      { wrapper },
    );
    expect(result.current.localState).toStrictEqual([]);
    act(() => {
      aMock.mockReset();
      rootMock.mockReset();
      result.current.myActionFn();
    });
    expect(aMock).not.toBeCalled();
    expect(rootMock).toBeCalled();
    expect(result.current.localState).toBe(undefined);
  });

  test('useStateXSnapshotSetter', () => {
    const { result } = renderHook(
      () => {
        const setSnapshot = useStateXSnapshotSetter();
        const get = useStateXGetter();
        return {
          setSnapshot,
          get,
        };
      },
      { wrapper },
    );
    const { setSnapshot, get } = result.current;
    act(() => {
      setSnapshot({ a: { b: 'y' } }, []);
    });
    expect(get(['a', 'b'])).toBe('y');
    act(() => {
      setSnapshot({});
    });
    expect(get([])).toStrictEqual({});
  });
});
