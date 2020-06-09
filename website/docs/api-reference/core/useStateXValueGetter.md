---
title: useStateXValueGetter()
sidebar_label: useStateXValueGetter()
---

Returns a getter function for reading the value of StateX state.

```jsx
(pathOrAtom: PathOrStateXOrSelector<T>, options?: Options) => Readonly<T>
```

Use this hook when a component intends to just read the state without subscribing to it. If a component used the [useStateX()](useStateX) hook to get the setter, it would also subscribe to updates and re-render when the state changes. Using `useStateXValueGetter()` allows a component to read the value without re-rendering when the value changes.

### Example

```jsx live
useWithStateX({ name: 'Hi there!' });

const get = useStateXValueGetter();

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
