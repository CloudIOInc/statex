import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import Form from './Form';

export default function App() {
  return (
    <StateXProvider>
      <Form />
    </StateXProvider>
  );
}
