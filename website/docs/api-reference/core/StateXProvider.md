---
title: StateXProvider
sidebar_label: StateXProvider
---

### <StateXProvider ...props />

Provides the context in which atoms have values. Must be an ancestor of any component that uses any StateX hooks. Multiple roots may co-exist; atoms will have distinct values within each root. If they are nested, the innermost root will completely mask any outer roots.

- `props` (Optional)

  - `initialState` Object or Array

    You application's intial state.

  - `handleError` (error) => void;

    This method will be invoked whenever an exception is thrown from a selector.

### Example

```jsx
import { StateXProvider } from '@cloudio/statex';

function AppRoot() {
  return (
    <StateXProvider>
      <App />
    </StateXProvider>
  );
}
```
