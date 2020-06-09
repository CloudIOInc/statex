import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import MasterDetails from './Component';
// @ts-ignore
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function App() {
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <MasterDetails />
    </StateXProvider>
  ) : null;
}
