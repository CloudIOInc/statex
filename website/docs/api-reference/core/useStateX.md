---
title: useStateX()
sidebar_label: useStateX()
---

Returns a tuple similar to React.useState(). This hook will implicitly subscribe the component to the given atom. useStateX can be used with either path, atom or writable selector.

## useStateX(path)

```jsx title="useStateX(path, options)"
function useStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];
```

## useStateX(atom)

```jsx title="useStateX(atom, options)"
function useStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];
```

## useStateX(selector)

```jsx title="useStateX(selector, options)"
function useStateX<T>(
  atom: Selector<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, Dispatch<T>];
```

## StateXOptions

```
interface StateXOptions<T> {
  params?: Record<string, Key>;
  shouldComponentUpdate?: (
    value: Readonly<T>,
    oldValue?: Readonly<T>,
  ) => boolean;
  onChange?: (props: {
    value: Readonly<T>;
    oldValue?: Readonly<T>;
    get: StateXGetter;
    set: StateXSetter;
  }) => void;
}
```

This is the recommended hook to use when a component intends to read and write state.

### shouldComponentUpdate Demo

```jsx live
const countStateX = atom({
  path: ['count'],
  defaultValue: 1,
});

function Odd() {
  const [count, setCount] = useStateX(countStateX, {
    shouldComponentUpdate: (value, oldValue) => value % 2 !== 0,
  });
  const increment = () => setCount((count) => count + 1);

  return (
    <div>
      Rendered when the count is an Odd number: {count}
      <br />
      <button onClick={increment}>Inrement</button>
    </div>
  );
}

function Even() {
  const [count, setCount] = useStateX(countStateX, {
    shouldComponentUpdate: (value, oldValue) => value % 2 === 0,
  });
  const increment = () => setCount((count) => count + 1);

  return (
    <div>
      Rendered when the count is an Even number: {count}
      <br />
      <button onClick={increment}>Inrement</button>
    </div>
  );
}

return (
  <>
    <Odd />
    <Even />
  </>
);
```
