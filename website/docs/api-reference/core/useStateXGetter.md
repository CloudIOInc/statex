---
title: useStateXGetter()
sidebar_label: useStateXGetter()
---

Returns a getter function for reading the value of StateX state.

```jsx
(pathOrAtom: PathOrStateXOrSelector<T>, options?: Options) => T;
```

Use this hook when a component intends to just read the state without subscribing to it. If a component used the [useStateX()](useStateX) hook to get the setter, it would also subscribe to updates and re-render when the state changes. Using `useStateXGetter()` allows a component to read the value without re-rendering when the value changes.

### Example

```jsx live
useWithStateX({ name: 'Hi there!' });

const get = useStateXGetter();

const setName = useStateXValueSetter(['name']);
const renderCounter = useRef(0);
renderCounter.current++;
const onChange = (e) => {
  setName(e.target.value);
};

const name = get(['name']);

return (
  <>
    Type something... <input onChange={onChange} />
    <br />
    Render Count: {renderCounter.current}
    <br />
    Name: {name}
  </>
);
```
