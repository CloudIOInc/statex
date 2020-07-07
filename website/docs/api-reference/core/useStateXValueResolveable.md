---
title: Resolveable
sidebar_label: useStateXValueResolveable()
---

## useStateXValueResolveable

This hook is intended to be used for reading the value of asynchronous [selectors](selector). This hook will implicitly subscribe the component to the given state.

Unlike [useStateXValue()](useStateXValue), this hook will not throw a Promise when reading from a pending asynchronous selector (for the purpose of working alongside Suspense). Instead, this hook returns a Resolveable, which is an object with the following interface:

- `status`: indicates the status of the selector. Possible values are `resolved`, `error`, `pending`.
- `value`: The value represented by this `Resolveable`. If the state is `resolved`, it is the actual value.
- `isDefault`: This will be set to true during the first render. i.e. the resolveable is resolved with the selector's default value during the first render
- `error`: if there is an error, this will contain the error object that was thrown.
- `promise`: The `Promise` that will resolve when the selector has resolved. If the selector is synchronous or has already resolved, it returns a `Promise` that resolves immediately.

```jsx title="useStateXValueResolveable(selector, options)"
function useStateXValueResolveable<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): Resolvable<<T>>
```

For writable selectors

```jsx title="useStateXResolveable(selector, options)"
function useStateXResolveable<T>(
  selector: Selector<T>,
  options?: StateXOptions<T>,
): [Resolvable<<T>>, Dispatch<T>]
```

## SelectorOptions

```
interface SelectorOptions<T> {
  params?: Record<string, Key>;
  shouldComponentUpdate?: (
    value: T,
    oldValue?: T,
  ) => boolean;
}
```

Use this hook when reading a value from an async selector

## Demo

```jsx live
function fetchUser(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}!`);
    }, 3000);
  });
}

const userSelector = selector({
  path: ['promise', ':name'],
  defaultValue: '',
  get: ({ params }) => {
    return fetchUser(params.name);
  },
});

function Resolveable() {
  const user = useStateXValueResolveable(userSelector, {
    params: { name: 'World' }, // try your name
  });
  let value;
  switch (user.status) {
    case 'resolved':
      value = user.value;
      break;
    case 'pending':
      value = 'Resolving...';
      break;
    case 'error':
      value = user.error.toString();
      break;
  }

  return value;
}

return <Resolveable />;
```
