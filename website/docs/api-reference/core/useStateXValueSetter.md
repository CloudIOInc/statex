---
title: useStateXValueSetter()
sidebar_label: useStateXValueSetter()
---

Returns a setter function for updating the value of writeable StateX state.

```jsx
function useStateXValueSetter<T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  options?: Options,
): Dispatch<T>
```

This is the recommended hook to use when a component intends to write to state without reading it. If a component used the [useStateX()](useStateX) hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using `useStateXValueSetter()` allows a component to set the value without re-rendering when the value changes.

### useStateXSetter()

You can also use useStateXSetter() hook, which returns a setter function. Using the returned setter function, you can access one or more state values dynamically.

```jsx title="useStateXSetter()"
function useStateXSetter():
    <V>(pathOrAtom: PathOrStateX<V>,
      value: SetStateAction<V>,
      options?: Options | undefined
    ) => Readonly<V>
```

```javascript
  const set = useStateXSetter();
  ...
  set(['mypath'], 'Some value');
  ...
  set(atom, 'value');
```

### Example

```jsx live
useWithStateX({ name: 'Hi there!' });

const setName = useStateXValueSetter(['name']);
const renderCounter = useRef(0);
renderCounter.current++;
const onChange = (e) => {
  setName(e.target.value);
};

return (
  <>
    Type something... <input onChange={onChange} />
    <br />
    Render Count: {renderCounter.current}
  </>
);
```
