/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../test/JestHelper';
import {
  useStateXValue,
  useStateX,
  atom,
  useWithStateX,
  useStateXGetter,
  useStateXCallback,
  action,
  useStateXAction,
} from '../StateXHooks';
import { render, act as ract } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  useStateXRef,
  useStateXRefValue,
  useStateXForTextInput,
} from '../StateXUIHooks';
import React, {
  ReactNode,
  useEffect,
  useRef,
  memo,
  useLayoutEffect,
} from 'react';
import { StateXProvider } from '../StateXContext';

let wrapper: React.FunctionComponent<{}>;
describe('StateX', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return <StateXProvider>{children}</StateXProvider>;
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

  test('selector', () => {
    const textState = atom({
      path: ['textState'], // unique ID (with respect to other atoms/selectors)
      defaultValue: 'abc', // default value (aka initial value)
    });

    const { result } = renderHook(
      () => {
        const value = useStateXValue(textState);
        return { value };
      },
      { wrapper },
    );

    expect(result.current.value).toBe('abc');
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
});
