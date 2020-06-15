/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ActionFunction } from './StateXTypes';
import { makeGet, makeSet, makeRemove } from './StateX';
import { StateX } from './StateXStore';

export default class Action<T> {
  private readonly fn: ActionFunction<T>;

  constructor(fn: ActionFunction<T>) {
    this.fn = fn;
  }

  execute = (store: StateX, value: T) => {
    try {
      this.fn(
        {
          set: makeSet(store),
          get: makeGet(store),
          remove: makeRemove(store),
        },
        value,
      );
    } catch (error) {
      store.catch(error);
      throw error;
    }
  };
}
