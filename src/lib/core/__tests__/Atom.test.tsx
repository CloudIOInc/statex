/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../testing/JestInit.ts';

import React, { ReactNode } from 'react';
import {
  Atom,
  useStateXValue,
  useRemoveStateX,
  atom,
  action,
  useStateXActionCaller,
  StateXProvider,
} from '../..';
import {
  firstNameAtom,
  lastNameAtom,
  render,
  initialState,
  keyAtom,
} from '../../testing/Common';
import { useStateXRefValue } from '../StateXUIHooks';
import { renderHook, act } from '@testing-library/react-hooks';
import { useStateXResetter } from '../StateXHooks';

let wrapper: React.FunctionComponent<{}>;
describe('Atom', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return (
        <StateXProvider initialState={initialState()} handleError={() => {}}>
          {children}
        </StateXProvider>
      );
    };
  });

  test('instanceof Atom', () => {
    expect(firstNameAtom instanceof Atom).toBe(true);
  });

  test('should render initial state values', () => {
    let counter = 0;
    const { textContent, getActivePaths } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      const lastName = useStateXValue(lastNameAtom);
      counter++;
      return <>{`${firstName} ${lastName}`}</>;
    });
    expect(textContent()).toBe('Steve Jobs');
    expect(counter).toBe(1);
    expect(getActivePaths([])).toStrictEqual([
      [],
      ['root'],
      ['root', 'person'],
      ['root', 'person', 'firstName'],
      ['root', 'person', 'lastName'],
    ]);
  });

  test('removing object key should reset to default value', () => {
    let counter = 0;
    const { act, textContent, remove, get } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      const lastName = useStateXValue(lastNameAtom);
      counter++;
      return <>{`${firstName} ${lastName}`}</>;
    });
    expect(textContent()).toBe('Steve Jobs');
    act(() => {
      remove(firstNameAtom);
    });
    expect(textContent()).toBe('undefined Jobs');
    expect(counter).toBe(2);
    const state = initialState();
    delete state.root.person.firstName;
    expect(get([])).toStrictEqual(state);
  });

  test('useRemoveStateX using atom', () => {
    let counter = 0;
    const { act, textContent, data } = render(({ data }) => {
      const [firstName, removeFirstName] = useRemoveStateX(firstNameAtom);
      counter++;
      data.removeFirstName = removeFirstName;
      return <>{`${firstName}`}</>;
    }, {});
    expect(textContent()).toBe('Steve');
    act(() => {
      data.removeFirstName(firstNameAtom);
    });
    expect(textContent()).toBe('undefined');
    expect(counter).toBe(2);
  });

  test('single rerender on multiple state changes', () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      const lastName = useStateXValue(lastNameAtom);
      counter++;
      return <>{`${firstName} ${lastName}`}</>;
    });
    expect(textContent()).toBe('Steve Jobs');
    act(() => {
      set(firstNameAtom, 'a');
      set(lastNameAtom, 'b');
      set(firstNameAtom, 'x');
      set(lastNameAtom, 'y');
    });
    expect(textContent()).toBe('x y');
    expect(counter).toBe(2);
  });

  test('shouldComponentUpdate false', () => {
    let counter = 0;
    const a = atom({
      path: ['a'],
      defaultValue: 'a',
      shouldComponentUpdate: () => {
        return false;
      },
    });
    const { act, textContent, set } = render(() => {
      const value = useStateXValue(a);
      counter++;
      return <>{value}</>;
    });
    expect(textContent()).toBe('a');
    counter = 0;
    act(() => {
      set(a, 'x');
    });
    expect(textContent()).toBe('a');
    expect(counter).toBe(0);
  });

  test('shouldComponentUpdate false', () => {
    let counter = 0;
    const a = atom({
      path: ['a'],
      defaultValue: 'a',
      shouldComponentUpdate: () => {
        return true;
      },
    });
    const { act, textContent, set } = render(() => {
      const value = useStateXValue(a, {
        shouldComponentUpdate: () => {
          return false;
        },
      });
      counter++;
      return <>{value}</>;
    });
    expect(textContent()).toBe('a');
    counter = 0;
    act(() => {
      set(a, 'x');
    });
    expect(textContent()).toBe('a');
    expect(counter).toBe(0);
  });

  test('should not rerender on state change with same values', () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      const lastName = useStateXValue(lastNameAtom);
      counter++;
      return <>{`${firstName} ${lastName}`}</>;
    });
    expect(textContent()).toBe('Steve Jobs');
    expect(counter).toBe(1);
    act(() => {
      set(firstNameAtom, 'Steve');
      set(lastNameAtom, 'Jobs');
    });
    expect(textContent()).toBe('Steve Jobs');
    expect(counter).toBe(1);
  });

  test('setting the value in store with undefined should rerender with undefined', () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      counter++;
      return <>{`${firstName}`}</>;
    });
    expect(textContent()).toBe('Steve');
    expect(counter).toBe(1);
    act(() => {
      // @ts-ignore
      set(firstNameAtom, undefined);
    });
    expect(textContent()).toBe('undefined');
    expect(counter).toBe(2);
  });

  test('setting the value in store with null should rerender with null', () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      counter++;
      return <>{`${firstName}`}</>;
    });
    expect(textContent()).toBe('Steve');
    expect(counter).toBe(1);
    act(() => {
      // @ts-ignore
      set(firstNameAtom, null);
    });
    expect(textContent()).toBe('null');
    expect(counter).toBe(2);
  });

  test('Missing default value should render undefined', () => {
    let counter = 0;
    const { textContent } = render(() => {
      const value = useStateXValue(['x'], undefined);
      counter++;
      return <>{value === undefined ? 'undefined' : value}</>;
    });
    expect(textContent()).toBe('undefined');
    expect(counter).toBe(1);
  });

  test(`dynamically changing atom's path with no default value causes extra re-render`, () => {
    const ref = { defaultValue: firstNameAtom.defaultValue };
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const key = useStateXValue(keyAtom) || 'firstName';
      const path = ['root', 'person', key];
      const firstName = useStateXValue(path, ref.defaultValue);
      counter++;
      return <>{`${firstName}`}</>;
    });
    act(() => {
      // @ts-ignore
      ref.defaultValue = undefined;
      set(keyAtom, 'unknownKey');
    });
    expect(textContent()).toBe('undefined');
    expect(counter).toBe(3);
  });

  test('ref', () => {
    let counter = 0;
    const { textContent, setRef, act } = render(() => {
      const ref = useStateXRefValue(['ref']);
      counter++;
      return <>{ref?.current}</>;
    });
    expect(textContent()).toBe('');
    expect(counter).toBe(1);
    act(() => {
      setRef(['ref'], { current: 'x' });
    });
    expect(textContent()).toBe('x');
    expect(counter).toBe(2);
  });

  test('reset', () => {
    let counter = 0;
    const { textContent, set, act, reset } = render(() => {
      const firstName = useStateXValue(firstNameAtom);
      counter++;
      return <>{firstName}</>;
    });
    expect(textContent()).toBe('Steve');
    expect(counter).toBe(1);
    act(() => {
      set(firstNameAtom, 'x');
    });
    expect(textContent()).toBe('x');
    expect(counter).toBe(2);
    act(() => {
      reset(firstNameAtom);
    });
    expect(textContent()).toBe('DEFAULT_firstName');
    expect(counter).toBe(3);
  });

  test('useStateXActionCaller', () => {
    const { result } = renderHook(
      () => {
        const reset = useStateXResetter();
        const value = useStateXValue(firstNameAtom);
        return { reset, value };
      },
      { wrapper },
    );
    expect(result.current.value).toBe('Steve');
    act(() => {
      result.current.reset(firstNameAtom);
    });
    expect(result.current.value).toBe('DEFAULT_firstName');
  });
});
