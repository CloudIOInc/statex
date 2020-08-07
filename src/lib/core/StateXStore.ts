/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { deepFreeze, emptyFunction, pathToString } from './StateXUtils';
import {
  NodeData,
  Path,
  SchedulerFn,
  StateChangeListenerInternal,
  StateXHolder,
} from './StateXTypes';
import Trie, { Node } from './Trie';
import { Collection } from './ImmutableTypes';
import { inform } from './StateX';
import { setIn, removeIn } from './ImmutableUtils';
import { SetStateAction } from 'react';

export function notInAContext(): any {
  throw Error(
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
  updatedNodes: Node<NodeData<any>>[] = [];
  removedNodes: Node<NodeData<any>>[] = [];
  _lastUpdatedNode?: Node<NodeData<any>>;
  pending: Path[] = [];
  state: Collection;
  _lastKnownState?: Collection;
  updateSchedule: SchedulerFn = notInAContext;
  renderSchedule: SchedulerFn = notInAContext;
  postUpdateRenderSchedule: SchedulerFn = notInAContext;
  postRenderSchedule: SchedulerFn = notInAContext;
  postUpdateSchedule: SchedulerFn = notInAContext;
  postListenerSchedule: SchedulerFn = notInAContext;
  id = 0;
  lastLogItem: Log | undefined;
  rendering = false;
  handleError: (error: any) => void;
  stateChangeListeners = new Set<StateChangeListenerInternal>();
  destroyed = false;
  _nodesToBeRemoved = new Set<Node<NodeData<any>>>();
  _pluginData: Record<string, any> = {};

  constructor(
    initialState: Collection = {},
    handleError: (error: any) => void = emptyFunction,
  ) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      this.state = deepFreeze(initialState);
    } else {
      /* istanbul ignore next */
      this.state = initialState;
    }
    this.handleError = handleError;
  }

  getPluginData<T>(name: string): T {
    return this._pluginData[name];
  }

  setPluginData<T>(name: string, value: T) {
    this._pluginData[name] = value;
  }

  addStateChangeListener(stateChangeListener: StateChangeListenerInternal) {
    this.stateChangeListeners.add(stateChangeListener);
    this.postListenerSchedule([]);
    return () => {
      this.stateChangeListeners.delete(stateChangeListener);
    };
  }

  informStateChange(): boolean {
    this.removeMarkedNodes();
    if (
      this._lastKnownState === this.state ||
      this.stateChangeListeners.size === 0
    ) {
      return false;
    }
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      const log = ['State changed...'];
      const log2: string[] = [];
      if (this.updatedNodes.length) {
        log.push('updates:');
        this.updatedNodes.forEach((node) => log2.push(pathToString(node.path)));
        log.push(log2.join(', '));
      }
      if (this.removedNodes.length) {
        log.push('deletes:');
        this.removedNodes.forEach((node) => log2.push(pathToString(node.path)));
        log.push(log2.join(', '));
      }
      this.debug(log.join(' '), 'state');
    }
    this.stateChangeListeners.forEach((listener) =>
      listener({
        state: this.state,
        oldState: this._lastKnownState,
        updatedNodes: this.updatedNodes,
        removedNodes: this.removedNodes,
      }),
    );
    this._lastKnownState = this.state;
    this.updatedNodes = [];
    this.removedNodes = [];
    return true;
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
  removingState(node: Node<NodeData<any>>) {}

  afterSelectorReads() {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      this.debug('afterSelectorReads', 'render');
    }
    if (this.activeNodes.size) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== 'production') {
        const log = ['Derived nodes during render...'];
        this.activeNodes.forEach((count, node) =>
          log.push(pathToString(node.path)),
        );
        this.debug(log.join(', '), 'render');
      }
      // clear all active read nodes
      this.activeNodes.clear();
    }
    this.lastLogItem = undefined;
    if (this.updatedNodes.length || this.removedNodes.length) {
      // new default values got set during this render
      inform(this);
    }
  }

  renderingStarted() {
    this.rendering = true;
  }

  renderingCompleted() {
    this.rendering = false;
  }

  started() {}

  afterStateUpdates() {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      this.debug('afterStateUpdates', 'update');
    }
    if (this.activeNodes.size) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== 'production') {
        const log = ['Changed Nodes during update...'];
        this.activeNodes.forEach((count, node) =>
          log.push(pathToString(node.path)),
        );
        this.debug(log.join(', '), 'event');
      }
      // clear all active nodes
      this.activeNodes.clear();
    }
    if (this.getPendingPaths().length) {
      inform(this);
      // changed components will re-render. mark rendering start
      // to write to console.warn in scheduleForUpdate if any
      // setter is invoked during render
      this.renderingStarted();
    }
    this.postUpdateRenderSchedule([]);
  }

  /* istanbul ignore next */
  debug(log: string, action?: string, data?: any) {
    if (process.env.NODE_ENV !== 'production') {
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
        `Trying to ${action} ${pathToString(node.path)} too many times!`,
      );
    }
    this.activeNodes.set(node, ++count);
    this.scheduleForUpdate(node, action);
  }

  scheduleForUpdate(node: Node<NodeData<any>>, action: string) {
    switch (action) {
      case 'read':
        this._scheduleRead();
        break;
      default:
        this._scheduleUpdate();
        if (this.rendering) {
          const log = `WARNING: Trying to ${action} ${pathToString(
            node.path,
          )} during render!`;
          console.warn(log, action);
        }
        break;
    }
  }

  addToPendingWithoutSchedule(path: Path, action: string) {
    this.pending.push(path);
  }

  _scheduleRead() {
    this.renderSchedule([]);
    this.postRenderSchedule([]);
  }

  _scheduleUpdate() {
    this.updateSchedule([]);
    this.postUpdateSchedule([]);
  }

  destroy() {
    this.updateSchedule = notInAContext;
    this.renderSchedule = notInAContext;
    this.postRenderSchedule = notInAContext;
    this.postUpdateRenderSchedule = notInAContext;
    this._trie.reset();
    delete this._trie;
    delete this.state;
    this.activeNodes.clear();
    delete this.activeNodes;
    delete this.pending;
    this.destroyed = true;
  }

  addToPending(path: Path, action: string) {
    this.addToPendingWithoutSchedule(path, action);
    this._scheduleUpdate();
  }

  trie() {
    /* istanbul ignore next */
    if (this.destroyed) {
      throw Error('store destroyed!');
    }
    return this._trie;
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
  registerPreUpdateScheduler = (fn: SchedulerFn) => {
    this.updateSchedule = fn;
  };
  registerPreRenderScheduler = (fn: SchedulerFn) => {
    this.renderSchedule = fn;
  };
  registerPostRenderScheduler = (fn: SchedulerFn) => {
    this.postRenderSchedule = fn;
  };
  registerPostUpdateScheduler = (fn: SchedulerFn) => {
    this.postUpdateSchedule = fn;
  };
  registerPostListenerScheduler = (fn: SchedulerFn) => {
    this.postListenerSchedule = fn;
  };
  registerPostUpdateRenderSchedule = (fn: (v: []) => void) => {
    this.postUpdateRenderSchedule = fn;
  };

  selectorInitialized<T>(node: Node<NodeData<T>>) {
    if (this.updatedNodes.indexOf(node) === -1) {
      this.updatedNodes.push(node);
      this.addToPending(node.path, 'init');
    }
  }

  trackAndUpdate<T>(node: Node<NodeData<T>>, value: SetStateAction<T>) {
    this.setState(setIn(this.getState(), node.path, value));
    if (this.updatedNodes.indexOf(node) === -1) {
      this.updatedNodes.push(node);
    }
  }

  updateState<T>(state: T, path: Path) {
    this.setState(setIn(this.getState(), path, state));
    this.postUpdateRenderSchedule([]);
  }

  trackAndRemove<T>(node: Node<NodeData<T>>) {
    this.setState(removeIn(this.getState(), node.path));
    this.removedNodes.push(node);
  }

  markToBeRemoved(node: Node<NodeData<any>>) {
    this._nodesToBeRemoved.add(node);
  }

  removeMarkedNodes() {
    if (this.destroyed || this._nodesToBeRemoved.size === 0) {
      return;
    }
    this._nodesToBeRemoved.forEach((node) => {
      this._trie.removeNode(node);
    });
    this._nodesToBeRemoved.clear();
  }

  enteringNode(node: Node<NodeData<any>>) {
    this._nodesToBeRemoved.delete(node);
  }
}
