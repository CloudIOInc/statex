---
title: useStateXSnapshotCallback()
sidebar_label: useStateXSnapshotCallback()
---

This hook takes a path and a callback function that get's called everytime the state at the given path, or any of it's child paths, change. This can be used to implement Undo History.

```javascript
function useStateXSnapshotCallback<T>(
  callback: (props: StateChangeListenerProps<T>) => void,
  path: Path = [],
)
```

```javascript
interface StateChangeListenerProps<T> {
  state: T;
  oldState?: T;
  updatedPaths: Path[];
  removedPaths: Path[];
}
```
