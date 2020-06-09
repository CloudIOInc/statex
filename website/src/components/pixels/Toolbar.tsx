/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { useStateXForCheckbox } from '@cloudio/statex';
import Perf from './Perf';

export default function Toolbar() {
  const show = useStateXForCheckbox(['show'], false);
  const all = useStateXForCheckbox(['all'], false);

  return (
    <div className="toolbar">
      Check to show canvas <input {...show} />
      <br />
      Check to mark all <input {...all} />
      <Perf show={show.checked} all={all.checked} />
    </div>
  );
}
