---
title: useStateXAction()
---

Returns a function for invoking the given [Action](../../introduction/core-concepts#actions)

```javascript
function useStateXAction<T = void>(action: Action<T>): (value: T) => void
```
