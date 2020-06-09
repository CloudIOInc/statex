/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Canvas from './Canvas';
import './styles.css';
import PixelStats from './PixelStats';
import Toolbar from './Toolbar';
import { StateXProvider } from '@cloudio/statex';
// @ts-ignore
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function App() {
  const canvases = [];

  for (let i = 0; i < 2; i++) {
    canvases.push(<Canvas key={i} />);
  }

  return ExecutionEnvironment.canUseDOM ? (
    <StateXProvider>
      <div className="App">
        <Toolbar />
        <PixelStats />
        {canvases}
      </div>
    </StateXProvider>
  ) : null;
}
