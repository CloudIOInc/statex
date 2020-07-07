/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Path, Key } from './ImmutableTypes';
import type { Node } from './Trie';
import type { SetStateAction, MutableRefObject } from 'react';
import Atom from './Atom';
import Selector from './Selector';
import { StateX } from './StateXStore';
import React from 'react';
import Action from './Action';

export type { Node } from './Trie';

export type { Path, Key } from './ImmutableTypes';

export type Setter = (v: any) => void;

export interface SelectorProps<T> {
  path: Path;
  defaultValue: T;
  get: Select<T>;
  set?: Write<T>;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
}

export type ActionFunction<T> = (
  props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    remove: StateXRemover;
    set: StateXSetter;
  },
  value: T,
) => void;

export interface StateXProps<T> {
  path: Path;
  defaultValue: T;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  updater?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue: T;
    remove: StateXRemover;
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
}

export interface StateXHolder<T> {
  setter: Setter;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue?: T;
    remove: StateXRemover;
    set: StateXSetter;
    value: T;
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
  oldSelectorValue?: T;
  unregisterMap: Map<Node<NodeData<T>>, () => void>;
  previousNodes: Set<Node<NodeData<T>>>;
}

// export function hasStateX<T>(node: NodeData<T>): node is NodeDataWithStateX<T> {
//   return node.atom !== undefined;
// }

// export function hasSelector<T>(
//   node: NodeData<T>,
// ): node is NodeDataWithSelector<T> {
//   return node.selector !== undefined;
// }

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
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue?: T;
    remove: StateXRemover;
    set: StateXSetter;
    value: T;
  }) => void;
}

export type UIType = 'text' | 'email' | 'password' | 'number';

export interface UIStateXOptions<T> extends StateXOptions<T> {
  type?: UIType;
  debounce?: number;
}

export type Dispatch<T> = (value: SetStateAction<T>) => T;

export type StateXGetter = <T>(
  pathOrAtom: PathOrStateXOrSelector<T>,
  props?: Options,
) => T;

export type StateXActivePathsGetter = (path: Path) => Path[];

export type StateXActionCaller = <T = void>(
  action: Action<T>,
  value: T,
) => void;

export type StateXSetter = <V>(
  path: PathOrStateXOrSelector<V>,
  value: SetStateAction<V>,
  options?: Options,
) => V;

export type StateXRefGetter = <T>(
  path: Path,
) => MutableRefObject<T> | undefined;

export type StateXRemover = <V>(path: PathOrStateX<V>, options?: Options) => V;

export type Select<T> = (props: {
  call: StateXActionCaller;
  get: StateXGetter;
  getRef: StateXRefGetter;
  params?: Record<string, Key>;
  remove: StateXRemover;
  set: StateXSetter;
}) => T | Promise<T>;

export type Write<T> = (
  props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    params?: Record<string, Key>;
    remove: StateXRemover;
    set: StateXSetter;
    value: T;
  },
  value: T,
) => T;

export class Resolvable<T> {
  status: 'pending' | 'resolved' | 'error';
  error?: Error;
  promise?: Promise<T>;
  value?: T;
  cancelled: boolean = false;
  selectorNode: Node<NodeData<T>>;
  self: boolean;
  readonly isDefault: boolean;

  constructor(
    selectorNode: Node<NodeData<T>>,
    self: boolean,
    isDefault = false,
  ) {
    this.selectorNode = selectorNode;
    this.status = 'pending';
    this.self = self;
    this.isDefault = isDefault;
  }

  clone = () => {
    const resolvable = new Resolvable(
      this.selectorNode,
      this.self,
      this.isDefault,
    );
    resolvable.value = this.value;
    resolvable.status = this.status;
    resolvable.promise = this.promise;
    resolvable.error = this.error;
    resolvable.cancelled = this.cancelled;
    return resolvable;
  };

  static withValue<T>(
    selectorNode: Node<NodeData<T>>,
    value: T,
    isDefault = false,
  ) {
    const resolvable = new Resolvable(selectorNode, true, isDefault);
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

export interface StateChangeListenerPropsInternal<T> {
  state: T;
  oldState?: T;
  updatedNodes: Node<NodeData<T>>[];
  removedNodes: Node<NodeData<T>>[];
}

export type StateChangeListenerInternal = (
  props: StateChangeListenerPropsInternal<any>,
) => void;

export interface StateChangeListenerProps<T> {
  state: T;
  oldState?: T;
  updatedPaths: Path[];
  removedPaths: Path[];
}

export type StateChangeListener = (
  props: StateChangeListenerProps<any>,
) => void;

export type SchedulerFn = (value: []) => void;
