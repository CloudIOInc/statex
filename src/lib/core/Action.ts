/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ActionFunction } from './StateXTypes';
import { makeGet, makeSet, makeRemove, makeGetRef, makeCall } from './StateX';
import { StateX } from './StateXStore';

export default class Action<T, R> {
  private readonly fn: ActionFunction<T, R>;

  constructor(fn: ActionFunction<T, R>) {
    this.fn = fn;
  }

  execute = (store: StateX, value: T): R => {
    try {
      return this.fn(
        {
          set: makeSet(store),
          get: makeGet(store),
          getRef: makeGetRef(store),
          call: makeCall(store),
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
