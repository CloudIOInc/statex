---
id: form
title: Form
---

This section assumes you have installed StateX and React. See the [Getting Started](../introduction/getting-started) page for how to get started with StateX and React from scratch.

### Demo

import App from '../../src/components/FormApp';

<App />

## Code Walkthrough

### First Name Field

Note that the text typed in the first name gets transformed to uppercase and at the same time get's copied to last name in lowercase. This is achived by using the `updater` option of [atom](../api-reference/core/atom).

```javascript
const firstName = atom({
  path: ['form', 'person', 'firstName'],
  defaultValue: '',
  updater: ({ value, oldValue, get, set }) => {
    const name = get(lastName);
    if (name?.toUpperCase() === oldValue?.toUpperCase()) {
      // highlight-next-line
      set(lastName, value.toLowerCase());
    }
    // highlight-next-line
    return value.toUpperCase();
  },
});
```

### Dynamic Field

The path can be dynamically changed as shown below where it's swtiched between firstName & lastName.

```jsx
function DynamicField() {
  // highlight-next-line
  const [field, setField] = useState('firstName');
  return (
    <div>
      <RadioGroup value={field} onChange={(e, value) => setField(value)} row>
        <FormControlLabel
          value="firstName"
          control={<Radio />}
          label="First Name"
        />
        <FormControlLabel
          value="lastName"
          control={<Radio />}
          label="Last Name"
        />
      </RadioGroup>
      // highlight-next-line
      <TextInput label={field} path={['form', 'person', field]} />
    </div>
  );
}

function TextInput({ path, label, autoFocus }: Props) {
  // highlight-next-line
  const atom = useStateXForTextInput(path, '');

  return (
    <>
      <TextField
        // highlight-next-line
        {...atom}
        autoFocus={autoFocus}
        label={label}
        style={{ margin: 8 }}
        placeholder={label}
        helperText={`@ path [${path.join('.')}]`}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}
```

### Full Name Selector

Full Name is derived using a selector. Note that we access firstName & lastName using the get function that is passed as an option to the [selector](../api-reference/core/selector)'s get function.

```javascript
const fullName = selector({
  path: ['form', 'person', 'fullName'],
  defaultValue: '',
  get: ({ get }) => {
    // highlight-next-line
    const fn = get(firstName);
    const ln = get(lastName);
    if (fn && ln) {
      return `${fn} ${ln}`;
    }
    return '';
  },
});
```

### Full Name Character Count Async Selector

Full Name Character Count is derived asyncronusly using a selector that returns a Promise. Note that we access fullName, which is another `selector`.

```javascript
const fullNameCount = selector({
  path: ['form', 'person', 'fullNameCount'],
  defaultValue: 0,
  get: ({ get }) => {
    const fn = get(fullName);
    // return fn.length;
    // highlight-next-line
    return new Promise((resolve) => {
      setTimeout(() => resolve(fn.length), 1000);
    });
  },
});

function FullNameCount() {
  return (
    // highlight-next-line
    <Suspense fallback={<Typography>Loading count...</Typography>}>
      <FullNameCount />
    </Suspense>
  );
}
```

### Clear Button

Use [useStateXValueSetter](../api-reference/core/useStateXValueSetter) hook to just perform a state update without subscribing to it's value.

```jsx
function Clear() {
  // highlight-next-line
  const setFirstName = useStateXValueSetter(firstName);
  const setLastName = useStateXValueSetter(lastName);

  function clear() {
    setFirstName('');
    setLastName('');
  }

  return (
    <>
      <Button variant="contained" onClick={clear}>
        Clear
      </Button>
    </>
  );
}
```

### State JSON

And finally, we can access the complete state by using the parent path e.g. ['form']

```jsx
function ShowState() {
  // highlight-next-line
  const json = useStateXValue(['form'], {});
  return (
    <Card variant="outlined" color="black">
      <CardContent>
        <pre>{JSON.stringify(json, null, '  ')}</pre>
      </CardContent>
    </Card>
  );
}
```
