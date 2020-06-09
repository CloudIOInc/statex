import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
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
