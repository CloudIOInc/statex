---
title: atom(options)
sidebar_label: atom()
---

Returns writeable StateX state.

---

- `options`

  - `path`: A unique json path for this atom. This path should be unique with respect to other atoms and selectors in the entire application. Path can have placeholders (bind variables) e.g. ['employee', ':empId']
  - `defaultValue`: The initial value of the atom.
  - ```tsx title="shouldComponentUpdate?:"
    (value: Readonly<T>, oldValue?: Readonly<T>) => boolean;
    ```

    Similar to the react class component lifecyle method, if set, will be invoked before triggering a re-render of the component due to a change in the state. Return false to prevent re-rendering of the component subscribed to this atom.

    > Returning false will also prevent the below functions updater & onChange from being invoked.

  - ```tsx title="updater?:"
    (props: {
      value: T;
      oldValue: Readonly<T>;
      get: StateXGetter;
      set: StateXSetter;
    }) => T;
    ```

    A function if set, will be invoked prior to updating this atom state value. You can transform the given value and return the transformed value to be set as this atom's state value instead. You can also read or write other atom values using the passed get & set properties.

  - ```tsx title="onChange?:"
    (props: {
          value: Readonly<T>;
          oldValue: Readonly<T>;
          get: StateXGetter;
          set: StateXSetter;
      }) => void;
    ```

    A callback function if set, will be invoked after this atom's state value has been changed. You can use the set property to update any dependent atom based on the change being made.

The following hooks can be used to interact with atoms:

- [`useStateX()`](useStateX): use this hook when you intend on both reading and writing to the atom. This hook subscribes the component to the atom.
- [`useStateXValue()`](useStateXValue): use this hook when you intend on only reading the atom. This hook subscribes the component to the atom.
- [`useStateXValueSetter()`](useStateXValueSetter): use this hook when you intend on only writing to the atom.
- [`useRemoveStateX()`](useRemoveStateX): use this hook to remove an atom from the global state.

For rare cases where you need to read an atom value without subscribing to the component, see [`useStateXValueGetterWithPath()`](useStateXValueGetterWithPath).

### Example

```jsx live open
const counter = atom({
  path: ['myCounter'],
  defaultValue: 0,
});

function Counter() {
  const [count, setCount] = useStateX(counter);
  const incrementByOne = () => setCount(count + 1);

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={incrementByOne}>Increment</button>
    </div>
  );
}

return <Counter />;
```
