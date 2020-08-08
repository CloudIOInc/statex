/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

class UndoRedo<T> {
  hashHistory: {
    [hash: string]: { history: T[]; index: number };
  } = {};
  limit = 200;
  onChange: (hash: string, state: T) => void;

  constructor(props: { onChange: (hash: string, state: T) => void }) {
    this.onChange = props.onChange;
  }

  _history = (hash: string) => {
    let history = this.hashHistory[hash];
    if (!history) {
      history = { history: [], index: -1 };
      this.hashHistory[hash] = history;
    }
    return history;
  };

  // when adding 1st entry history.length=1, history.index=1
  add = (hash: string, state: T) => {
    const historyWithIndex = this._history(hash);
    const { history, index } = historyWithIndex;
    if (history.length === index || history.length === 0) {
      // never undo
    } else if (history.length - 1 === index) {
      // last redo... remove the last entry which gets add on first undo
      history.splice(index, history.length - index);
    } else {
      // in undo... remove everything from the current undo index
      history.splice(index, history.length - index);
    }

    history.push(state);

    if (this.limit > 0 && history.length > this.limit) {
      history.splice(0, history.length - this.limit);
    }

    historyWithIndex.index = history.length;
  };

  revert = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { history, index } = historyWithIndex;
    if (history.length === index) {
      const state = history.pop() as T;
      historyWithIndex.index = history.length;
      this.onChange(hash, state);
    }
  };

  undo = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { history, index } = historyWithIndex;
    const state = history[index - 1];
    if (!state) {
      return;
    }
    historyWithIndex.index -= 1;
    this.onChange(hash, state);
  };

  redo = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { history, index } = historyWithIndex;
    const state = history[index + 1];
    if (!state) {
      return;
    }
    historyWithIndex.index += 1;
    this.onChange(hash, state);
  };

  clear = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { history } = historyWithIndex;
    if (history.length) {
      historyWithIndex.history = [];
      historyWithIndex.index = -1;
    }
  };

  canUndo = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { index } = historyWithIndex;
    return index > 0;
  };

  canRedo = (hash: string) => {
    const historyWithIndex = this._history(hash);
    const { history, index } = historyWithIndex;
    return index < history.length - 1;
  };

  getIndex = (hash: string) => {
    return this._history(hash).index;
  };

  isEmpty = (hash: string) => {
    return this._history(hash).history.length === 0;
  };

  getLength = (hash: string) => {
    return this._history(hash).history.length;
  };

  setLimit = (limit: number) => {
    this.limit = limit;
  };
}

export default UndoRedo;
