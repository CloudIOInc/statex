/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState, useRef } from 'react';

interface Props {
  all: boolean;
  show: boolean;
}
export default function Perf({ show, all }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const start = performance.now();
  const ref = useRef(start);
  ref.current = start;

  useEffect(() => {
    const end = performance.now();
    setElapsed(Math.round(end - ref.current));
  }, [show, all]);

  return <div>Elapsed {elapsed}ms</div>;
}
