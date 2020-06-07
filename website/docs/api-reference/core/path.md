---
title: path
sidebar_label: path
---

A path is like an address that points to a specific node of your global state tree

```shell title="path: ( string | number )[]"
// state: { root: { userList: ['User A', 'User B'] } }

['root', 'userList'] // ['User A', 'User B']

['root', 'userList', 1] // User B

```

The following hooks can be used to interact with atoms:

- [`useStateX()`](useStateX): use this hook when you intend on both reading and writing to the atom. This hook subscribes the component to the atom.
- [`useStateXValue()`](useStateXValue): use this hook when you intend on only reading the atom. This hook subscribes the component to the atom.
- [`useStateXValueSetter()`](useStateXValueSetter): use this hook when you intend on only writing to the atom.
- [`useRemoveStateX()`](useRemoveStateX): use this hook to remove an atom from the global state.

For rare cases where you need to read an atom value without subscribing to the component, see [`useStateXValueGetterWithPath()`](useStateXValueGetterWithPath).

### Demo

```jsx live open
useWithStateX({ root: { userList: ['User A', 'User B'] } });

const [value, setValue] = useStateX(['root', 'userList', 1]);

return value;
```
