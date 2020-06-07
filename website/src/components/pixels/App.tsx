import React from 'react';
import Canvas from './Canvas';
import './styles.css';
import PixelStats from './PixelStats';
import Toolbar from './Toolbar';
import { StateXProvider } from '@cloudio/statex';
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
