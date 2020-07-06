import React, { ReactNode, useRef, Suspense } from "react";
import {
  StateXProvider,
  atom,
  StateXActionCaller,
  StateXGetter,
  StateXRefGetter,
  StateXRemover,
  StateXSetter,
  StateXActivePathsGetter,
} from "..";
import { selector } from "../core/StateXHooks";
import { screen, render, act, waitFor } from "@testing-library/react";
import { useStateXStore } from "../core/StateXContext";
import {
  makeSet,
  makeGet,
  makeGetRef,
  makeCall,
  makeRemove,
  makePaths,
} from "../core/StateX";
import ErrorBoundary from "../../examples/ErrorBoundary";

const initialState = () => ({
  root: {
    person: { firstName: "Steve", lastName: "Jobs" },
    numArray: [0, 1, 2],
    objArray: [{ a: "a" }, { b: "b" }],
    num: 1955,
    bool: true,
    key: "",
  },
});

export const keyAtom = atom({
  path: ["root", "key"],
  defaultValue: "",
});

export const firstNameAtom = atom({
  path: ["root", "person", "firstName"],
  defaultValue: "DEFAULT_firstName",
});

export const lastNameAtom = atom({
  path: ["root", "person", "lastName"],
  defaultValue: "DEFAULT_lastName",
});

export const numericAtom = atom({ path: ["root", "num"], defaultValue: 0 });

export const booleanAtom = atom({
  path: ["root", "bool"],
  defaultValue: false,
});

export const fullNameSelector = selector({
  path: ["selector", "fullName"],
  defaultValue: "DEFAULT_fullName",
  get: ({ get }) => `${get(firstNameAtom)} ${get(lastNameAtom)}`,
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
  get: StateXGetter;
  getRef: StateXRefGetter;
  remove: StateXRemover;
  set: StateXSetter;
  getActivePaths: StateXActivePathsGetter;
  data: Record<string, any>;
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
      call: makeCall(store),
      remove: makeRemove(store),
      getActivePaths: makePaths(store),
      data: {},
    });
    return (
      <ErrorBoundary>
        <Suspense fallback={<>Suspended</>}>
          <div data-testid="id">
            <Comp {...ref.current} {...options} />
          </div>
        </Suspense>
      </ErrorBoundary>
    );
  }
  const { getByTestId } = render(<Wrapper />, { wrapper });
  const textContent = () => {
    const ele = getByTestId("id");
    return ele.textContent;
  };
  const waitForElement = async () =>
    await waitFor(() => screen.getByTestId("id"));
  const waitForErrorElement = async () =>
    await waitFor(() => screen.getByTestId("eid"));
  return {
    waitForElement,
    waitForErrorElement,
    screen,
    textContent,
    act,
    ...ref.current,
  };
};

export { wrapper, initialState, renderComp as render };
