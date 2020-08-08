import React, { ReactNode, useRef, Suspense } from 'react';
import {
  StateXProvider,
  atom,
  StateXActionCaller,
  StateXGetter,
  StateXRefGetter,
  StateXRefSetter,
  StateXRemover,
  StateXSetter,
  StateXActivePathsGetter,
  StateXReseter,
} from '..';
import { selector } from '../core/StateXHooks';
import { screen, render, act, waitFor } from '@testing-library/react';
import { useStateXStore } from '../core/StateXContext';
import {
  makeSet,
  makeGet,
  makeGetRef,
  makeCall,
  makeRemove,
  makePaths,
  makeSetRef,
  makeReset,
} from '../core/StateX';
import ErrorBoundary from './ErrorBoundary';

const initialState = () => ({
  root: {
    person: { firstName: 'Steve', lastName: 'Jobs' },
    numArray: [0, 1, 2],
    objArray: [{ a: 'a' }, { b: 'b' }],
    num: 1955,
    bool: true,
    key: '',
  },
});

export const keyAtom = atom({
  path: ['root', 'key'],
  defaultValue: '',
});

export const firstNameAtom = atom({
  path: ['root', 'person', 'firstName'],
  defaultValue: 'DEFAULT_firstName',
});

export const lastNameAtom = atom({
  path: ['root', 'person', 'lastName'],
  defaultValue: 'DEFAULT_lastName',
});

export const fullNameSelector = selector({
  path: ['selector', 'fullName'],
  defaultValue: 'DEFAULT_fullName',
  get: ({ get }) => `${get(firstNameAtom)} ${get(lastNameAtom)}`,
});

export const numericAtom = atom({ path: ['root', 'num'], defaultValue: 0 });

export const booleanAtom = atom({
  path: ['root', 'bool'],
  defaultValue: false,
});

const wrapper: React.FunctionComponent<{}> = ({
  children,
}: {
  children?: ReactNode;
}) => {
  return (
    <StateXProvider initialState={initialState()} handleError={() => {}}>
      {children}
    </StateXProvider>
  );
};

interface Props {
  call: StateXActionCaller;
  data: Record<string, any>;
  get: StateXGetter;
  getActivePaths: StateXActivePathsGetter;
  getRef: StateXRefGetter;
  remove: StateXRemover;
  reset: StateXReseter;
  set: StateXSetter;
  setRef: StateXRefSetter;
}

const renderComp = (
  Comp: React.FC<Props>,
  options: Record<string, any> = {},
) => {
  // @ts-ignore
  let ref: React.MutableRefObject<Props> = { current: {} };
  function Wrapper() {
    const store = useStateXStore();
    ref = useRef({
      set: makeSet(store),
      get: makeGet(store),
      getRef: makeGetRef(store),
      setRef: makeSetRef(store),
      call: makeCall(store),
      remove: makeRemove(store),
      reset: makeReset(store),
      getActivePaths: makePaths(store),
      data: {},
    });
    return (
      <ErrorBoundary>
        <Suspense fallback={<div data-testid="id">Suspended</div>}>
          <div data-testid="id">
            <Comp {...ref.current} {...options} />
          </div>
        </Suspense>
      </ErrorBoundary>
    );
  }
  const { getByTestId } = render(<Wrapper />, { wrapper });
  const textContent = () => {
    const ele = getByTestId('id');
    return ele.textContent;
  };
  const waitForElement = async () =>
    await waitFor(() => {
      const el = screen.getByTestId('id');
      if (el && el.textContent !== 'Suspended') {
        return el;
      }
      console.log('still waiting...');
      throw Error('Still waiting...');
    });

  const waitForValueChange = async () => {
    await waitForElement();
    return await waitFor(() => {
      const value = screen.getByTestId('id').textContent;
      return value;
    });
  };
  const waitForErrorElement = async () =>
    await waitFor(() => screen.getByTestId('eid'));
  return {
    waitForValueChange,
    waitForElement,
    waitForErrorElement,
    screen,
    textContent,
    act,
    ...ref.current,
  };
};

export { wrapper, initialState, renderComp as render };
