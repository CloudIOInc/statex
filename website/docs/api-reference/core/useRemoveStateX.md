---
title: useRemoveStateX()
---

Returns a function that will delete the value of the given state.

```jsx title="useRemoveStateX(atom)"
function useRemoveStateX<T>(
  atom: Atom<T>,
  options?: StateXOptions<T>,
): [Readonly<T>, () => Readonly<T>];
```

```jsx title="useRemoveStateX(path)"
function useRemoveStateX<T>(
  path: Path,
  defaultValue: T,
  options?: StateXOptions<T>,
): [Readonly<T>, () => Readonly<T>];
```

> Use `useStateXValueRemover()` to just remove the state without reading it's value.
>
> ```jsx
> function useStateXValueRemover<T>(
>   pathOrAtom: Path | Atom<T>,
>   options?: Options,
> ): () => Readonly<T>
> ```

### Demo

```jsx live
const users = useStateXValue(
  ['userArray'],
  ['User 1', 'User 2', 'User 3', 'User 4'],
);

const [user, deleteUser] = useRemoveStateX(['userArray', ':index'], '', {
  params: { index: users.length - 1 },
});

return <button onClick={deleteUser}>Delete {user}</button>;
```
