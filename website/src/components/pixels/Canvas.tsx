/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { memo } from 'react';
import Pixel from './Pixel';
import { useStateXValue, useStateXGetter } from '@cloudio/statex';

function Canvas() {
  const show = useStateXValue(['show'], false);
  const get = useStateXGetter();
  const ids = Object.keys(get(['pixel']) || {});

  if (!show) {
    return <div className="canvas-container">Check Show Canvas</div>;
  }

  return (
    <div className="canvas-container">
      {ids.length
        ? ids.map((id) => <Pixel key={id} id={id} />)
        : 'Please wait...'}
    </div>
  );
}

export default memo(Canvas);
