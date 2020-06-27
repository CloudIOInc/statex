/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useStateXSnapshotSetter, Path, StateChangeListenerProps } from '../..';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { getNode } from '../../core/StateX';
import UndoRedo from './UndoRedo';
import { useStateXStore } from '../../core/StateXContext';
import { useStateXSnapshotCallback } from '../../core/StateXHooks';

function samePaths(newPaths: Path[], oldPaths: Path[]): boolean {
  if (oldPaths.length !== newPaths.length) {
    return false;
  }
  for (let i = 0; i < oldPaths.length; i++) {
    if (oldPaths[i] !== newPaths[i]) {
      return false;
    }
  }
  return true;
}

export default function useStateXUndo(
  path: Path = [],
  hash: string = '#',
  auto: boolean = false,
) {
  const store = useStateXStore();
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

  const undoRedo = useMemo(
    () =>
      new UndoRedo({
        onChange: (hash, state) => {
          ref.current.state = state;
          ref.current.updatedPaths = [];
          ref.current.removedPaths = [];

          setSnapshot(state, nodeRef.current.path);
          setCanUndo(undoRedo.canUndo(hash));
          setCanRedo(undoRedo.canRedo(hash));
        },
      }),
    [nodeRef, setSnapshot],
  );

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
    if (currentRef.current.state) {
      undoRedo.add(hashRef.current, currentRef.current.state);
      updateState();
    }
  }, [undoRedo, updateState]);

  const updateToUndo = useCallback(() => {
    if (currentRef.current.state) {
      undoRedo.update(hashRef.current, currentRef.current.state);
    }
  }, [undoRedo]);

  useStateXSnapshotCallback(
    node.path,
    ({ state, oldState, updatedPaths, removedPaths }) => {
      currentRef.current = { state, oldState, updatedPaths, removedPaths };
      if (state && auto && ref.current.state !== state) {
        if (
          removedPaths.length === 0 &&
          samePaths(updatedPaths, ref.current.updatedPaths)
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
  );

  return {
    addToUndo,
    canRedo,
    canUndo,
    redo,
    reset,
    undo,
    updateToUndo,
  };
}
