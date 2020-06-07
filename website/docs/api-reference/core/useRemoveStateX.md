---
title: useRemoveStateX()
---

Returns a function that will delete the value of the given state.

- `state`: a [`path`](path) or [`atom`](atom)

> Use `useStateXValueRemover()` to just remove the state without reading it's value.

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
