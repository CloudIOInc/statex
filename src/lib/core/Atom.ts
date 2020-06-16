/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { StateXProps, StateXRefGetter } from './StateXTypes';
import { Path } from './ImmutableTypes';
import { StateXGetter, StateXSetter } from './StateXTypes';

export default class Atom<T> {
  readonly path: Path;
  readonly defaultValue: T;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  updater?: (props: {
    value: T;
    oldValue: T;
    get: StateXGetter;
    getRef: StateXRefGetter;
    set: StateXSetter;
  }) => T;
  onChange?: (props: {
    value: T;
    oldValue: T;
    get: StateXGetter;
    getRef: StateXRefGetter;
    set: StateXSetter;
  }) => void;

  constructor(props: StateXProps<T>) {
    this.path = props.path;
    this.defaultValue = props.defaultValue;
    this.shouldComponentUpdate = props.shouldComponentUpdate;
    this.updater = props.updater;
    this.onChange = props.onChange;
  }
}
