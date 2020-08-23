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

export interface SelectorProps<T, P> {
  path: Path;
  defaultValue: T;
  get: Select<T, P>;
  set?: Write<T>;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
}

export type ActionFunction<T> = (
  props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
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
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
    value: T;
  }) => T;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue: T;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
    value: T;
  }) => void;
}

export interface StateXHolder<T, P = void> {
  setter: Setter;
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue?: T;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
    value: T;
  }) => void;
  holding?: boolean;
  node: Node<NodeData<T, P>>;
}

export interface NodeData<T, P = void> {
  atom?: Atom<T>;
  defaultValue: T;
  defaultValueInitialized?: boolean;
  holders: Set<StateXHolder<T, P>>;
  lastKnownValue?: T;
  lastKnownValueInitialized?: boolean;
  ref?: React.RefObject<any>;
  selector?: Selector<T, P>;
  valueRemoved?: boolean;
}

export interface NodeDataWithStateX<T> extends NodeData<T> {
  atom: Atom<T>;
}

export interface NodeDataWithSelector<T, P> extends NodeData<T, P> {
  selector: Selector<T, P>;
  resolveable?: Resolvable<T, P>;
  initialized?: boolean;
  selectorValue?: T;
  oldSelectorValue?: T;
  unregisterMap: Map<Node<NodeData<T, P>>, () => void>;
  previousNodes: Set<Node<NodeData<T, P>>>;
}

// export function hasStateX<T>(node: NodeData<T>): node is NodeDataWithStateX<T> {
//   return node.atom !== undefined;
// }

// export function hasSelector<T>(
//   node: NodeData<T>,
// ): node is NodeDataWithSelector<T> {
//   return node.selector !== undefined;
// }

export function isSelectorNode<T, P = void>(
  node: Node<NodeData<T, P>>,
): node is Node<NodeDataWithSelector<T, P>> {
  return node.data.selector !== undefined;
}

export interface Options<P = void> {
  mutableRefObject?: boolean;
  params?: Record<string, Key>;
  props?: P;
}

export interface StateXOptions<T, P = void> extends Options<P> {
  shouldComponentUpdate?: (value: T, oldValue?: T) => boolean;
  onChange?: (props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    oldValue?: T;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
    value: T;
  }) => void;
}

export type UIType = 'text' | 'email' | 'password' | 'number';

export interface UIStateXOptions<T> extends StateXOptions<T> {
  type?: UIType;
  debounce?: number;
}

export type Dispatch<T> = (value: SetStateAction<T>) => T;

export type StateXGetter = <T, P = void>(
  pathOrAtom: PathOrStateXOrSelector<T, P>,
  props?: Options<P>,
) => T;

export type StateXActivePathsGetter = (path: Path) => Path[];

export type StateXActionCaller = <T = void>(
  action: Action<T>,
  value: T,
) => void;

export type StateXSetter = <V>(
  path: PathOrStateXOrSelector<V, void>,
  value: SetStateAction<V>,
  options?: Options<void>,
) => V;

export type StateXRefGetter = <T>(
  path: Path,
) => MutableRefObject<T> | undefined;

export type StateXRefSetter = <T>(
  path: Path,
  ref: MutableRefObject<T> | undefined,
) => void;

export type StateXRemover = <V>(
  path: PathOrStateX<V>,
  options?: Options<void>,
) => V;

export type StateXReseter = <V>(path: Atom<V>, options?: Options<void>) => V;

export type Select<T, P> = (
  props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    params?: Record<string, Key>;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
  },
  userProps: P,
) => T | Promise<T>;

export type Write<T> = (
  props: {
    call: StateXActionCaller;
    get: StateXGetter;
    getRef: StateXRefGetter;
    params?: Record<string, Key>;
    remove: StateXRemover;
    reset: StateXReseter;
    set: StateXSetter;
    setRef: StateXRefSetter;
    value: T;
  },
  value: T,
) => T;

export class Resolvable<T, P> {
  status: 'pending' | 'resolved' | 'error';
  error?: Error;
  promise?: Promise<T>;
  value?: T;
  cancelled: boolean = false;
  selectorNode: Node<NodeData<T, P>>;
  self: boolean;
  readonly isDefault: boolean;

  constructor(
    selectorNode: Node<NodeData<T, P>>,
    self: boolean,
    isDefault = false,
  ) {
    this.selectorNode = selectorNode;
    this.status = 'pending';
    this.self = self;
    this.isDefault = isDefault;
  }

  clone = () => {
    const resolvable = new Resolvable<T, P>(
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

  static withValue<T, P>(
    selectorNode: Node<NodeData<T, P>>,
    value: T,
    isDefault = false,
  ) {
    const resolvable = new Resolvable<T, P>(selectorNode, true, isDefault);
    resolvable.value = value;
    resolvable.status = 'resolved';
    return resolvable;
  }

  resolveIfSelf = (selectorNode: Node<NodeData<T, P>>): T => {
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

export function isResolvable<T, P = void>(
  value: T | Resolvable<T, P>,
): value is Resolvable<T, P> {
  return value instanceof Resolvable;
}

export interface SelectorInterface<T, P> {
  getValue: (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    options?: Options<P>,
  ) => T | Resolvable<T, P>;
  setValue: (
    store: StateX,
    selectorNode: Node<NodeDataWithSelector<T, P>>,
    value: T,
    options?: Options<P>,
  ) => T;
}

export type PathOrStateX<T> = Path | Atom<T>;

export type PathOrStateXOrSelector<T, P = void> =
  | Path
  | Atom<T>
  | Selector<T, P>;

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
