/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { atom, action } from '@cloudio/statex';
import memoize from 'lodash/memoize';

export const pixelPathWithID = (id: string) => ['pixel', id];

export const atomWithID = memoize((id: string) =>
  atom({
    path: pixelPathWithID(id),
    defaultValue: 0,
  }),
);

export const checkAllAction = action(({ set, get }, checkAll: boolean) => {
  let pixels = get<Record<string, number>>(['pixel']) || {};
  pixels = { ...pixels };
  const ids = Object.keys(pixels);
  ids.forEach((id) => (pixels[id] = checkAll ? 1 : 0));
  set(['pixel'], pixels);
  set(['all'], checkAll);
});

export const genDataAction = action(({ set }, show: boolean) => {
  const pixel: Record<string, number> = {};
  if (show) {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const id = `pixel_${i}_${j}`;
        pixel[id] = 0;
      }
    }
  }
  set(['pixel'], pixel);
  set(['show'], show);
});
