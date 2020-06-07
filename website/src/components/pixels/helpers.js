import { atom } from '@cloudio/statex';
import memoize from 'lodash/memoize';

export const atomWithID = memoize((id) =>
  atom({
    path: ['pixel', `pixel_${id}`],
    defaultValue: 0,
  }),
);

export const pixelWithID = (id) => ['pixel', `pixel_${id}`];
