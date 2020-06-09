/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { atom, useStateX } from '@cloudio/statex';
import Slider from '@material-ui/core/Slider';

export const boxSizeAtom = atom({
  path: ['settings', 'boxSize'],
  defaultValue: 60,
  updater: ({ value }) => Math.min(Math.max(30, value), 100),
});

export default function Settings() {
  const [size, setSize] = useStateX(boxSizeAtom);

  return (
    <Slider
      value={size}
      onChange={(e, value) => setSize(value as number)}
      aria-labelledby="discrete-slider-restrict"
      valueLabelDisplay="auto"
      step={10}
      marks
      min={30}
      max={100}
    />
  );
}
