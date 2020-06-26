/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  useStateXSnapshot,
  useStateXSnapshotSetter,
  Path,
  StateChangeListenerProps,
  Node,
  NodeData,
} from '../..';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { Collection } from '../../core/ImmutableTypes';
import { getNode } from '../../core/StateX';
import UndoRedo from './UndoRedo';
import { useStateXStore } from '../../core/StateXContext';

function sameNodes(
  newNodes: Node<NodeData<any>>[],
  oldNodes: Node<NodeData<any>>[],
): boolean {
  if (oldNodes.length !== newNodes.length) {
    return false;
  }
  for (let i = 0; i < oldNodes.length; i++) {
    if (oldNodes[i] !== newNodes[i]) {
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
  const currentRef = useRef<StateChangeListenerProps>({
    updatedNodes: [],
    removedNodes: [],
  });
  const ref = useRef<StateChangeListenerProps>({
    updatedNodes: [],
    removedNodes: [],
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
      new UndoRedo<Collection>({
        onChange: (hash, state) => {
          ref.current.state = state;
          ref.current.updatedNodes = [];
          ref.current.removedNodes = [];

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

  useStateXSnapshot(
    node.path,
    ({ state, oldState, updatedNodes, removedNodes }) => {
      currentRef.current = { state, oldState, updatedNodes, removedNodes };
      if (state && auto && ref.current.state !== state) {
        if (
          removedNodes.length === 0 &&
          sameNodes(updatedNodes, ref.current.updatedNodes)
        ) {
          // same nodes changed... do not update undo history
          updateToUndo();
        } else {
          addToUndo();
        }
        ref.current.updatedNodes = updatedNodes;
        ref.current.removedNodes = removedNodes;
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
