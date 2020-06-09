/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Canvas from './Canvas';
import { StateXProvider } from '@cloudio/statex';
// @ts-ignore
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Settings from './Settings';
import useTheme from '../Theme';
import { ThemeProvider } from '@material-ui/core';

const style: React.CSSProperties = {
  width: '100%',
  height: '600px',
  position: 'relative',
  overflow: 'hidden',
};

export default function App() {
  const theme = useTheme();
  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <ThemeProvider theme={theme}>
        <Settings />
        <div style={style}>
          <Canvas />
        </div>
      </ThemeProvider>
    </StateXProvider>
  ) : null;
}
