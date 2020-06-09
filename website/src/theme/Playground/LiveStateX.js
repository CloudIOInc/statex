/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { memo } from 'react';
import clsx from 'clsx';
import { useStateXValue } from '@cloudio/statex';
import styles from './styles.module.css';

function LiveStateX() {
  const state = useStateXValue([], {});

  return (
    <>
      <div
        className={clsx(
          styles.playgroundHeader,
          styles.playgroundPreviewHeader,
        )}>
        State
      </div>
      <div className={styles.playgroundPreview}>
        {JSON.stringify(state, null, '  ')}
      </div>
    </>
  );
}

export default memo(LiveStateX);
