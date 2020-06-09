---
title: path
sidebar_label: path
---

A path is like an address that points to a specific node of your global state tree

```shell title="path: ( string | number )[]"
// state: { person: { firstName: 'Steve', lastName: 'Jobs' } }

['person'] // { firstName: 'Steve', lastName: 'Jobs' }

['person', 'firstName'] // Steve
```

```shell title="path with arrays in state"
// state: { person: emails: ['jobs@a.com', 'jobs@me.com'] }

['person', 'emails', 0] // jobs@a.com

['person', 'emails', 1] // jobs@me.com
```

The following hooks can be used to interact with atoms:

- [useStateX()](useStateX): use this hook when you intend on both reading and writing to the atom. This hook subscribes the component to the atom.
- [useStateXValue()](useStateXValue): use this hook when you intend on only reading the atom. This hook subscribes the component to the atom.
- [useStateXValueSetter()](useStateXValueSetter): use this hook when you intend on only writing to the atom.
- [useRemoveStateX()](useRemoveStateX): use this hook to remove an atom from the global state.

For rare cases where you need to read an atom value without subscribing to the component, see [useStateXValueGetter()](useStateXValueGetter).

### Demo

```jsx live open
useWithStateX({ person: { firstName: 'Steve', lastName: 'Jobs' } });

const [value, setValue] = useStateX(['person', 'firstName']); // try ['person']

return JSON.stringify(value);
```
