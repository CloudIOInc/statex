/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useStateXSnapshotSetter, Path, getIn } from '../..';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { getNode } from '../../core/StateX';
import UndoRedo from './UndoRedo';
import { useStateXStore } from '../../core/StateXContext';
import { StateX } from '../../core/StateXStore';

interface UndoCache {
  path: Path;
  hash: string;
  undoRedo: UndoRedo<any>;
  updateState: () => void;
}

function deleteFromUndoCache(store: StateX, { path: undoRedoPath }: UndoCache) {
  let undoCache = store.getPluginData<UndoCache[] | undefined>('UndoCache');
  if (undoCache) {
    undoCache = undoCache.filter(
      (v) => v.path.join('.') === undoRedoPath.join('.'),
    );
    store.setPluginData('UndoCache', undoCache);
  }
}

function addToUndoCache(
  store: StateX,
  { path, hash, undoRedo, updateState }: UndoCache,
) {
  let undoCache = store.getPluginData<UndoCache[] | undefined>('UndoCache');
  if (!undoCache) {
    undoCache = [];
  }
  undoCache = undoCache.filter((v) => v.path.join('.') === path.join('.'));
  undoCache.push({
    path,
    hash,
    undoRedo,
    updateState,
  });
  store.setPluginData('UndoCache', undoCache);
}

export function useStateXUndo(
  path: Path = [],
  hash: string = '#',
  limit: number = 200,
) {
  const store = useStateXStore();
  const node = getNode(store, path);
  const setSnapshot = useStateXSnapshotSetter();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const hashRef = useRef(hash);
  hashRef.current = hash;
  const nodeRef = useRef(node);
  nodeRef.current = node;

  const undoRedo = useMemo(() => {
    return new UndoRedo({
      onChange: (hash, state) => {
        setSnapshot(state, nodeRef.current.path);
        setCanUndo(undoRedo.canUndo(hash));
        setCanRedo(undoRedo.canRedo(hash));
      },
    });
  }, [setSnapshot]);

  useEffect(() => {
    undoRedo.setLimit(limit);
  }, [undoRedo, limit]);

  const updateState = useCallback(() => {
    setCanUndo(undoRedo.canUndo(hashRef.current));
    setCanRedo(undoRedo.canRedo(hashRef.current));
  }, [hashRef, undoRedo]);

  useEffect(() => {
    addToUndoCache(store, {
      path: node.path,
      hash,
      undoRedo,
      updateState,
    });
    return () =>
      deleteFromUndoCache(store, {
        path: node.path,
        hash,
        undoRedo,
        updateState,
      });
  }, [node, store, updateState, undoRedo, hash]);

  useEffect(() => {
    updateState();
  }, [node, hash, updateState]);

  const undo = useCallback(() => {
    if (
      undoRedo.getLength(hashRef.current) === undoRedo.getIndex(hashRef.current)
    ) {
      const initialState = getIn(store.getState(), node.path, {});
      undoRedo.add(hashRef.current, initialState);
      undoRedo.undo(hashRef.current);
    }
    undoRedo.undo(hashRef.current);
  }, [hashRef, undoRedo, node]);

  const redo = useCallback(() => {
    undoRedo.redo(hashRef.current);
  }, [undoRedo]);

  const clear = useCallback(() => {
    undoRedo.clear(hashRef.current);
    updateState();
  }, [undoRedo, updateState]);

  const isEmpty = useCallback(() => {
    return undoRedo.isEmpty(hashRef.current);
  }, [undoRedo]);

  return {
    isEmpty,
    canRedo,
    canUndo,
    clear,
    redo,
    undo,
  };
}

function addToUndo(store: StateX, childPath: Path) {
  const childNode = getNode(store, childPath);
  const undoCache = store.getPluginData<UndoCache[]>('UndoCache');
  undoCache.forEach(({ path, undoRedo, hash, updateState }) => {
    if (store.trie().isThisOrChildNode(path, childNode)) {
      const undoState = getIn(store.getState(), path, {});
      undoRedo.add(hash, undoState);
      updateState();
    }
  });
}

export function useStateXAddToUndo() {
  const store = useStateXStore();
  return useCallback((childPath: Path) => {
    const childNode = getNode(store, childPath);
    addToUndo(store, childNode.path);
  }, []);
}
