import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import Form from './Component';
// @ts-ignore
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../Theme';

export default function App() {
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </StateXProvider>
  ) : null;
}
