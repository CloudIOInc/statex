// @ts-nocheck
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { areEqualShallow } from '../Selector';

describe('areEqualShallow', () => {
  it('string', () => {
    expect(areEqualShallow('a', 'a')).toBe(true);
  });

  it('number', () => {
    expect(areEqualShallow(1, 1)).toBe(true);
  });

  it('Empty Object', () => {
    expect(areEqualShallow({}, {})).toBe(true);
  });

  it('Object', () => {
    expect(areEqualShallow({ a: 'a', b: 'b' }, { a: 'a', b: 'b' })).toBe(true);
  });

  it('Object undefined', () => {
    expect(
      areEqualShallow({ a: 'a', b: undefined }, { a: 'a', b: undefined }),
    ).toBe(true);
  });

  it('Object x', () => {
    expect(areEqualShallow({ a: 'a', b: 'x' }, { a: 'a', b: undefined })).toBe(
      false,
    );
  });

  it('undefined', () => {
    expect(areEqualShallow(undefined, undefined)).toBe(true);
  });

  it('Empty Array', () => {
    expect(areEqualShallow([], [])).toBe(true);
  });

  it('Array', () => {
    expect(areEqualShallow(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  it('Array', () => {
    expect(areEqualShallow(['a', 'b'], ['b', 'a'])).toBe(false);
  });
});
