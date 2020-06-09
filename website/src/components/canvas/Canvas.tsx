/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from './Box';
import DragBox from './DragBox';
import { useStateXRef, useStateX, useStateXValueGetter } from '@cloudio/statex';
import { v4 as uuid } from 'uuid';
import { useStateXValue } from '@cloudio/statex';
import { boxSizeAtom } from './Settings';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  canvas: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

interface Item {
  id: string;
  top: number;
  left: number;
}

function getMaxCount(ele: HTMLDivElement, boxSize: number) {
  return Math.floor(
    Math.floor((ele.offsetHeight - 20) / boxSize) *
      Math.floor((ele.offsetWidth - 20) / boxSize),
  );
}

export default function Canvas() {
  const boxSize = useStateXValue(boxSizeAtom);

  const classes = useStyles();
  const canvasRef = useStateXRef<HTMLDivElement>(['ui', 'canvas']);
  const getStateXValue = useStateXValueGetter();
  const [items, setItems] = useStateX<Record<string, Item>>(
    ['root', 'items'],
    {},
    {
      shouldComponentUpdate: (value, oldValue = {}) => {
        return Object.keys(value).length !== Object.keys(oldValue).length;
      },
    },
  );
  const currentCount = Object.keys(items).length;
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const count = getMaxCount(canvasRef.current, boxSize);
    if (currentCount === count) {
      return;
    }
    const width = canvasRef.current.offsetWidth;
    const items: Record<string, Item> = {};
    const cols = Math.floor(width / boxSize);
    Array.from(Array(count).keys()).forEach((idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const item: Item = {
        id: idx + '-' + uuid(),
        left: col * boxSize,
        top: row * boxSize,
      };
      items[item.id] = item;
    });
    setItems(items);
  }, [boxSize, canvasRef, currentCount, setItems]);

  if (!items) {
    throw Error('Missing items!!!');
  }

  if (!canvasRef) return null;

  return (
    <div
      onDoubleClick={() => {
        const path = ['root', 'items', items[Object.keys(items)[10]].id];
        const item = getStateXValue<Item>(path);
        const _items = getStateXValue<Record<string, Item>>(['root', 'items']);
        if (item) {
          setItems({ ..._items, [item.id]: { ...item, left: 0 } });
        }
      }}
      className={classes.root}>
      <DragBox />
      <div className={classes.canvas} ref={canvasRef}>
        {Object.keys(items).map((id) => {
          const item = items[id];
          return <Box key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
