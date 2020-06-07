import React from 'react';
import { StateXProvider } from '@cloudio/statex';
import Form from './Form';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'rgba(239, 103, 13, 0.65)',
      main: '#ef670d',
      dark: '#ef670d',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(239, 103, 13, 0.65)',
      main: '#ef670d',
      dark: '#ef670d',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

export default function App() {
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </StateXProvider>
  ) : null;
}
