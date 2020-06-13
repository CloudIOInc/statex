/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key, Path } from './ImmutableTypes';

export interface Node<T> {
  children: Record<Key, Node<T>>;
  data: T;
  key: Key;
  parent?: Node<T>;
  path: Path;
}

export default class Trie<T> {
  private root: Node<T>;
  private makeData: (key: Key, parent?: Node<T>) => T;

  constructor(makeData: (key: Key, parent?: Node<T>) => T) {
    this.makeData = makeData;
    this.root = this._createNode('_ROOT_');
  }

  reset = () => {
    this.root = this._createNode('_ROOT_');
  };

  private _createNode = (key: Key, parent?: Node<T>): Node<T> => {
    const node: Node<T> = {
      children: {},
      key,
      parent,
      path: parent ? [...parent.path, key] : [],
      data: this.makeData(key, parent),
    };
    return node;
  };

  _forEach = (
    node: Node<T>,
    level: number,
    fn: (node: Node<T>, level: number) => void,
  ) => {
    fn(node, level);
    Object.values(node.children).forEach((n) => {
      this._forEach(n, level + 1, fn);
    });
  };

  forEach = (path: Path, fn: (node: Node<T>, level: number) => void) => {
    const node = this.getNode(path);
    this._forEach(node, 0, fn);
  };

  getNode = (path: Path, createMissingNode = true) => {
    let node = this.root;
    let child: Node<T>;
    let key: Key;
    for (let i = 0; i < path.length; i++) {
      key = path[i];
      child = node.children[key];
      if (!child) {
        if (createMissingNode) {
          child = this._createNode(key, node);
          node.children[key] = child;
        } else {
          throw Error(
            `Node not found at path ${path.join(
              '.',
            )}! Parent ${key} at index ${i} is missing!`,
          );
        }
      }
      node = child;
    }
    return node;
  };

  addNode = (path: Path, data: T) => {
    const node = this.getNode(path);
    node.data = data;
  };

  removeNode = (node: Node<T>) => {
    delete node.parent?.children[node.key];
  };

  private _collectAllParentNodes = (list: Node<T>[], node: Node<T>) => {
    if (node.parent) {
      list.push(node.parent);
      this._collectAllParentNodes(list, node.parent);
    }
  };

  getAllParentNodes = (path: Path): Readonly<Node<T>>[] => {
    const nodes: Node<T>[] = [];
    this._collectAllParentNodes(nodes, this.getNode(path));
    return nodes;
  };

  private _collectAllChildNodes = (
    node: Node<T>,
    list: Node<T>[],
    filter?: (node: Node<T>) => boolean,
  ) => {
    let childNode: Node<T>;
    for (const child in node.children) {
      childNode = node.children[child];
      if (!filter || filter(childNode)) {
        list.push(childNode);
        this._collectAllChildNodes(childNode, list, filter);
      }
    }
  };

  getAllChildNodes = (
    path: Path,
    filter?: (node: Node<T>) => boolean,
  ): Readonly<Node<T>>[] => {
    const nodes: Node<T>[] = [];
    this._collectAllChildNodes(this.getNode(path), nodes, filter);
    return nodes;
  };

  isRootNode = (node: Node<T>) => node === this.root;
}
