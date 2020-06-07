---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Create React App

StateX is a state management library for React, so you need to have React installed and running to use StateX. The easiest and recommended way for bootstrapping a React application is to use [Create React App](https://github.com/facebook/create-react-app#creating-an-app):

```shell
npx create-react-app my-statex
```

> `npx` is a package runner tool that comes with npm 5.2+ and higher.

For more ways to install Create React App, see the [official documentation](https://github.com/facebook/create-react-app#creating-an-app).

## Installation

The StateX package lives in <a href="https://www.npmjs.com/get-npm" target="_blank">npm</a>. To install the latest stable version, run the following command:

```shell
npm install @cloudio/statex
```

Or if you're using <a href="https://classic.yarnpkg.com/en/docs/install/" target="_blank">yarn</a>:

```shell
yarn add @cloudio/statex
```

## Provider

Components that use atom state need `StateXProvider` to appear somewhere in the parent tree. A good place to put this is in your root component:

```jsx
import React from 'react';
import { StateXProvider } from '@cloudio/statex';

function App() {
  return (
    <StateXProvider>
      <CharacterCounter />
    </StateXProvider>
  );
}
```

We'll implement the `CharacterCounter` component in the following section.

## Atom

An **atom** represents a node in the global **state** tree. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly **subscribed** to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:

```javascript
const textAtom = atom({
  // unique path in the state tree
  path: ['mystate', 'text'],
  defaultValue: '', // initial value
});
```

Components that need to read from _and_ write to an atom should use `useStateX()` as shown below:

```jsx
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useStateX(textAtom);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

## Selector

A **selector** represents a piece of **derived atom**. Derived atom is a **transformation** of one or more atoms. You can think of derived atom as the output of passing atom to a pure function that modifies the given atom in some way:

```jsx
const charCountSelector = selector({
  path: ['mystate', 'charCount'], // unique path
  get: ({ get }) => {
    const text = get(textAtom);

    return text.length;
  },
});
```

We can use the `useStateXValue()` hook to read the value of `charCountSelector`:

```jsx
function CharacterCount() {
  const count = useStateXValue(charCountSelector);

  return <>Character Count: {count}</>;
}
```

We can use also use just the path, without having to define an atom, to read or write the state at any node in the tree. Below, is an example where we read the root JSON object at the root atom which has a nested atom 'mystate' which intern has 'text' & 'charCount'

```jsx
function JSONPayload() {
  const json = useStateXValue(['mystate'], {});

  return (
    <>
      <pre>{JSON.stringify(json, null, '  ')}</pre>
    </>
  );
}
```

## Demo

Below is the finished product:

```jsx live
const textAtom = atom({
  path: ['mystate', 'text'],
  defaultValue: '',
});

const charCountSelector = selector({
  path: ['mystate', 'charCount'],
  defaultValue: 0,
  get: ({ get }) => {
    const text = get(textAtom);

    return text.length;
  },
});

function CharacterCounter() {
  return (
    <>
      <TextInput />
      <CharacterCount />
      <JSONPayload />
    </>
  );
}

function CharacterCount() {
  const count = useStateXValue(charCountSelector);

  return <>Character Count: {count}</>;
}

function JSONPayload() {
  const json = useStateXValue([], {});

  return (
    <>
      <pre>{JSON.stringify(json, null, '  ')}</pre>
    </>
  );
}

function TextInput() {
  const [text, setText] = useStateX(textAtom);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

return <CharacterCounter />;
```
