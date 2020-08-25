/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import '../../testing/JestInit.ts';
import { fireEvent, render } from '@testing-library/react';
import {
  usePrintTree,
  useStateXForCheckbox,
  useStateXForNumberInput,
  useStateXForSelect,
  useStateXForTextInput,
  useStateXForToggle,
} from '../StateXUIHooks';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useWithStateX, useStateX } from '../StateXHooks';
import {
  booleanAtom,
  firstNameAtom,
  numericAtom,
  wrapper,
} from '../../testing/Common';

describe('StateX', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('useStateXForTextInput', () => {
    function Comp() {
      const val = useStateXForTextInput(['ui', 'value'], '1');
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2' } });
    expect(input.value).toBe('2');
  });

  test('useStateXForTextInput w/ atom', () => {
    function Comp() {
      const val = useStateXForTextInput(firstNameAtom);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Larry' } });
    expect(input.value).toBe('Larry');
  });

  test('useStateXForTextInput ignores non string default value', () => {
    function Comp() {
      // @ts-ignore
      const val = useStateXForTextInput(['a'], undefined);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('useStateXForNumberInput', () => {
    function Comp() {
      const val = useStateXForNumberInput(['ui', 'value'], 1);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2' } });
    expect(input.value).toBe('2');
  });

  test('useStateXForNumberInput w/ atom', () => {
    function Comp() {
      const val = useStateXForNumberInput(numericAtom);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('1955');
    fireEvent.change(input, { target: { value: '1975' } });
    expect(input.value).toBe('1975');
  });

  test('useStateXForNumberInput ignore NaN', () => {
    function Comp() {
      const val = useStateXForNumberInput(numericAtom);
      return (
        <input data-testid="input" value={val.value} onChange={val.onChange} />
      );
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('1955');
    fireEvent.change(input, { target: { value: 'xa' } });
    expect(input.value).toBe('1955');
    fireEvent.change(input, { target: { value: '2' } });
    expect(input.value).toBe('2');
  });

  test('useStateXForCheckbox', () => {
    function Comp() {
      const val = useStateXForCheckbox(['ui', 'value'], false);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { checked: true } });
    expect(input.checked).toBe(true);
  });

  test('useStateXForCheckbox', () => {
    function Comp() {
      // @ts-ignore
      const val = useStateXForCheckbox(['ui', 'value'], false);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  test('useStateXForCheckbox w/ atom', () => {
    function Comp() {
      const val = useStateXForCheckbox(booleanAtom);
      return <input data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { checked: true } });
    expect(input.checked).toBe(true);
  });

  test('useStateXForCheckbox to throw', () => {
    const { result } = renderHook(
      () => {
        let error = '';
        try {
          // @ts-ignore
          useStateXForCheckbox('a');
        } catch (e) {
          error = e.message;
        }
        return { error };
      },
      { wrapper },
    );
    expect(result.current.error).toBe(
      'Invalid atom type value! Must be either an atom or path.',
    );
  });

  test('useStateXForToggle w/ atom', () => {
    function Comp() {
      const [toggle, onToggle] = useStateXForToggle(booleanAtom);
      return (
        <input
          data-testid="btn"
          onChange={onToggle}
          onClick={onToggle}
          value={String(toggle)}
        />
      );
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const btn = getByTestId('btn') as HTMLInputElement;
    expect(btn.value).toBe('true');
    fireEvent.click(btn, {});
    expect(btn.value).toBe('false');
    fireEvent.click(btn, {});
    expect(btn.value).toBe('true');
  });

  test('usePrintTree', () => {
    const { result } = renderHook(
      () => {
        useWithStateX({ a: { b: 'x' } });
        useStateX(['a', 'b'], '');
        const printTree = usePrintTree();
        return { printTree };
      },
      { wrapper },
    );
    expect(result.current.printTree(['a'])).toBe(
      `["a"] 0\n--["a","b"] 1\n    ["a","b"]`,
    );
  });

  test('useStateXForSelect', () => {
    function Comp() {
      const val = useStateXForSelect(firstNameAtom);
      return <select data-testid="input" {...val} />;
    }
    const { getByTestId } = render(<Comp />, { wrapper });
    const input = getByTestId('input') as HTMLSelectElement;
    fireEvent.change(input, { target: { value: 'x' } });
    // TODO: must be x instead of ''
    expect(input.value).toBe('');
  });

  test('useStateXForNumberInput w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const { value } = useStateXForNumberInput('a', 1);
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom or path.',
    );
  });

  test('useStateXForNumberInput w/ undefined default value to return undefined', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const { value } = useStateXForNumberInput(['a'], undefined);
        return { value };
      },
      { wrapper },
    );
    if (result.error) {
      console.error(result.error);
    }
    expect(result.current.value).toBe(undefined);
  });

  test('useStateXForTextInput w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const [value] = useStateXForTextInput('a', 1);
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom or path.',
    );
  });

  test('useStateXForToggle w/ invalid state type', () => {
    const { result } = renderHook(
      () => {
        // @ts-ignore
        const [value] = useStateXForToggle('a', 1);
        return { value };
      },
      { wrapper },
    );
    expect(result.error.message).toBe(
      'Invalid state type value! Must be either an atom or path.',
    );
  });

  test('useStateXForToggle w/ undefined default value to return false', () => {
    const { result } = renderHook(
      () => {
        const [value1] = useStateXForToggle(['a1'], true);
        // @ts-ignore
        const [value] = useStateXForToggle(['a'], undefined);
        return { value, value1 };
      },
      { wrapper },
    );
    if (result.error) {
      console.error(result.error);
    }
    expect(result.current.value).toBe(false);
    expect(result.current.value1).toBe(true);
  });
});
