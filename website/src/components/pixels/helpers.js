/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { atom } from '@cloudio/statex';
import memoize from 'lodash/memoize';

export const atomWithID = memoize((id) =>
  atom({
    path: ['pixel', `pixel_${id}`],
    defaultValue: 0,
  }),
);

export const pixelWithID = (id) => ['pixel', `pixel_${id}`];
