/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { useStateXValue } from '@cloudio/statex';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: '#000',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 'auto',
    width: 160,
    padding: 12,
    margin: 0,
    position: 'absolute',
    display: 'inline-block',
    userSelect: 'none',
    zIndex: 9999,
    top: 8,
    right: 8,
  },
  pre: {
    background: '#000',
    color: '#fff',
  },
});

interface Item {
  id: number;
  top: number;
  left: number;
  dragging?: boolean;
}

export default function DragBox() {
  const items = useStateXValue<Record<string, Item>>(['root', 'items'], {});
  const classes = useStyles();
  const draggedItems = Object.values(items).filter((item) => item.dragging);

  if (!draggedItems.length) {
    return null;
  }

  return (
    <div
      className={classes.root}
      style={{ top: window.document.documentElement.scrollTop }}>
      {draggedItems.length} moving
      <pre className={classes.pre}>
        {draggedItems
          .map((item) => `${Math.round(item.left)} X ${Math.round(item.top)}`)
          .join('\n')}
      </pre>
    </div>
  );
}
