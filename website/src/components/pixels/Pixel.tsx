/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { atomWithID } from './helpers';
import { useStateX, useStateXValue } from '@cloudio/statex';

export default function Pixel({ id }: { id: string }) {
  const [value, setValue] = useStateX(atomWithID(id));
  const all = useStateXValue(['all'], false);
  function onMouseEnter() {
    setValue(all ? 0 : 1);
  }
  const className = value
    ? 'pixel pixel-stats-full'
    : 'pixel pixel-stats-empty';
  return <span className={className} onMouseEnter={onMouseEnter} />;
}
