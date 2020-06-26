// @ts-nocheck
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  get,
  getIn,
  has,
  remove,
  removeIn,
  set,
  setIn,
  update,
  updateIn,
} from '../ImmutableUtils';

describe('ImmutableUtils', () => {
  test('get', () => {
    const collection = { key: 'value' };
    expect(get(collection, 'key')).toEqual('value');
  });

  test('get number key', () => {
    const key = 1;
    const collection = { [key]: 'value' };
    expect(get(collection, key)).toEqual('value');
  });

  test('get null', () => {
    const key = 1;
    const collection = { [key]: null };
    expect(get(collection, key)).toEqual(null);
  });

  test('has', () => {
    const collection = { key: 'value' };
    expect(has(collection, 'key')).toEqual(true);
  });

  test('has null', () => {
    const collection = { key: null };
    expect(has(collection, 'key')).toEqual(true);
  });

  test('has array', () => {
    const collection = [null, null];
    expect(has(collection, 0)).toEqual(true);
  });

  test('has array size', () => {
    const collection = [null, null];
    expect(has(collection, 3)).toEqual(false);
  });

  test('has 1', () => {
    const key = 1;
    const collection = { [key]: 'value' };
    expect(has(collection, key)).toEqual(true);
  });

  test('set same value should not mutate', () => {
    const collection = { key: 'value' };
    const result = set(collection, 'key', 'value');
    expect(result === collection).toEqual(true);
  });

  test('set different value should not mutate', () => {
    const collection = { key: 'value' };
    const result = set(collection, 'key', 'value1');
    expect(result !== collection).toEqual(true);
  });

  test('set', () => {
    const collection = { key: 'value' };
    const result = set(collection, 'key', 'value1');
    expect(collection.key).toEqual('value');
    expect(result.key).toEqual('value1');
  });

  test('set array', () => {
    const collection = ['a', 'b'];
    const result = set(collection, 0, 'value');
    expect(collection[0]).toEqual('a');
    expect(result[0]).toEqual('value');
  });

  test('set array size', () => {
    const collection: string[] = [];
    const result = set(collection, 0, 'value');
    expect(result[0]).toEqual('value');
  });

  test('set array > size', () => {
    expect(() => set([], 1, 'value')).not.toThrow();
  });

  test('setIn array > size', () => {
    expect(() =>
      setIn({ key: { key2: [[]] } }, ['key', 'key2', 2, 1], 'value'),
    ).not.toThrow();
  });

  test('set 1', () => {
    const key = 1;
    const collection = { key0: 'value' };
    const result = set(collection, key, 'value1');
    expect(collection[key]).toEqual(undefined);
    expect(result[key]).toEqual('value1');
  });

  test('update', () => {
    const collection = { key: 'value' };
    const result = update(collection, 'key', () => 'value1');
    expect(collection.key).toEqual('value');
    expect(result.key).toEqual('value1');
  });

  test('remove', () => {
    const collection = { key: 'value' };
    const result = remove(collection, 'key');
    expect(collection.key).toEqual('value');
    expect(result.key).toEqual(undefined);
  });

  test('setIn child1 no change', () => {
    const collection = { child1: { key: 'value' }, child2: { key: 'value' } };
    const result = setIn(collection, ['child2', 'key'], 'value1');
    expect(collection.child1 === result.child1).toEqual(true);
  });

  test('setIn null', () => {
    const collection = { child: { key: null } };
    const result = setIn(collection, ['child', 'key', 'childkey'], 'value');
    expect(collection.child === result.child).toEqual(false);
    expect(getIn(result, ['child', 'key', 'childkey'], '')).toEqual('value');
  });

  test('setIn 2', () => {
    const collection = { child1: { key: 'value' }, child2: { key: 'value' } };
    const result = setIn(collection, ['child2', 'key'], 'value');
    expect(collection.child2.key).toEqual('value');
    expect(collection.child2 === result.child2).toEqual(true);
    expect(collection === result).toEqual(true);
  });

  test('setIn number key', () => {
    const key = 1;
    const collection = {
      child1: { key1: 'value' },
      child2: { [key]: 'value' },
    };
    const result = setIn(collection, ['child2', key], 'value');
    expect(collection.child2[key]).toEqual('value');
    expect(collection.child2 === result.child2).toEqual(true);
    expect(collection === result).toEqual(true);
  });

  test('setIn number key 2', () => {
    const key = 1;
    const collection = {
      child1: { key1: 'value' },
      child2: { [key]: 'value' },
    };
    const result = setIn(collection, ['child2', key], 'value1');
    expect(collection.child2[key]).toEqual('value');
    expect(result.child2[key]).toEqual('value1');
  });

  test('setIn 3', () => {
    const collection = {
      child1: [{ key: 'value' }],
      child2: [{ key: 'value' }],
    };
    const result = setIn(collection, ['child2', 0], collection.child2[0]);
    expect(collection.child2 === result.child2).toEqual(true);
    expect(collection === result).toEqual(true);
  });

  test('setIn 4', () => {
    const collection = {
      child1: [{ key: 'value' }],
      child2: [{ key: 'value' }],
    };
    const result = setIn(collection, ['child2', 0, 'key'], 'value');
    expect(collection.child2 === result.child2).toEqual(true);
    expect(collection.child2[0] === result.child2[0]).toEqual(true);
    expect(collection === result).toEqual(true);
  });

  test('setIn array', () => {
    const collection = {
      child1: [{ key: 'value' }],
      child2: [{ key: 'value' }],
    };
    const result = setIn(collection, ['child2', 0, 'key'], 'value1');
    expect(collection.child2[0].key).toEqual('value');
    expect(result.child2[0].key).toEqual('value1');
  });

  test('setIn array', () => {
    const collection = { a: { b: {} } };
    const arr = ['a', 'b', 'c'];
    const result = setIn(collection, ['a', 'b'], arr);
    expect(Array.isArray(result.a.b)).toBe(true);
    expect(result).toStrictEqual({ a: { b: arr } });
  });

  test('updateIn array', () => {
    const collection = {
      child1: [{ key: 'value' }],
      child2: [{ key: 'value' }],
    };
    const result = updateIn(collection, ['child2', 0, 'key'], () => 'value1');
    expect(collection.child2[0].key).toEqual('value');
    expect(result.child2[0].key).toEqual('value1');
  });

  test('updateIn child2 no change', () => {
    const collection = { child1: { key: 'value' }, child2: { key: 'value' } };
    const result = updateIn(collection, ['child2', 'key'], () => 'value1');
    expect(collection.child2.key).toEqual('value');
    expect(result.child2.key).toEqual('value1');
  });

  test('removeIn child2', () => {
    const collection = { child1: { key: 'value' }, child2: { key: 'value' } };
    const result = removeIn(collection, ['child2', 'key']);
    expect(collection.child2.key).toEqual('value');
    expect(result.child2.key).toEqual(undefined);
  });

  test('remove 1', () => {
    const collection = [1, 2, 3];
    const result = remove(collection, 0);
    expect(result.length).toEqual(2);
  });

  test('remove null', () => {
    const collection = [1, null, 3];
    const result = remove(collection, 1);
    expect(get(collection, 1)).toEqual(null);
    expect(result.length).toEqual(2);
    expect(result[1]).toEqual(3);
  });

  test('getIn []', () => {
    const collection = { name: 'Steve' };
    expect(getIn(collection, [], undefined)).toMatchObject({ name: 'Steve' });
  });

  test('setIn []', () => {
    const collection = { name: 'Steve' };
    const updatedCollection = setIn(collection, [], { name: 'Jobs' });
    expect(getIn(updatedCollection, [], undefined)).toMatchObject({
      name: 'Jobs',
    });
  });
});
