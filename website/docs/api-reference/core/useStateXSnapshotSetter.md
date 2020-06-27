---
title: useStateXSnapshotSetter()
sidebar_label: useStateXSnapshotSetter()
---

This hook returns a function that can be used to replace the state at a given path. This hook along with [useStateXSnapshotCallback()](useStateXSnapshotCallback) can be used to implement Undo History.

```javascript
function useStateXSnapshotSetter(): <T>(state: T, path: Path = []) => void
```
