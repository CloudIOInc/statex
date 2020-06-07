/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import classnames from 'classnames';
import { useStateXValue } from '@cloudio/statex';
import styles from './styles.module.css';
import Accordion from './Accordion';

function Playground({ children, theme, open = false, ...props }) {
  const state = useStateXValue([], {});
  const [expanded, setExpanded] = React.useState(open);

  const transformCode = React.useCallback((code) => {
    return `function App(){${code}}\nrender(<App/>);`;
  }, []);
  return (
    <LiveProvider
      code={children.replace(/\n$/, '')}
      theme={theme}
      {...props}
      transformCode={transformCode}
    >
      <div
        className={classnames(
          styles.playgroundHeader,
          styles.playgroundEditorHeader,
        )}
        onClick={() => setExpanded((e) => !e)}
      >
        StateX Editor{' '}
        {!expanded ? (
          <span style={{ float: 'right' }}>Click to edit this demo</span>
        ) : null}
      </div>
      <Accordion expanded={expanded}>
        <LiveEditor className={styles.playgroundEditor} />
      </Accordion>
      <div
        className={classnames(
          styles.playgroundHeader,
          styles.playgroundPreviewHeader,
        )}
      >
        State
      </div>
      <div className={styles.playgroundPreview}>
        {JSON.stringify(state, null, '  ')}
      </div>
      <div
        className={classnames(
          styles.playgroundHeader,
          styles.playgroundPreviewHeader,
        )}
      >
        Result
      </div>
      <div className={styles.playgroundPreview}>
        <LivePreview />
        <LiveError />
      </div>
    </LiveProvider>
  );
}

export default Playground;
