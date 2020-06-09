---
title: useStateXForTextInput()
sidebar_label: useStateXForTextInput()
---

Returns an object with value, onChange & type (default 'text') that can be spread on a text input.

## useStateXForTextInput(path)

```jsx title="useStateXForTextInput(path, defaultValue)"
const firstName = useStateXForTextInput(['person', 'firstName'], '');
const password = useStateXForTextInput(['person', 'password'], '', {
  type: 'password',
});

<input {...firstName} />;
<input {...password} />;
```

### useStateXForTextInput Demo

```jsx live
const firstName = useStateXForTextInput(['person', 'firstName'], '');
const password = useStateXForTextInput(['person', 'password'], '', {
  type: 'password',
});

return (
  <>
    <input {...firstName} />
    <input {...password} />
  </>
);
```
