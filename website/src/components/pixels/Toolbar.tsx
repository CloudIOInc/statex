/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { useStateXAction, useStateXValue } from '@cloudio/statex';
import Perf from './Perf';
import { checkAllAction, genDataAction } from './helpers';

export default function Toolbar() {
  const show = useStateXValue(['show'], false);
  const all = useStateXValue(['all'], false);
  const checkAll = useStateXAction(checkAllAction);
  const genData = useStateXAction(genDataAction);

  return (
    <div className="toolbar">
      Check to show canvas{' '}
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => genData(e.target.checked)}
      />
      <br />
      Check to mark all{' '}
      <input
        type="checkbox"
        checked={all}
        onChange={(e) => checkAll(e.target.checked)}
      />
      <Perf show={show} all={all} />
    </div>
  );
}
