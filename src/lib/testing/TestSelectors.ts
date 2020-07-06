import { selector } from "../core/StateXHooks";

export const testSelector = (value: string | Promise<string> = "") =>
  selector(
    {
      path: ["testSelector"],
      defaultValue: "TEST_DEFAULT_VALUE",
      get: () => {
        if (value === "throw error") {
          throw Error("testing error!");
        }
        if (value instanceof Promise) {
          throw value;
        }
        return value;
      },
    },
  );

export const keySelector = (value: string) =>
  selector(
    {
      path: ["testSelector2"],
      defaultValue: "",
      get: ({ get }) => {
        return get([value]);
      },
    },
  );

export const asyncTestSelector = (value: string | Error) =>
  selector(
    {
      path: ["asyncTestSelector"],
      defaultValue: "MY_DEFAULT_VALUE",
      get: async () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (value instanceof Error) {
              reject(value);
              return;
            }
            resolve(value);
          }, 0);
        }),
    },
  );

export const dynamicSelector = (value: any) =>
  selector(
    {
      path: ["a", ":param"],
      defaultValue: "",
      get: () => {
        if (value instanceof Promise || value instanceof Error) {
          throw value;
        }
        return value;
      },
    },
  );

export const conditionalSelector = selector({
  path: ["a"],
  defaultValue: "",
  get: ({ get }) => {
    const dep = get(["dep"]);
    switch (dep) {
      case "x":
        return get(["x"]);
      case "y":
        return get(["y"]);
    }
  },
});
