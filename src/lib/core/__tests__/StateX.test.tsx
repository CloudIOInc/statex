/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../testing/JestInit.ts';
import {
  useStateXValue,
  useStateX,
  atom,
  useWithStateX,
  useStateXGetter,
  useStateXCallback,
  action,
  useStateXAction,
  selector,
  useStateXSetter,
  useStateXValueGetter,
  useRemoveStateX,
  useStateXRefGetter,
  useDebug,
  useStateXRemover,
  useStateXRef,
  useStateXRefValue,
  useStateXForTextInput,
  useActivePaths,
  useStateXRefSetter,
} from '../..';
import { render, act as ract, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import React, {
  ReactNode,
  useEffect,
  useRef,
  memo,
  useLayoutEffect,
  useState,
} from 'react';
import { StateXProvider, useStateXStore } from '../StateXContext';
import { getNode } from '../StateX';
import { pathToString } from '../StateXUtils';
import { useStateXActionCaller } from '../StateXHooks';

let wrapper: React.FunctionComponent<{}>;
describe('StateX', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return <StateXProvider handleError={() => {}}>{children}</StateXProvider>;
    };
  });

  test('useStateXValue default value', () => {
    const { result } = renderHook(
      () => {
        const value = useStateXValue(['a', 'b'], 'ab');
        return value;
      },
      { wrapper },
    );
    expect(result.current).toBe('ab');
  });

  test('useStateXValue default object', () => {
    const { result } = renderHook(
      () =>
        useStateXValue<Record<string, string>>(['root', 'items'], {
          a: 'a',
        }),
      { wrapper },
    );
    expect(result.current).toMatchObject({ a: 'a' });
  });

  test('useStateX default value', () => {
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(['a', 'b'], 'ab');
        return { value, setValue };
      },
      { wrapper },
    );
    expect(result.current.value).toBe('ab');
  });

  test('setStateXValue array', () => {
    const arr = ['x', 'y', 'z'];
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(['a', 'b'], ['']);
        return { value, setValue };
      },
      { wrapper },
    );

    act(() => {
      result.current.setValue(arr);
    });

    expect(result.current.value).toStrictEqual(arr);
  });

  test('useStateX default array value', () => {
    const arr = ['x', 'y', 'z'];
    const { result } = renderHook(
      () => {
        const [value] = useStateX(['a', 'b'], arr);
        return value;
      },
      { wrapper },
    );
    expect(result.current).toStrictEqual(arr);
  });

  test('onChange callback', () => {
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(['a', 'b'], 'ab', {
          onChange: ({ value, oldValue, set }) => {
            set(['root', 'oc'], { value, oldValue });
          },
        });
        const oc = useStateXValue(['root', 'oc'], {});
        return { value, setValue, oc };
      },
      { wrapper },
    );
    act(() => {
      result.current.setValue('xy');
    });
    expect(result.current.oc).toMatchObject({ value: 'xy', oldValue: 'ab' });
  });

  test('set value', () => {
    const { result } = renderHook(() => useStateX(['a', 'b'], 'ab'), {
      wrapper,
    });
    act(() => {
      result.current[1]('xy');
    });
    expect(result.current[0]).toBe('xy');
  });

  test('parent value', () => {
    const { result } = renderHook(
      () => {
        const [a, setA] = useStateX(['root', 'a'], 'a');
        const [b, setB] = useStateX(['root', 'b'], 'b');
        const [root, setRoot] = useStateX(['root'], {});
        return { a, b, setA, setB, root, setRoot };
      },
      { wrapper },
    );
    act(() => {
      result.current.setA('x');
      result.current.setB('y');
    });
    expect(result.current.root).toMatchObject({ a: 'x', b: 'y' });
  });

  test('set child value', () => {
    const { result } = renderHook(
      () => {
        const [a, setA] = useStateX(['root', 'a'], 'a');
        const [b, setB] = useStateX(['root', 'b'], 'b');
        const [root, setRoot] = useStateX(['root'], {});
        return { a, b, setA, setB, root, setRoot };
      },
      { wrapper },
    );
    act(() => {
      result.current.setRoot({ a: 'x', b: 'y' });
    });
    expect(result.current.a).toBe('x');
    expect(result.current.b).toBe('y');
  });

  test('useStateXRefValue undefined', () => {
    const { result } = renderHook(
      () => {
        const ref = useStateXRefValue(['ui', 'canvas']);
        return { ref };
      },
      { wrapper },
    );
    expect(result.current.ref).toBe(undefined);
  });

  test('useStateXRef', () => {
    const { result } = renderHook(
      () => {
        const ref = useStateXRef(['ui', 'canvas'], null);
        const ref2 = useStateXRefValue(['ui', 'canvas']);
        return { ref, ref2 };
      },
      { wrapper },
    );
    expect(result.current.ref2).toBe(result.current.ref);
  });

  test('useStateXRefGetter', () => {
    const { result } = renderHook(
      () => {
        const ref = useStateXRef(['ui', 'canvas'], null);
        const getRef = useStateXRefGetter();
        return { ref, getRef };
      },
      { wrapper },
    );
    expect(result.current.getRef(['ui', 'canvas'])).toBe(result.current.ref);
  });

  test('path params', () => {
    const initialTodos = [
      {
        id: 1,
        text: 'One',
      },
      {
        id: 2,
        text: 'Two',
      },
    ];
    const todoList = atom({
      path: ['todo', 'list'],
      defaultValue: initialTodos,
    });
    const { result } = renderHook(
      () => {
        useStateX(todoList);
        const text = useStateXForTextInput(
          ['todo', 'list', ':id', 'text'],
          '',
          {
            params: { id: 0 },
          },
        );
        return text;
      },
      { wrapper },
    );
    expect(result.current.value).toBe('One');
    act(() => {
      // @ts-ignore
      result.current.onChange({ target: { value: 'One 1' } });
    });
    expect(result.current.value).toBe('One 1');
  });

  test('useStateXGetter path', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ name: 'Steve' });
        const get = useStateXGetter();
        return get(['name']);
      },
      { wrapper },
    );
    expect(result.current).toBe('Steve');
  });

  test('useStateXValue selector', () => {
    const { result } = renderHook(
      () => {
        const name = selector({
          path: ['name'],
          defaultValue: 'Jobs',
          get: () => 'Jobs',
        });
        return useStateXValue(name);
      },
      { wrapper },
    );
    expect(result.current).toBe('Jobs');
  });

  test('useStateXValue async selector error', () => {
    const name = selector({
      path: ['name'],
      defaultValue: 'Jobs',
      get: () => {
        throw Error('testing');
      },
    });
    const { result } = renderHook(
      () => {
        return useStateXGetter();
      },
      { wrapper },
    );
    act(() => {
      expect(() => result.current(name)).toThrow('testing');
    });
  });

  test('useStateXGetter atom', () => {
    const { result } = renderHook(
      () => {
        const name = atom({ path: ['name'], defaultValue: 'Jobs' });
        const get = useStateXGetter();
        return get(name);
      },
      { wrapper },
    );
    expect(result.current).toBe('Jobs');
  });

  test('useStateXValue []', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ name: 'Steve' });
        return useStateXValue([], {});
      },
      { wrapper },
    );
    expect(result.current).toStrictEqual({ name: 'Steve' });
  });

  test('useStateXCallback', () => {
    const a = atom({ path: ['a'], defaultValue: {} });
    const { result } = renderHook(
      () =>
        useStateXCallback(({ get, set }) => {
          set(a, { x: 'y' });
          return [get(a), get(a)];
        }, []),
      {
        wrapper,
      },
    );
    act(() => {
      const values = result.current();
      expect(values[0] === values[1]).toBe(true);
    });
    // const values = result.current();
    // expect(values[0]).toBe(values[1]);
  });

  test('default value order', () => {
    const Child = memo(function Child() {
      const ref = useRef(0);
      ref.current += 1;
      const value = useStateXValue(['parent', 'x'], 0);
      return (
        <>
          x{ref.current}={value}
        </>
      );
    });
    function Parent() {
      const [, setValue] = useStateX(['parent'], { x: 10, y: 10 });
      useEffect(() => {
        setValue({ x: 20, y: 20 });
      }, [setValue]);
      return <Child />;
    }
    const { getByText } = render(<Parent />, { wrapper });
    ract(() => {});

    expect(!!getByText('x2=20')).toBe(true);
  });

  test('getRef in onChange', () => {
    const Child = memo(function Child() {
      const ref = useStateXRef<HTMLInputElement | null>(['ui', 'ref'], null);
      const val = useStateXForTextInput(['ui', 'value'], '');

      return <input ref={ref} {...val} />;
    });
    function Parent() {
      const [, setValue] = useStateX(['ui', 'value'], '', {
        onChange: ({ set, getRef }) => {
          const ref = getRef<HTMLInputElement | null>(['ui', 'ref']);
          // set INPUT
          set(['ui', 'value'], `onChange has set ${ref?.current?.nodeName}`);
        },
      });
      useEffect(() => {
        setValue('Test');
      }, [setValue]);
      return <Child />;
    }
    const { getAllByDisplayValue } = render(<Parent />, { wrapper });
    ract(() => {});

    expect(getAllByDisplayValue('onChange has set INPUT').length).toBe(1);
  });

  test('getRef in updater', () => {
    const a = atom({
      path: ['ui', 'value'],
      defaultValue: '',
      updater: ({ getRef }) => {
        const ref = getRef<HTMLInputElement | null>(['ui', 'ref']);
        // set INPUT
        return `updater has set ${ref?.current?.nodeName}`;
      },
    });

    const Child = memo(function Child() {
      const ref = useStateXRef<HTMLInputElement | null>(['ui', 'ref'], null);
      const val = useStateXForTextInput(a);

      return <input ref={ref} {...val} />;
    });
    function Parent() {
      const [, setValue] = useStateX(a);
      useEffect(() => {
        setValue('Test');
      }, [setValue]);
      return <Child />;
    }
    const { getAllByDisplayValue } = render(<Parent />, { wrapper });
    ract(() => {});

    expect(getAllByDisplayValue('updater has set INPUT').length).toBe(1);
  });

  test('getRef in action', () => {
    const a = atom({
      path: ['ui', 'value'],
      defaultValue: '',
    });

    const myAction = action(({ set, getRef }) => {
      const ref = getRef<HTMLInputElement | null>(['ui', 'ref']);
      // set INPUT
      set(a, `myAction has set ${ref?.current?.nodeName}`);
    });

    function Comp() {
      const ref = useStateXRef<HTMLInputElement | null>(['ui', 'ref'], null);
      const val = useStateXForTextInput(a);
      const callMyAction = useStateXAction(myAction);
      useEffect(() => {
        callMyAction();
      }, [callMyAction]);
      return <input ref={ref} {...val} />;
    }

    const { getAllByDisplayValue } = render(<Comp />, { wrapper });

    expect(getAllByDisplayValue('myAction has set INPUT').length).toBe(1);
  });

  test('should not call useLayoutEffect', () => {
    // to support SSR
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(['test'], '');
        return { value, setValue };
      },
      { wrapper },
    );

    act(() => {
      result.current.setValue('testing');
    });

    expect(result.current.value).toBe('testing');
    expect(useLayoutEffect).not.toHaveBeenCalled();
  });

  test('useStateXSetter', () => {
    const textState = atom({
      path: ['textState'],
      defaultValue: 'abc',
    });

    const { result } = renderHook(
      () => {
        const value = useStateXValue(textState);
        const set = useStateXSetter();
        const get = useStateXValueGetter();
        return { get, set, value };
      },
      { wrapper },
    );

    act(() => {
      result.current.set(textState, 'testing');
    });

    expect(result.current.value).toBe('testing');
    expect(result.current.get(textState)).toBe('testing');
  });

  test('useRemoveStateX', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ a: [0, 1, 2] });
        const [value, remove] = useRemoveStateX(['a', 1], undefined);
        const set = useStateXSetter();
        const get = useStateXValueGetter();
        return { set, get, remove, value };
      },
      { wrapper },
    );

    act(() => {
      result.current.remove();
    });

    expect(result.current.get(['a'])).toStrictEqual([0, 2]);
    expect(result.current.value).toBe(2);
  });

  test('calling remove in selector set', () => {
    const name = selector({
      path: ['name'],
      defaultValue: '',
      get: () => {
        return '';
      },
      set: ({ remove }, value) => {
        remove(['a', 1]);
        return value;
      },
    });
    const { result } = renderHook(
      () => {
        useWithStateX({ a: [0, 1, 2] });
        const [value, setValue] = useStateX(name);
        const a = useStateXValue(['a'], []);
        return { a, value, setValue };
      },
      { wrapper },
    );
    act(() => {
      result.current.setValue('');
    });
    expect(result.current.a).toStrictEqual([0, 1, 2]);
    act(() => {
      result.current.setValue('x');
    });
    expect(result.current.a).toStrictEqual([0, 2]);
  });

  test('atom onChange', () => {
    const mockOnChange = jest.fn();
    const a = atom({
      path: ['a'],
      defaultValue: 'a',
      onChange: ({ value, oldValue }) => {
        if (value === 'b' && oldValue === 'a') {
          mockOnChange(value, oldValue);
        }
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a);
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      result.current.setValue('b');
    });
    expect(mockOnChange).toBeCalledTimes(1);
  });

  test('atom shouldComponentUpdate', () => {
    const mockShouldComponentUpdate = jest.fn();
    const a = atom({
      path: ['a'],
      defaultValue: 'a',
      shouldComponentUpdate: (value, oldValue) => {
        if (value === 'b' && oldValue === 'a') {
          mockShouldComponentUpdate(value, oldValue);
        }
        return true;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          shouldComponentUpdate: (value, oldValue) => {
            if (value === 'b' && oldValue === 'a') {
              mockShouldComponentUpdate(value, oldValue);
            }
            return true;
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      result.current.setValue('b');
    });
    expect(mockShouldComponentUpdate).toBeCalledTimes(2);
  });

  test('useStateXValueGetter w/ invalid state error', () => {
    const { result } = renderHook(() => useStateXValueGetter(), { wrapper });
    // @ts-ignore
    expect(() => result.current('a')).toThrowError(
      'Invalid state "a". Must be path or atom or selector.',
    );
    // 2nd run
    // @ts-ignore
    expect(() => result.current('a')).toThrowError(
      'Invalid state "a". Must be path or atom or selector.',
    );
  });

  test('remove root node', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ a: 'a' });
        const remove = useStateXRemover();
        const get = useStateXValueGetter();
        return { get, remove };
      },
      { wrapper },
    );
    expect(result.current.get([])).toStrictEqual({ a: 'a' });
    act(() => {
      result.current.remove([]);
    });
    expect(result.current.get([])).toStrictEqual({});
  });

  test('remove array root node', () => {
    const { result } = renderHook(
      () => {
        useWithStateX([1, 2, 3]);
        const remove = useStateXRemover();
        const get = useStateXValueGetter();
        return { get, remove };
      },
      { wrapper },
    );
    expect(result.current.get([])).toStrictEqual([1, 2, 3]);
    act(() => {
      result.current.remove([]);
    });
    expect(result.current.get([])).toStrictEqual([]);
  });

  test('set w/ fn', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ a: 'x' });
        const [value, setValue] = useStateX(['a'], 'x');
        const a = useStateXValue(['a'], 'z');
        return { a, value, setValue };
      },
      { wrapper },
    );
    act(() => {
      result.current.setValue(() => 'y');
    });
    expect(result.current.a).toStrictEqual('y');
  });

  test('action error', () => {
    const myAction = action(({ set, getRef }) => {
      throw Error('testing action error');
    });

    const { result } = renderHook(
      () => {
        const callMyAction = useStateXAction(myAction);
        return { callMyAction };
      },
      { wrapper },
    );

    expect(() => result.current.callMyAction()).toThrowError(
      'testing action error',
    );
  });

  test('selector onChange', () => {
    const mockOnChange = jest.fn();
    const a = selector({
      path: ['a'],
      defaultValue: 'a',
      get: ({ get }) => {
        return get(['x']);
      },
      set: ({ set }, value) => {
        set(['x'], value);
        return value;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          onChange: ({ value, oldValue }) => {
            if (value === 'x' && oldValue === 'a') {
              mockOnChange(value, oldValue);
            }
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      result.current.setValue('x');
    });
    expect(mockOnChange).toBeCalledTimes(1);
  });

  test('selector shouldComponentUpdate', () => {
    const mockShouldComponentUpdate = jest.fn();
    const a = selector({
      path: ['a'],
      defaultValue: 'a',
      get: ({ get }) => {
        return get(['x']);
      },
      set: ({ set }, value) => {
        set(['x'], value);
        return value;
      },
      shouldComponentUpdate: (value, oldValue) => {
        if (value === 'x' && oldValue === 'a') {
          mockShouldComponentUpdate(value, oldValue);
        }
        return true;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          shouldComponentUpdate: (value, oldValue) => {
            if (value === 'x' && oldValue === 'a') {
              mockShouldComponentUpdate(value, oldValue);
            }
            return true;
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      result.current.setValue('x');
    });
    expect(mockShouldComponentUpdate).toBeCalledTimes(2);
  });

  test('selector shouldComponentUpdate false', () => {
    const mockShouldComponentUpdate = jest.fn();
    const a = selector({
      path: ['a'],
      defaultValue: 'a',
      get: ({ get }) => {
        return get(['x']);
      },
      set: ({ set }, value) => {
        set(['x'], value);
        return value;
      },
      shouldComponentUpdate: (value, oldValue) => {
        if (value === 'x' && oldValue === 'a') {
          mockShouldComponentUpdate(value, oldValue);
        }
        return false;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          shouldComponentUpdate: () => {
            mockShouldComponentUpdate();
            return true;
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      result.current.setValue('x');
    });
    expect(mockShouldComponentUpdate).toBeCalledTimes(1);
  });

  test('selector shouldComponentUpdate to be called with default value', () => {
    const mockShouldComponentUpdate = jest.fn();
    const a = selector({
      path: ['a'],
      defaultValue: 'a',
      get: ({ get }) => {
        return get(['x']);
      },
      shouldComponentUpdate: (value, oldValue) => {
        if (value === 'a' && oldValue === undefined) {
          mockShouldComponentUpdate();
        }
        return true;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          shouldComponentUpdate: (value, oldValue) => {
            if (value === 'a' && oldValue === undefined) {
              mockShouldComponentUpdate();
            }
            return true;
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    expect(mockShouldComponentUpdate).toBeCalledTimes(2);
    expect(result.current.value).toBe('a');
  });

  test('selector set to throw error', () => {
    const mockShouldComponentUpdate = jest.fn();
    const a = selector({
      path: ['a'],
      defaultValue: 'a',
      get: () => 'a',
      set: () => {
        throw Error('testing error');
      },
      shouldComponentUpdate: (value) => {
        if (value === 'x') {
          mockShouldComponentUpdate();
        }
        return true;
      },
    });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a, {
          shouldComponentUpdate: () => {
            if (value === 'x') {
              mockShouldComponentUpdate();
            }
            return true;
          },
        });
        return { value, setValue };
      },
      {
        wrapper,
      },
    );
    act(() => {
      expect(() => result.current.setValue('x')).toThrowError('testing error');
      expect(mockShouldComponentUpdate).toBeCalledTimes(0);
    });
  });

  test('useWithStateX', () => {
    const { result } = renderHook(
      () => {
        const [state, setState] = useState({ a: 'a' });
        useWithStateX(state);
        const val = useStateXValue([], {});
        return { val, setState };
      },
      { wrapper },
    );
    expect(result.current.val).toStrictEqual({ a: 'a' });
    act(() => {
      result.current.setState({ a: 'x' });
    });
    expect(result.current.val).toStrictEqual({ a: 'x' });
  });

  test('active paths', () => {
    const Child = memo(({ k }: { k: string }) => {
      const val = useStateXValue(['root', k], '');
      const getActivePaths = useActivePaths();
      const paths = getActivePaths(['root'])
        .map((p) => pathToString(p))
        .join(',');

      return (
        <>
          {val}
          <div data-testid="p">{paths}</div>
        </>
      );
    });
    function Parent() {
      useWithStateX({ root: { a: 'a', b: 'b' } });
      const [key, setKey] = useStateX(['root', 'key'], 'a');
      return (
        <>
          <Child k={key} />
          <button data-testid="btn" onClick={() => setKey('b')} />
        </>
      );
    }
    const { getByText, getByTestId } = render(<Parent />, { wrapper });
    const btn = getByTestId('btn') as HTMLButtonElement;
    const div = getByTestId('p') as HTMLDivElement;
    expect(div.innerHTML).toBe('["root"],["root","key"],["root","a"]');
    expect(!!getByText('a')).toBe(true);
    fireEvent.click(btn, {});
    expect(!!getByText('b')).toBe(true);
    expect(div.innerHTML).toBe('["root"],["root","key"],["root","b"]');
  });

  test('useDebug', () => {
    const { result } = renderHook(() => useDebug(), { wrapper });
    expect(() => result.current('test msg')).not.toThrow();
  });

  test('notInAContext', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useStateX(['a'], '');
      return { value, setValue };
    });
    expect(result.error.message).toBe(
      'This component must be used inside a <StateXProvider> component.',
    );
  });

  test('call', () => {
    const spy = jest.fn();
    const action1 = action<undefined>(() => {
      spy();
    });
    const action2 = action(({ call }) => {
      call(action1, undefined);
    });

    function Comp() {
      const callMyAction = useStateXAction(action2);
      useEffect(() => {
        callMyAction();
      }, [callMyAction]);
      return <></>;
    }

    render(<Comp />, { wrapper });

    expect(spy).toBeCalled();
  });

  test('useStateXValue w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const value = useStateXValue('a', '');
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom, selector or path.',
    );
  });

  test('useStateXValue w/ undefined default value to return undefined', () => {
    const { result } = renderHook(
      () => {
        const value = useStateXValue(['a'], undefined);
        return { value };
      },
      { wrapper },
    );
    expect(result.current.value).toBe(undefined);
  });

  test('useStateX w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const [value] = useStateX('a', '');
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom, selector or path.',
    );
  });

  test('useStateX w/ updater to ignore updates', () => {
    const a = atom({ path: ['a'], defaultValue: 'x', updater: () => 'x' });
    const { result } = renderHook(
      () => {
        const [value, setValue] = useStateX(a);
        return { value, setValue };
      },
      { wrapper },
    );
    expect(result.current.value).toBe('x');
    act(() => {
      result.current.setValue('y');
    });
    expect(result.current.value).toBe('x');
  });

  test('useStateX w/ undefined default value to return undefined', () => {
    const { result } = renderHook(
      () => {
        const [value] = useStateX(['a'], undefined);
        return { value };
      },
      { wrapper },
    );
    expect(result.current.value).toBe(undefined);
  });

  test('useRemoveStateX w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const [value] = useRemoveStateX('a', '');
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom or path.',
    );
  });

  test('useRemoveStateX w/ default value', () => {
    const { result } = renderHook(
      () => {
        const [value] = useRemoveStateX(['a'], 'x');
        return { value };
      },
      { wrapper },
    );
    expect(result.current.value).toBe('x');
  });

  test('useRemoveStateX w/ undefined default value to return undefined', () => {
    const { result } = renderHook(
      () => {
        const [value] = useRemoveStateX(['a'], undefined);
        return { value };
      },
      { wrapper },
    );
    expect(result.current.value).toBe(undefined);
  });

  test('getNode w/ missing params should throw error', () => {
    const { result } = renderHook(
      () => getNode(useStateXStore(), ['test', ':param']),
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Missing parameter values for :param in path ["test",":param"]!',
    );
  });

  test('getNode w/ colon in param should not throw', () => {
    const { result } = renderHook(
      () => getNode(useStateXStore(), ['test', 'my:param']),
      { wrapper },
    );
    expect(result.error).toBe(undefined);
  });

  test('useStateXRefSetter', () => {
    const { result } = renderHook(
      () => {
        const set = useStateXRefSetter();
        const refValue = useStateXRefValue(['ref']);
        const ref = useRef('x');
        return { set, ref, refValue };
      },
      { wrapper },
    );
    expect(result.current.refValue).toBe(undefined);
    act(() => {
      result.current.set(['ref'], result.current.ref);
    });
    expect(result.current.refValue?.current).toBe('x');
  });

  test('useStateXActionCaller', () => {
    const fn = jest.fn();
    const myAction = action(fn);
    const { result } = renderHook(() => useStateXActionCaller(), { wrapper });
    result.current(myAction, null);
    expect(fn).toHaveBeenCalled();
  });
});
