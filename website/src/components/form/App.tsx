import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import Form from './Component';
// @ts-ignore
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { ThemeProvider } from '@material-ui/core/styles';
import useTheme from '../Theme';

export default function App() {
  const theme = useTheme();
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </StateXProvider>
  ) : null;
}
