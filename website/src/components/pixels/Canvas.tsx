/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Pixel from './Pixel';
import { useStateXValue } from '@cloudio/statex';

const Canvas = () => {
  const width = 100;
  const height = 100;
  const pixels = [];

  const show = useStateXValue(['show'], false);

  if (!show) {
    return null;
  }

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const id = `${i}_${j}`;
      pixels.push(<Pixel key={id} id={id} />);
    }
  }
  return <div className="canvas-container">{pixels}</div>;
};

export default Canvas;
