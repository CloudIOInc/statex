/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Path, Key } from './ImmutableTypes';
import type { Node } from './Trie';
import type { SetStateAction } from 'react';
import Atom from './Atom';
import Selector from './Selector';
import { StateX } from './StateXStore';
import React from 'react';

export type { Path, Key } from './ImmutableTypes';

export type Setter = (v: any) => void;

export interface SelectorProps<T> {
  path: Path;
  defaultValue: T;
  get: Select<T>;
  set?: Write<T>;
  shouldComponentUpdate?: (
    value: Readonly<T>,
    oldValue?: Readonly<T>,
  ) => boolean;
}

export interface StateXProps<T> {
  path: Path;
  defaultValue: T;
  shouldComponentUpdate?: (
    value: Readonly<T>,
    oldValue?: Readonly<T>,
  ) => boolean;
  updater?: (props: {
    value: T;
    oldValue: Readonly<T>;
    get: StateXGetter;
    set: StateXSetter;
  }) => T;
  onChange?: (props: {
    value: Readonly<T>;
    oldValue: Readonly<T>;
    get: StateXGetter;
    set: StateXSetter;
  }) => void;
}

export interface StateXHolder<T> {
  setter: Setter;
  shouldComponentUpdate?: (
    value: Readonly<T>,
    oldValue?: Readonly<T>,
  ) => boolean;
  onChange?: (props: {
    value: Readonly<T>;
    oldValue?: Readonly<T>;
    get: StateXGetter;
    set: StateXSetter;
  }) => void;
  holding?: boolean;
  node: Node<NodeData<T>>;
}

export interface NodeData<T> {
  atom?: Atom<T>;
  selector?: Selector<T>;
  holders: Set<StateXHolder<T>>;
  lastKnownValue?: T;
  defaultValue: T;
  ref?: React.RefObject<any>;
}

export interface NodeDataWithStateX<T> extends NodeData<T> {
  atom: Atom<T>;
}

export interface NodeDataWithSelector<T> extends NodeData<T> {
  selector: Selector<T>;
  resolveable?: Resolvable<T>;
  initialized?: boolean;
  selectorValue?: T;
  oldValue?: T;
  unregisterMap: Map<Node<NodeData<T>>, () => void>;
  previousNodes: Set<Node<NodeData<T>>>;
}

export function hasStateX<T>(node: NodeData<T>): node is NodeDataWithStateX<T> {
  return node.atom !== undefined;
}

export function hasSelector<T>(
  node: NodeData<T>,
): node is NodeDataWithSelector<T> {
  return node.selector !== undefined;
}

export function isSelectorNode<T>(
  node: Node<NodeData<T>>,
): node is Node<NodeDataWithSelector<T>> {
  return node.data.selector !== undefined;
}

export interface Options {
  mutableRefObject?: boolean;
  params?: Record<string, Key>;
}

export interface StateXOptions<T> extends Options {
  shouldComponentUpdate?: (
    value: Readonly<T>,
    oldValue?: Readonly<T>,
  ) => boolean;
  onChange?: (props: {
    value: Readonly<T>;
    oldValue?: Readonly<T>;
    get: StateXGetter;
    set: StateXSetter;
  }) => void;
}

export type UIType = 'text' | 'email' | 'password' | 'number';

export interface UIStateXOptions<T> extends StateXOptions<T> {
  type?: UIType;
  debounce?: number;
}

export type Dispatch<T> = (value: SetStateAction<T>) => T | undefined;

export type StateXGetter = <T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  props?: Options,
) => Readonly<T>;

export type StateXSetter = <V>(
  path: PathOrStateX<V>,
  value: SetStateAction<V>,
  options?: Options,
) => Readonly<V>;

export type Select<T> = (props: {
  get: StateXGetter;
  set: StateXSetter;
  params?: Record<string, Key>;
}) => T | Promise<T>;

export type Write<T> = (props: {
  get: StateXGetter;
  set: StateXSetter;
  params?: Record<string, Key>;
  value: T;
}) => T;

export class Resolvable<T> {
  status: 'pending' | 'resolved' | 'error';
  error?: Error;
  promise?: Promise<T>;
  value?: T;
  cancelled: boolean = false;
  selectorNode: Node<NodeData<T>>;
  self: boolean;

  constructor(selectorNode: Node<NodeData<T>>, self: boolean) {
    this.selectorNode = selectorNode;
    this.status = 'pending';
    this.self = self;
  }

  clone = () => {
    const resolvable = new Resolvable(this.selectorNode, this.self);
    resolvable.value = this.value;
    resolvable.status = this.status;
    resolvable.promise = this.promise;
    resolvable.error = this.error;
    resolvable.cancelled = this.cancelled;
    return resolvable;
  };

  static withValue<T>(selectorNode: Node<NodeData<T>>, value: T) {
    const resolvable = new Resolvable(selectorNode, true);
    resolvable.value = value;
    resolvable.status = 'resolved';
    return resolvable;
  }

  resolveIfSelf = (selectorNode: Node<NodeData<T>>): T => {
    switch (this.status) {
      case 'pending':
        throw this.promise;
      case 'error':
        throw this.error;
      default:
        if (this.selectorNode === selectorNode && this.self) {
          return this.value as T;
        }
        throw this.promise;
    }
  };

  resolve = (): T => {
    switch (this.status) {
      case 'pending':
        throw this.promise;
      case 'error':
        throw this.error;
      default:
        return this.value as T;
    }
  };
}

export function isResolvable<T>(
  value: T | Resolvable<T>,
): value is Resolvable<T> {
  return value instanceof Resolvable;
}

export interface SelectorInterface<T> {
  getValue: (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T>>,
    options?: Options,
  ) => T | Resolvable<T>;
  setValue: (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T>>,
    value: T,
    options?: Options,
  ) => T;
}

export type PathOrStateX<T> = Path | Atom<T>;

export type PathOrStateXOrSelector<T> = Path | Atom<T> | Selector<T>;
