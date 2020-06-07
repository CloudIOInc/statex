---
title: useStateXValue()
sidebar_label: useStateXValue()
---

Returns the value of the given Path, StateX or Selector state.

This hook will implicitly subscribe the component to the given state.

- `state`: a [`path`](path) or [`atom`](atom) or [`selector`](selector)

This is the recommended hook to use when a component intends to read state without writing to it. atoms are writeable state while selectors may be either read-only or writeable. See [`selector()`](selector) for more info.

> The parameter options used in [`useStateX()`](useStateX) are applicable for `useStateXValue()` as well.

## Default Value Demo

If the state at a specific node is not set, it will be updated with the default value as shown below.

```jsx live open
useWithStateX({});

const value = useStateXValue(['count'], 5);

return value;
```

## Demo

If the state exists, then the default value will be ignored. The default value also helps in inferring the state type.

```jsx live open
useWithStateX({ count: 10 });

const value = useStateXValue(['count'], 5);

return value;
```
