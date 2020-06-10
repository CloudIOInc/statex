/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { deepFreeze, setMutateStateX, emptyFunction } from './StateXUtils';
import { NodeData, StateXHolder, Path } from './StateXTypes';
import Trie, { Node } from './Trie';
import { Collection } from './ImmutableTypes';
import { inform } from './StateX';
import { setIn, setMutate, getIn, removeIn } from './ImmutableUtils';
import { SetStateAction } from 'react';

function notInAContext(): any {
  throw new Error(
    'This component must be used inside a <StateXProvider> component.',
  );
}

interface Log {
  log: string;
  ts: number;
  id: number;
  action?: string;
}

export class StateX {
  _trie = new Trie<NodeData<any>>(() => ({
    holders: new Set<StateXHolder<any>>(),
    defaultValue: undefined,
  }));
  activeNodes = new Map<Node<NodeData<any>>, number>();
  mutatedNodes = new Set<Node<NodeData<any>>>();
  batching = false;
  pending: Path[] = [];
  state: Collection;
  updateSchedule: () => void = notInAContext;
  renderSchedule: () => void = notInAContext;
  postUpdateSchedule: () => void = notInAContext;
  postRenderSchedule: () => void = notInAContext;
  id = 0;
  lastLogItem: Log | undefined;
  rendering = false;
  handleError: (error: any) => void;

  constructor(
    initialState: Collection = {},
    handleError: (error: any) => void = emptyFunction,
  ) {
    this.state = deepFreeze(initialState);
    this.handleError = handleError;
  }

  catch(error: any) {
    this.handleError(error);
  }

  afterSelectorGet(node: Node<NodeData<any>>) {}
  afterSelectorSet(node: Node<NodeData<any>>) {}
  beforeSelectorGet(node: Node<NodeData<any>>) {}
  beforeSelectorSet(node: Node<NodeData<any>>) {}
  beforeShouldComponentUpdate(node: Node<NodeData<any>>) {}
  afterShouldComponentUpdate(node: Node<NodeData<any>>) {}
  beforeOnChange(node: Node<NodeData<any>>) {}
  afterOnChange(node: Node<NodeData<any>>) {}
  beforeAtomOnChange(node: Node<NodeData<any>>) {}
  afterAtomOnChange(node: Node<NodeData<any>>) {}
  beforeAtomUpdater(node: Node<NodeData<any>>) {}
  afterAtomUpdater(node: Node<NodeData<any>>) {}
  updatingState(node: Node<NodeData<any>>) {}
  readingState(node: Node<NodeData<any>>) {}
  removingState(node: Node<NodeData<any>>) {}

  afterSelectorReads() {
    if (this.activeNodes.size) {
      if (process.env.NODE_ENV === 'development') {
        const log = ['Derived nodes during render...'];
        this.activeNodes.forEach((count, node) =>
          log.push(node.path.join('.')),
        );
        this.debug(log.join(', '), 'render');
      }
      // clear all active read nodes
      this.activeNodes.clear();
    }
    this.lastLogItem = undefined;
    setMutateStateX(true);
  }

  renderingStarted() {
    this.rendering = true;
  }

  renderingCompleted() {
    this.rendering = false;
  }

  afterStateUpdates() {
    if (this.activeNodes.size) {
      if (process.env.NODE_ENV === 'development') {
        const log = ['Changed Nodes during update...'];
        this.activeNodes.forEach((count, node) =>
          log.push(node.path.join('.')),
        );
        this.debug(log.join(', '), 'event');
      }
      // clear all active nodes
      this.activeNodes.clear();
    }
    this.renderSchedule();
    this.postRenderSchedule();
    this.processTrackedMutates();
    inform(this);
  }

  debug(log: string, action?: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      const logItem = { log, id: ++this.id, ts: performance.now(), action };
      const ms = this.lastLogItem
        ? Math.round(logItem.ts - this.lastLogItem.ts)
        : 0;
      if (data !== undefined) {
        console.debug(
          logItem.id,
          `${action} => ${log}${ms ? ` - ${ms}ms` : ''}`,
          data,
        );
      } else {
        console.debug(
          logItem.id,
          `${action} => ${log}${ms ? ` - ${ms}ms` : ''}`,
        );
      }
      this.lastLogItem = logItem;
    }
  }

  activateNode(node: Node<NodeData<any>>, action: string, data?: any) {
    let count = this.activeNodes.get(node) ?? 0;
    if (count > 10) {
      throw Error(
        `Trying to ${action} $${node.path.join('.')} too many times!`,
      );
    }
    this.activeNodes.set(node, ++count);
    switch (action) {
      case 'read':
        this.renderSchedule();
        this.postRenderSchedule();
        break;
      default:
        this.updateSchedule();
        this.postUpdateSchedule();
        if (this.rendering) {
          const log = `WARNING: Trying to ${action} $${node.path.join(
            '.',
          )} during render!`;
          this.debug(log, action);
        }
        break;
    }
  }

  addToPending(path: Path, action: string) {
    this.pending.push(path);
    this.updateSchedule();
    this.postUpdateSchedule();
  }

  trie() {
    return this._trie;
  }
  startBatch() {
    this.batching = true;
  }
  endBatch() {
    this.batching = false;
  }
  isBatching() {
    return this.batching;
  }

  clearPending() {
    this.pending = [];
  }
  getPendingPaths() {
    return this.pending;
  }
  getState() {
    return this.state;
  }
  setState(newState: Collection) {
    this.state = newState;
  }
  registerPreUpdateScheduler = (fn: () => void) => {
    this.updateSchedule = fn;
  };
  registerPreRenderScheduler = (fn: () => void) => {
    this.renderSchedule = fn;
  };
  registerPostUpdateScheduler = (fn: () => void) => {
    this.postUpdateSchedule = fn;
  };
  registerPostRenderScheduler = (fn: () => void) => {
    this.postRenderSchedule = fn;
  };
  trackAndMutate<T>(node: Node<NodeData<T>>, value: SetStateAction<T>) {
    if (node.parent) {
      this.mutatedNodes.add(node.parent);
    }
    setMutate(true);
    this.setState(setIn(this.getState(), node.path, value));
    setMutate(false);
  }

  trackAndRemove<T>(node: Node<NodeData<T>>) {
    if (node.parent) {
      this.mutatedNodes.add(node.parent);
    }
    setMutate(true);
    this.setState(removeIn(this.getState(), node.path));
    setMutate(false);
  }

  processTrackedMutates() {
    setMutate(false);
    this.mutatedNodes.forEach((node) => {
      let object = getIn(this.getState(), node.path, undefined);
      if (object && typeof object === 'object') {
        if (Array.isArray(object)) {
          object = [...object];
        } else {
          object = { ...object };
        }
        this.setState(setIn(this.getState(), node.path, object));
      }
    });
    this.mutatedNodes.clear();
  }
}
