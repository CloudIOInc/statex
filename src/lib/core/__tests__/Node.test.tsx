/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { shouldFreeze } from '../StateXUtils';

describe('StateXUtils', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('shouldFreeze obj', () => {
    expect(shouldFreeze({ nodeType: 1, nodeName: '' })).toBe(false);
  });

  test('shouldFreeze obj', () => {
    expect(shouldFreeze({ a: 1, b: '' })).toBe(true);
  });

  test('shouldFreeze obj', () => {
    expect(shouldFreeze({ $$typeof: 1 })).toBe(false);
  });
});
