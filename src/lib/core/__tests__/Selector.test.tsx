/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "../../testing/JestInit.ts";
import {
  useStateXGetter,
  StateXProvider,
  useStateXValue,
  useStateXValueResolveable,
  useStateXSetter,
  useWithStateX,
  useStateXResolveable,
  useStateX,
  selector,
} from "../StateXHooks";
import Selector from "../Selector";
import { renderHook, act } from "@testing-library/react-hooks";
import React, { ReactNode, useEffect } from "react";
import { usePrintTree } from "../StateXUIHooks";
import { Resolvable } from "../StateXTypes";
import { StateX } from "../StateXStore";
import {
  testSelector,
  dynamicSelector,
  asyncTestSelector,
  conditionalSelector,
  keySelector,
} from "../../testing/TestSelectors";
import {
  render,
  firstNameAtom,
  lastNameAtom,
  initialState,
  keyAtom,
  fullNameSelector,
} from "../../testing/Common";

let wrapper: React.FunctionComponent<{}>;

export const getter = () => {
  const { result } = renderHook(() => useStateXGetter(), { wrapper });
  return result.current;
};

export const setter = () => {
  const { result } = renderHook(() => useStateXSetter(), { wrapper });
  return result.current;
};

describe("Selector", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    wrapper = ({ children }: { children?: ReactNode }) => {
      return <StateXProvider handleError={() => {}}>{children}</StateXProvider>;
    };
  });

  test("instanceof Selector", () => {
    expect(testSelector() instanceof Selector).toBe(true);
  });

  test("should render initial state values in 2 renders", () => {
    let counter = 0;
    const { textContent, getActivePaths } = render(() => {
      const fullName = useStateXValue(fullNameSelector);
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    expect(counter).toBe(2); // selectors are evaluated in useEffect and hence 2
    expect(getActivePaths([])).toStrictEqual([
      [],
      ["selector"],
      ["selector", "fullName"],
      // selector intern subscribes data from firstName & lastName atoms
      ["root"],
      ["root", "person"],
      ["root", "person", "firstName"],
      ["root", "person", "lastName"],
    ]);
  });

  test("removing object key should reset to default value", () => {
    let counter = 0;
    const { act, textContent, remove, get } = render(() => {
      const fullName = useStateXValue(fullNameSelector);
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    act(() => {
      remove(firstNameAtom);
    });
    expect(textContent()).toBe("DEFAULT_firstName Jobs");
    expect(counter).toBe(3);
    const state = initialState();
    state.root.person.firstName = "DEFAULT_firstName";
    expect(get([])).toStrictEqual(state);
  });

  test("single rerender on multiple state changes", () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const fullName = useStateXValue(fullNameSelector);
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    counter = 0;
    act(() => {
      set(firstNameAtom, "a");
      set(lastNameAtom, "b");
      set(firstNameAtom, "x");
      set(lastNameAtom, "y");
    });
    expect(textContent()).toBe("x y");
    expect(counter).toBe(1);
  });

  test("should not rerender on state change with same values", () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const fullName = useStateXValue(fullNameSelector);
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    counter = 0;
    act(() => {
      set(firstNameAtom, "Steve");
      set(lastNameAtom, "Jobs");
    });
    expect(textContent()).toBe("Steve Jobs");
    expect(counter).toBe(0);
  });

  test("shouldComponentUpdate => false should not re-render", () => {
    let counter = 0;
    const { act, textContent, set, get } = render(() => {
      const fullName = useStateXValue(fullNameSelector, {
        shouldComponentUpdate: () => false,
      });
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    counter = 0;
    act(() => {
      set(firstNameAtom, "x");
      set(lastNameAtom, "y");
    });
    expect(textContent()).toBe("Steve Jobs");
    expect(counter).toBe(0);
    expect(get(fullNameSelector)).toBe("x y");
  });

  test("subscribe to async selector", async () => {
    const leaf = selector({
      path: ["leaf"],
      defaultValue: "leaf dv",
      get: async ({ get }) => {
        const firstName = get(firstNameAtom);
        return new Promise((resolve) => {
          resolve(firstName);
        });
      },
    });
    const root = selector({
      path: ["root"],
      defaultValue: "root dv",
      get: ({ get }) => get(leaf),
    });
    let counter = 0;
    const { waitForElement, act, set } = render(() => {
      const value = useStateXValue(root);
      counter++;
      return <>{value}</>;
    });
    let ele;
    await act(async () => {
      ele = await waitForElement();
      expect(ele.textContent).toBe("Steve");
    });
    counter = 0;
    act(() => {
      set(firstNameAtom, "x");
    });
    await act(async () => {
      ele = await waitForElement();
      expect(ele.textContent).toBe("x");
    });
    expect(counter).toBe(3);
  });

  test("cancel duplicate resolvers", async () => {
    const s = selector({
      path: ["s"],
      defaultValue: "",
      get: async ({ get }) => {
        const firstName = get(firstNameAtom);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(firstName);
          }, 1);
        });
      },
    });
    let counter = 0;
    const { waitForElement, act, set } = render(() => {
      const value = useStateXValue(s);
      counter++;
      return <>{value}</>;
    });
    let ele;
    await act(async () => {
      ele = await waitForElement();
    });
    await act(async () => {
      ele = await waitForElement();
      expect(ele.textContent).toBe("Steve");
    });
    counter = 0;
    act(() => {
      set(firstNameAtom, "x");
    });
    act(() => {
      set(firstNameAtom, "y");
    });
    await act(async () => {
      ele = await waitForElement();
    });
    await act(async () => {
      ele = await waitForElement();
      expect(ele.textContent).toBe("y");
    });
    expect(counter).toBe(1);
  });

  test("cancel duplicate errors", async () => {
    const spy = jest.spyOn(global.console, "error").mockImplementation();
    const s = selector({
      path: ["s"],
      defaultValue: "dv",
      get: async ({ get }) => {
        const firstName = get(firstNameAtom);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(Error(`E: ${firstName}`));
          }, 1);
        });
      },
    });
    let counter = 0;
    const { waitForErrorElement, act, set } = render(() => {
      const value = useStateXValue(s);
      counter++;
      return <>{value}</>;
    });
    let ele;
    await act(async () => {
      ele = await waitForErrorElement();
    });
    await act(async () => {
      ele = await waitForErrorElement();
      expect(ele.textContent).toBe("E: Steve");
    });
    counter = 0;
    act(() => {
      set(firstNameAtom, "x");
    });
    act(() => {
      set(firstNameAtom, "y");
    });
    await act(async () => {
      ele = await waitForErrorElement();
    });
    await act(async () => {
      ele = await waitForErrorElement();
      expect(ele.textContent).toBe("E: Steve");
    });
    expect(counter).toBe(0);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("clearing the value in store should rerender with default value", () => {
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const fullName = useStateXValue(fullNameSelector);
      counter++;
      return <>{fullName}</>;
    });
    expect(textContent()).toBe("Steve Jobs");
    counter = 0;
    act(() => {
      // @ts-ignore
      set(firstNameAtom, undefined);
    });
    expect(textContent()).toBe("DEFAULT_firstName Jobs");
    expect(counter).toBe(1);
  });

  test("returns undefined if default value is undefined", () => {
    const s = selector({
      path: ["x", "fullName"],
      defaultValue: undefined,
      get: ({ get }) => get(["x"]),
    });
    let counter = 0;
    const { textContent } = render(() => {
      const value = useStateXValue(s);
      counter++;
      return <>{value === undefined ? "undefined" : value}</>;
    });
    expect(textContent()).toBe("undefined");
    expect(counter).toBe(2);
  });

  test(`dynamically changing atom's path with no default value causes extra re-render`, () => {
    const ref = { defaultValue: firstNameAtom.defaultValue };
    let counter = 0;
    const { act, textContent, set } = render(() => {
      const key = useStateXValue(keyAtom) || "firstName";
      const path = ["root", "person", key];
      const firstName = useStateXValue(path, ref.defaultValue);
      counter++;
      return <>{`${firstName}`}</>;
    });
    act(() => {
      // @ts-ignore
      ref.defaultValue = undefined;
      set(keyAtom, "unknownKey");
    });
    expect(textContent()).toBe("null");
    expect(counter).toBe(3);
  });

  test("dynamicSelector", () => {
    const s = dynamicSelector("x");
    expect(s.dynamic).toBe(true);
    expect(s.params.get("param")).toBe(1);
    const get = getter();
    act(() => {
      expect(() => get(s)).toThrowError(
        'Missing parameter values for :param in path ["a",":param"]. No params passed!',
      );
    });

    act(() => {
      expect(get(s, { params: { param: "xx" } })).toBe("x");
    });
  });

  test("dynamicSelector w/ error", () => {
    const s = dynamicSelector(Error("testing error!"));
    const get = getter();
    act(() => {
      expect(() => get(s, { params: { param: "xx" } })).toThrowError(
        "testing error!",
      );
    });
  });

  test("dynamicSelector w/ path change", () => {
    const s = selector({
      path: ["a", ":param"],
      defaultValue: "",
      get: ({ get, params = {} }) => {
        return get([params["param"]]);
      },
    });
    const s2 = selector({
      path: ["a", "b"],
      defaultValue: "",
      get: ({ get }) => {
        return get(["bb"]);
      },
    });
    const { result } = renderHook(
      () => {
        useWithStateX({ path: "a", a: "a", b: "b", bb: "bb" });
        const [path, setPath] = useStateX(["path"], "a");
        const value = useStateXValue(s, { params: { param: path } });
        const value2 = useStateXValue(s2);
        return { value, setPath, value2 };
      },
      { wrapper },
    );
    expect(result.current.value).toBe("a");
    expect(result.current.value2).toBe("bb");
    act(() => {
      result.current.setPath("b");
    });
    expect(result.current.value).toBe("bb");
    expect(result.current.value2).toBe("bb");
  });

  test("textSelector to be resolved", async () => {
    const s = testSelector("x");
    const { result } = renderHook(() => useStateXValueResolveable(s), {
      wrapper,
    });
    act(() => {
      expect(result.current.status).toBe("resolved");
      expect(result.current.value).toBe("x");
      expect(result.current.promise).toBe(undefined);
      expect(result.current.error).toBe(undefined);
    });
    const get = getter();
    act(() => {
      expect(get(s)).toBe("x");
      expect(get(s)).toBe("x");
    });
  });

  test("async selector should throw promise", async () => {
    const get = getter();
    const s = asyncTestSelector("x");
    act(() => {
      expect(() => get(s)).toThrow(Promise);
      expect(() => get(s)).toThrow(Promise); // shoud throw the same promise
    });
  });

  test("asyncTextSelector to be pending -> resolved", async () => {
    const s = asyncTestSelector("x");
    const { result, waitForNextUpdate } = renderHook(
      () => useStateXValueResolveable(s),
      { wrapper },
    );
    expect(result.current.status).toBe("pending");
    expect(result.current.value).toBe(undefined);
    await act(async () => {
      await waitForNextUpdate();
      expect(result.current.status).toBe("resolved");
      expect(result.current.value).toBe("x");
    });
  });

  test("asyncTextSelector to be pending -> error", async () => {
    const s = asyncTestSelector(Error("testing async arror"));
    const { result, waitForNextUpdate } = renderHook(
      () => useStateXValueResolveable(s),
      { wrapper },
    );
    await act(async () => {
      expect(result.current.status).toBe("pending");
      await waitForNextUpdate();
      expect(result.current.status).toBe("error");
      expect(result.current.value).toBe(undefined);
      expect(result.current.promise instanceof Promise).toBe(true);
      expect(result.current.error?.message).toBe("testing async arror");
    });
  });

  test("useStateXResolveable", async () => {
    const s = asyncTestSelector("x");
    const { result, waitForNextUpdate } = renderHook(
      () => {
        const [value, setValue] = useStateXResolveable(s);
        return { value, setValue };
      },
      { wrapper },
    );
    await act(async () => {
      expect(result.current.value.status).toBe("pending");
      await waitForNextUpdate();
      expect(result.current.value.status).toBe("resolved");
    });
  });

  test("errorSelector to throw error", () => {
    const get = getter();
    act(() => {
      expect(() => get(testSelector("throw error"))).toThrowError(
        "testing error",
      );
    });
  });

  test("selector to throw Promise", () => {
    const get = getter();
    act(() => {
      expect(() => get(testSelector(new Promise(() => {})))).toThrow(Promise);
    });
  });

  test("selector without set to throw not writable error on set", () => {
    const set = setter();
    act(() => {
      expect(() => set(testSelector(), "y")).toThrowError(
        "Not a writable selector!",
      );
    });
  });

  test("conditionalSelector", async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => {
        useWithStateX({ dep: "x", x: "x", y: "y" });
        const value = useStateXValue(conditionalSelector);
        const set = useStateXSetter();
        const printTree = usePrintTree();
        return { set, value, printTree };
      },
      { wrapper },
    );
    await act(async () => {
      expect(result.current.value).toBe("x");
      result.current.set(["dep"], "y");
      await waitForNextUpdate();
      expect(result.current.value).toBe("y");
    });
  });

  test("conditionalSelector", async () => {
    const s1 = keySelector("x");
    const s2 = keySelector("y");
    const { result } = renderHook(
      () => {
        useWithStateX({ x: "x", y: "y" });
        const value1 = useStateXValue(s1);
        const value2 = useStateXValue(s2);
        return { value1, value2 };
      },
      { wrapper },
    );
    await act(async () => {
      expect(result.current.value1).toBe("y");
      expect(result.current.value2).toBe("y");
    });
  });

  test("resolve() value", () => {
    const x = new StateX();
    const n = x.trie().getNode(["a"], true);
    const resolvable = Resolvable.withValue(n, "x");
    expect(resolvable.resolve()).toBe("x");
  });

  test("resolveIfSelf() w/ self=false to throw promise", () => {
    const x = new StateX();
    const n = x.trie().getNode(["a"], true);
    const resolvable = Resolvable.withValue(n, "x");
    resolvable.promise = new Promise(() => {});
    resolvable.self = false;
    expect(() => resolvable.resolveIfSelf(n)).toThrow(Promise);

    resolvable.status = "pending";
    expect(() => resolvable.resolveIfSelf(n)).toThrow(Promise);
  });
});
