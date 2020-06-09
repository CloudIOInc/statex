/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createMuiTheme } from '@material-ui/core/styles';
import { useMemo } from 'react';
// @ts-ignore
import useThemeContext from '@theme/hooks/useThemeContext';

export default function useTheme() {
  const { isDarkTheme } = useThemeContext();

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkTheme ? 'dark' : 'light',
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
      }),
    [isDarkTheme],
  );
  return theme;
}
