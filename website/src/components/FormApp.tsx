import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import Form from './Form';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function App() {
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <Form />
    </StateXProvider>
  ) : null;
}
