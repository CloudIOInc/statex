---
title: useStateXCallback()
---

This hook is similar to [_`useCallback()`_](https://reactjs.org/docs/hooks-reference.html#usecallback), but will also provide an API for your callbacks to work with StateX state. This hook can be used to construct a callback that has access to the StateX state and the ability to update the StateX state.

Some motivations for using this hook may include:

- Asynchronously read StateX state without subscribing a React component to re-render if the atom or selector is updated.
- Defering expensive lookups to an async action that you don't want to do at render-time.
- Dynamically updating an atom or selector where we may not know at render-time which atom or selector we will want to update so we can't use `useStateXValueSetter()`.

```jsx
function useStateXCallback<T>(
  fn: (props: { set: StateXSetter, get: StateXGetter }) => T,
  deps: DependencyList = [],
): () => T
```

- **`fn`** - The user callback function with access to set & set to read and/or write to global state
- **`deps`** - An optional set of dependencies for memoizing the callback. Like `useCallback()`, the produced callback will not be memoized by default and will produce a new function each time. You can pass an empty array to always return the same function instance. If you pass values in the `deps` array a new function will be used if the reference equality of any dep changes. Those values can then be used from within the body of your callback without getting stale. (See [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback))

### Demo

```jsx live
const itemsInCart = atom({
  path: ['itemsInCart'],
  defaultValue: 11,
});

function CartInfoDebug() {
  const logCartItems = useStateXCallback(({ get }) => {
    const numItemsInCart = get(itemsInCart);

    console.log('Items in cart: ', numItemsInCart);
  });

  return (
    <div>
      <button onClick={logCartItems}>Log Cart Items</button>
    </div>
  );
}

return <CartInfoDebug />;
```
