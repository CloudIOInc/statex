/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Trie from '../Trie';

describe('Trie', () => {
  test('key', () => {
    const trie = new Trie<string>(() => '');
    expect(trie.getNode(['a', 'b'], true).key).toBe('b');
  });

  test('path', () => {
    const trie = new Trie<string>(() => '');
    expect(trie.getNode(['a', 'b']).path).toMatchObject(['a', 'b']);
  });

  test('data', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'b'], 'X');
    expect(trie.getNode(['a', 'b']).data).toBe('X');
  });

  test('getAllChildNodes', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x'], 'X');
    trie.addNode(['a', 'y'], 'Y');
    const node = trie.getAllChildNodes(['a']);
    expect(node.length).toBe(2);
  });

  test('getAllChildNodes w/ filter', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x'], 'X');
    trie.addNode(['a', 'y'], 'Y');
    const node = trie.getAllChildNodes(['a'], (node) => node.data === 'X');
    expect(node.length).toBe(1);
  });

  test('getAllChildNodes length', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'y', 'z'], 'Z');
    const node = trie.getAllChildNodes(['a']);
    expect(node.length).toBe(3);
  });

  test('getAllParentNodes', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'y', 'z'], 'Z');
    const nodes = trie.getAllParentNodes(['a', 'x', 'y', 'z']);
    expect(nodes.length).toBe(4);
  });

  test('getAllParentNodes contains root node at the end', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'y', 'z'], 'Z');
    const nodes = trie.getAllParentNodes(['a', 'x', 'y', 'z']);
    expect(trie.isRootNode(nodes[3])).toBe(true);
  });

  test('check immediate parent path', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'y', 'z'], 'Z');
    expect(trie.getNode(['a', 'x', 'y', 'z']).parent?.path).toMatchObject([
      'a',
      'x',
      'y',
    ]);
  });

  test('removeNode', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    trie.addNode(['a', 'y', 'y1'], 'Y');
    trie.removeNode(trie.getNode(['a', 'x']));
    expect(Object.keys(trie.getNode(['a']).children)).toMatchObject(['y']);
  });

  test('removeNode', () => {
    expect(() => {
      const trie = new Trie<string>(() => '');
      trie.addNode(['a', 'x', 'x1'], 'X');
      trie.removeNode(trie.getNode(['a']));
      trie.getNode(['a'], false);
    }).toThrow('Node not found at path ["a"]! Parent a at index 0 is missing!');
  });

  test('removeNode root', () => {
    expect(() => {
      const trie = new Trie<string>(() => '');
      trie.addNode(['a', 'x', 'x1'], 'X');
      trie.removeNode(trie.getNode([]));
    }).toThrow('Cannot remove root node!');
  });

  test('isChildNode true', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    const node = trie.getNode(['a', 'x', 'x1'], false);
    expect(trie.isChildNode(['a'], node)).toBe(true);
  });

  test('isThisOrChildNode true', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    const node = trie.getNode(['a', 'x', 'x1'], false);
    expect(trie.isThisOrChildNode(['a'], node)).toBe(true);
  });

  test('isChildNode false', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    const node = trie.getNode(['a', 'x', 'x1'], false);
    expect(trie.isChildNode(['b'], node)).toBe(false);
  });

  test('isThisOrChildNode', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    const node = trie.getNode(['a', 'x', 'x1'], false);
    expect(trie.isThisOrChildNode(['a', 'x', 'x1'], node)).toBe(true);
  });

  test('isThisOrChildNode', () => {
    const trie = new Trie<string>(() => '');
    trie.addNode(['a', 'x', 'x1'], 'X');
    let count = 0;
    trie.forEach(['a'], (n) => {
      count++;
    });
    expect(count).toBe(3);
  });

  test('hasNode', () => {
    const trie = new Trie<string>(() => '');
    expect(trie.hasNode(['x'])).toBe(false);
  });

  test('hasChildren', () => {
    const trie = new Trie<string>(() => '');
    expect(trie.hasChildren(['a'])).toBe(false);
    trie.addNode(['a', 'x', 'x1'], 'X');
    expect(trie.hasChildren(['a'])).toBe(true);
  });
});
