/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, memo, MutableRefObject } from 'react';
import {
  useStateXSetter,
  useStateXRefValue,
  useStateX,
  useStateXValue,
} from '@cloudio/statex';
import { makeStyles } from '@material-ui/styles';
import Draggable, { Position } from './Draggable';
import cx from 'clsx';
import { Point } from 'framer-motion';
import { boxSizeAtom } from './Settings';

const useStyles = makeStyles({
  root: ({ boxSize }: { boxSize: number }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: boxSize - 10,
    width: boxSize - 10,
    padding: 0,
    margin: 5,
    position: 'absolute',
    display: 'inline-block',
    userSelect: 'none',
  }),
  dragging: {
    background: 'linear-gradient(45deg, #FE1B8B 10%, #FF1E53 90%)',
    zIndex: 9999,
  },
});

interface Props {
  item: Item;
}

interface Item {
  id: string;
  top: number;
  left: number;
  dragging?: boolean;
}

function snap(value: number, gridSize: number) {
  if (gridSize < 4) return value;
  const mod = value % gridSize;
  if (mod >= gridSize / 2) {
    return value + mod + (gridSize - mod);
  }
  return value - mod;
}

const SNAP_SIZE = 0;

function update(
  canvasRef: MutableRefObject<HTMLDivElement | null> | null,
  item: Item,
  point: Point,
  boxSize: number,
): Item {
  const ele = canvasRef?.current;
  if (!ele) {
    return item;
  }
  const { scrollTop, scrollLeft, offsetHeight, offsetWidth } = ele;
  return {
    ...item,
    left: snap(
      Math.max(0, Math.min(offsetWidth + scrollLeft - boxSize - 20, point.x)),
      SNAP_SIZE,
    ),
    top: snap(
      Math.max(0, Math.min(offsetHeight + scrollTop - boxSize - 20, point.y)),
      SNAP_SIZE,
    ),
  };
}

const Box = memo(({ item: initialItem }: Props) => {
  const boxSize = useStateXValue(boxSizeAtom);

  const classes = useStyles({ boxSize });

  const canvasRef = useStateXRefValue<HTMLDivElement>(['ui', 'canvas']);

  const [item, setItem] = useStateX<Item>(
    ['root', 'items', initialItem.id],
    initialItem,
  );
  if (!item) {
    throw Error('Missing item!');
  }
  const set = useStateXSetter();

  const moveItem = useCallback(
    (id: string, point: Point) => {
      if (canvasRef) {
        const newItem = setItem((item) =>
          update(canvasRef, item, point, boxSize),
        );
        if (newItem) {
          set(['root', 'dragItem'], newItem);
        }
      }
    },
    [boxSize, canvasRef, set, setItem],
  );

  const onDragStart = useCallback(
    (id: string, point: Point) => {
      if (canvasRef) {
        const item = setItem((item) => ({
          ...update(canvasRef, item, point, boxSize),
          dragging: true,
        }));
        if (item) {
          set(['root', 'dragItem'], item);
        }
      }
    },
    [boxSize, canvasRef, set, setItem],
  );

  const onDragEnd = useCallback(
    (id: string, point: Point) => {
      if (canvasRef) {
        const item = setItem((item) => ({
          ...update(canvasRef, item, point, boxSize),
          dragging: false,
        }));
        item && set(['root', 'dragItem'], item);
      }
    },
    [boxSize, canvasRef, set, setItem],
  );

  return (
    <Draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      setPosition={(i: string, pos: Position) => {}}
      moveItem={moveItem}
      className={cx(classes.root, item.dragging ? classes.dragging : null)}
      i={item.id}
      {...item}></Draggable>
  );
});

Box.displayName = 'Box';

export default Box;
