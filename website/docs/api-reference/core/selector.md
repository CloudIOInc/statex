---
title: selector(options)
sidebar_label: selector()
---

Returns writeable or read-only StateX derived/calculated state at a given [path](path), depending on the options passed to the function.

Selectors represent **derived state**. You can think of derived state as the output of passing state to a pure function that modifies the given state in some way.

- `options`

  - `path`: A unique json path for this selector. This path should be unique with respect to other atoms and selectors in the entire application. Path can have placeholders (bind variables) e.g. ['employee', ':empId']
  - `defaultValue`: The initial value of the selector.
  - ```tsx title="shouldComponentUpdate?:"
    (value: T, oldValue?: T) => boolean;
    ```

    Similar to the react class component lifecyle method, if set, will be invoked before triggering a re-render of the component due to a change in the state. Return false to prevent re-rendering of the component subscribed to this atom.

    > Returning false will also prevent the below functions updater & onChange from being invoked.

  - ```tsx title="get: A function that is passed an object as the first parameter containing the following properties:"
    (props: {
      call: StateXActionCaller;
      get: StateXGetter;
      getRef: StateXRefGetter;
      params?: Record<string, Key>;
      remove: StateXRemover;
      set: StateXSetter;
    }) => T | Promise<T>
    ```

    - `call` Can be used to invoke other actions.
    - `get` All atoms/selectors passed to this function will be implicitly added to a list of **dependencies** for the selector. If any of the selector's dependencies change, the selector will re-evaluate.
    - `getRef` Can be used to get a global MutableRefObject.
    - `params?:` Are the key/value pairs used to evaluate this selector's path with placeholders
    - `remove` Can be used to remove value at other paths or atoms.
    - `set` Can be used to set value of other paths/atoms/selectors.

  - ```tsx title="set?: If this property is set, the selector will return **writeable** state. A function that is passed an object as the first parameter containing the following properties:"
    (
      props: {
        call: StateXActionCaller;
        get: StateXGetter;
        getRef: StateXRefGetter;
        params?: Record<string, Key>;
        remove: StateXRemover;
        set: StateXSetter;
        value: T;
      },
      value: T,
    ) => T;
    ```

### Demo

```jsx live
const fahrenheit = atom({
  path: ['fahrenheit'],
  defaultValue: 32,
});

const celcius = selector({
  path: ['celcius'],
  get: ({ get, set }) => {
    const value = ((get(fahrenheit) - 32) * 5) / 9;
    // uncomment the below line to store the derived state
    // set(['celcius_value'], value);
    return value;
  },
  set: ({ set, value }) => {
    set(fahrenheit, (value * 9) / 5 + 32);
  },
});

function TempCelcius() {
  const [tempF, setTempF] = useStateX(fahrenheit);
  const [tempC, setTempC] = useStateX(celcius);

  const addTenCelcius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Celcius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelcius}>Add 10 Celcius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}

return <TempCelcius />;
```

### Asynchronous Demo

```jsx live
function asyncGet(fahrenheit) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(((fahrenheit - 32) * 5) / 9), 3000),
  );
}

const fahrenheit = atom({
  path: ['fahrenheit'],
  defaultValue: 32,
});

const celcius = selector({
  path: ['celcius'],
  get: ({ get }) => asyncGet(get(fahrenheit)),
  set: ({ set, value }) => set(fahrenheit, (value * 9) / 5 + 32),
});

function Fahrenheit() {
  const [tempF, setTempF] = useStateX(fahrenheit);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}

function Celcius() {
  const [tempC, setTempC] = useStateX(celcius);
  const addTenCelcius = () => setTempC(tempC + 10);

  return (
    <div>
      Temp (Celcius): {tempC}
      <br />
      <button onClick={addTenCelcius}>Add 10 Celcius</button>
    </div>
  );
}

return (
  <>
    <Suspense fallback={'Calculating Fahrenheit...'}>
      <Fahrenheit />
    </Suspense>
    <Suspense fallback={'Calculating Celcius...'}>
      <Celcius />
    </Suspense>
  </>
);
```
