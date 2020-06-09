/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { atom, selector } from '@cloudio/statex';

const lastNamePath = ['form', 'person', 'lastName'];

const firstNameAtom = atom({
  path: ['form', 'person', 'firstName'],
  defaultValue: '',
  updater: ({ value, oldValue, get, set }) => {
    const name = get<string>(lastNamePath);
    if (name?.toUpperCase() === oldValue?.toUpperCase()) {
      set(lastNamePath, value.toLowerCase());
    }
    return value.toUpperCase();
  },
});

const fullNameSelector = selector({
  path: ['form', 'person', 'fullName'],
  defaultValue: '',
  get: ({ get }) => {
    const fn = get(firstNameAtom);
    const ln = get(lastNamePath);
    if (fn && ln) {
      return `${fn} ${ln}`;
    }
    return '';
  },
});

const fullNameCountSelector = selector({
  path: ['form', 'person', 'fullNameCount'],
  defaultValue: 0,
  get: ({ get }) => {
    const fn = get(fullNameSelector);
    // return fn.length;
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(fn.length), 1000);
    });
  },
});

export { fullNameSelector, fullNameCountSelector, firstNameAtom, lastNamePath };
