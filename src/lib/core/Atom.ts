/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { StateXProps, StateXRefGetter } from './StateXTypes';
import { Path } from './ImmutableTypes';
import { StateXGetter, StateXSetter, StateXActionCaller } from './StateXTypes';

export default class Atom<T> {
  readonly path: Path;
  readonly defaultValue: T;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  updater?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue: T;
    set: StateXSetter;
    value: T;
  }) => T;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue: T;
    set: StateXSetter;
    value: T;
  }) => void;

  constructor(props: StateXProps<T>) {
    this.path = props.path;
    this.defaultValue = props.defaultValue;
    this.shouldComponentUpdate = props.shouldComponentUpdate;
    this.updater = props.updater;
    this.onChange = props.onChange;
  }
}
