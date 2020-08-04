/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  useStateXSnapshotSetter,
  Path,
  StateChangeListenerProps,
  getIn,
} from '../..';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { getNode } from '../../core/StateX';
import UndoRedo from './UndoRedo';
import { useStateXStore } from '../../core/StateXContext';
import {
  useStateXSnapshotCallback,
  useStateXGetter,
} from '../../core/StateXHooks';
import { StateX } from '../../core/StateXStore';
import { StateXGetter } from '../../core/StateXTypes';

type State = Record<string, any>;

function samePaths(
  basePath: Path,
  get: StateXGetter,
  store: StateX,
  state: State,
  oldState: State,
  newPaths: Path[],
  oldPaths: Path[],
): boolean {
  if (oldPaths.length !== newPaths.length) {
    return false;
  }
  for (let i = 0; i < oldPaths.length; i++) {
    if (oldPaths[i] !== newPaths[i]) {
      return false;
    } else if (store.trie().hasChildren(newPaths[i])) {
      // if the node has other child nodes, then we should not update the
      // existing undo state if there is a change in the child keys
      const path = newPaths[i].slice(basePath.length, newPaths[i].length);
      const oldObj = getIn(oldState, path, undefined);
      const obj = getIn(state, path, undefined);
      if (
        typeof oldObj === 'object' &&
        typeof obj === 'object' &&
        Object.keys(oldObj).length !== Object.keys(obj).length
      ) {
        return false;
      }

      if (
        Array.isArray(oldObj) &&
        Array.isArray(obj) &&
        oldObj.length !== obj.length
      ) {
        return false;
      }
    }
  }
  return true;
}

export default function useStateXUndo(
  path: Path = [],
  hash: string = '#',
  auto: boolean = false,
  limit: number = 200,
) {
  const store = useStateXStore();
  const get = useStateXGetter();
  const node = getNode(store, path);
  const currentRef = useRef<StateChangeListenerProps<unknown>>({
    state: undefined,
    updatedPaths: [],
    removedPaths: [],
  });
  const ref = useRef<StateChangeListenerProps<unknown>>({
    state: undefined,
    updatedPaths: [],
    removedPaths: [],
  });

  const setSnapshot = useStateXSnapshotSetter();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const hashRef = useRef(hash);
  hashRef.current = hash;
  const nodeRef = useRef(node);
  nodeRef.current = node;

  const undoRedo = useMemo(() => {
    const ur = new UndoRedo({
      onChange: (hash, state) => {
        ref.current.state = state;
        ref.current.updatedPaths = [];
        ref.current.removedPaths = [];
        setSnapshot(state, nodeRef.current.path);
        setCanUndo(undoRedo.canUndo(hash));
        setCanRedo(undoRedo.canRedo(hash));
      },
    });
    ur.setLimit(limit);
    return ur;
  }, [limit, setSnapshot]);

  const updateState = useCallback(() => {
    setCanUndo(undoRedo.canUndo(hashRef.current));
    setCanRedo(undoRedo.canRedo(hashRef.current));
  }, [hashRef, undoRedo]);

  useEffect(() => {
    updateState();
  }, [node, hash, updateState]);

  const undo = useCallback(() => {
    undoRedo.undo(hashRef.current);
  }, [hashRef, undoRedo]);

  const redo = useCallback(() => {
    undoRedo.redo(hashRef.current);
  }, [undoRedo]);

  const reset = useCallback(() => {
    undoRedo.reset(hashRef.current);
  }, [undoRedo]);

  const addToUndo = useCallback(() => {
    undoRedo.add(hashRef.current, currentRef.current.state);
    updateState();
  }, [undoRedo, updateState]);

  const updateToUndo = useCallback(() => {
    undoRedo.update(hashRef.current, currentRef.current.state);
  }, [undoRedo]);

  const clear = useCallback(() => {
    undoRedo.clear(hashRef.current);
  }, [undoRedo]);

  const isEmpty = useCallback(() => {
    return undoRedo.isEmpty(hashRef.current);
  }, [undoRedo]);

  useStateXSnapshotCallback(
    ({ state, oldState, updatedPaths, removedPaths }) => {
      currentRef.current = { state, oldState, updatedPaths, removedPaths };
      if (state && auto && ref.current.state !== state) {
        if (
          removedPaths.length === 0 &&
          samePaths(
            path,
            get,
            store,
            state as State,
            oldState as State,
            updatedPaths,
            ref.current.updatedPaths,
          )
        ) {
          // same nodes changed... do not update undo history
          updateToUndo();
        } else {
          addToUndo();
        }
        ref.current.updatedPaths = updatedPaths;
        ref.current.removedPaths = removedPaths;
      }
    },
    node.path,
  );

  return {
    addToUndo,
    canRedo,
    canUndo,
    clear,
    isEmpty,
    redo,
    reset,
    undo,
    updateToUndo,
  };
}
