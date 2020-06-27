---
title: action()
sidebar_label: action()
---

Returns an [Action](../../introduction/core-concepts#actions) for a given function.

```javascript
function action<T = void>(fn: ActionFunction<T>): Action<T>
```

```javascript
type ActionFunction<T> = (
  props: {
    call: StateXActionCaller,
    get: StateXGetter,
    getRef: StateXRefGetter,
    remove: StateXRemover,
    set: StateXSetter,
  },
  value: T,
) => void;
```

- `call` Can be used to invoke other actions.
- `get` a function used to retrieve values from other paths/atoms/selectors. This function will not subscribe the selector to the given atoms/selectors.
- `getRef` a function used to retrieve a ref value at a given path.
- `remove` Can be used to remove value at other paths or atoms.
- `set` Can be used to set value of other paths/atoms/selectors.
- `value` - An optional value that is passed when invoking this action via. [useStateXAction()](useStateXAction) hook.
