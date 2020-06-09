/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, Point } from 'framer-motion';
import { useStateXRefValue } from '@cloudio/statex';

export interface Position {
  top: number;
  height: number;
  width: number;
  left: number;
}

interface Props {
  setPosition: (i: string, pos: Position) => void;
  moveItem: (i: string, y: Point) => void;
  i: string;
  children?: any;
  className?: string;
  left: number;
  top: number;
  dragging?: boolean;
  onDragStart(i: string, info: Point): void;
  onDragEnd(i: string, info: Point): void;
}

export default function Draggable({
  children,
  moveItem,
  i,
  className,
  left,
  top,
  onDragEnd,
  onDragStart,
  dragging: a = false,
}: Props) {
  const canvasRef = useStateXRefValue<HTMLDivElement>(['ui', 'canvas']);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragOriginX = useMotionValue(0);
  const dragOriginY = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [alldone, setAlldone] = useState(true);

  useEffect(() => {
    if (!dragging && !animating) {
      const tid = setTimeout(() => {
        setAlldone(true);
      }, 20);
      return () => clearTimeout(tid);
    } else {
      setAlldone(false);
    }
  }, [animating, dragging]);

  useEffect(() => {
    if (alldone) {
      x.set(left, true);
      y.set(top, true);
    }
  }, [alldone, left, top, x, y]);

  return (
    <motion.div
      key={i}
      className={className}
      //initial={false}
      animate={alldone ? { x: left, y: top } : undefined}
      style={{ x, y, zIndex: alldone ? undefined : 10 }}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      drag
      dragOriginY={dragOriginY}
      dragOriginX={dragOriginX}
      dragConstraints={
        canvasRef && canvasRef.current !== null ? canvasRef : undefined
      }
      onAnimationStart={() => {
        setAnimating(true);
      }}
      onAnimationComplete={() => {
        setAnimating(false);
        onDragEnd(i, { x: x.get(), y: y.get() });
      }}
      dragMomentum={true}
      onDragStart={() => {
        setDragging(true);
        onDragStart(i, { x: x.get(), y: y.get() });
      }}
      onDragEnd={(e, info) => {
        setDragging(false);
      }}
      dragElastic={false}
      onDrag={(e, { point }) => moveItem(i, point)}>
      {children}
    </motion.div>
  );
}
