/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import * as StateX from '@cloudio/statex';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import Playground from '@theme/Playground';
import CodeBlock from '@theme-init/CodeBlock';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const withLiveEditor = (Component) => {
  const WrappedComponent = (props) => {
    const { isClient } = useDocusaurusContext();
    const prismTheme = usePrismTheme();

    if (props.live) {
      return ExecutionEnvironment.canUseDOM ? (
        <StateX.StateXProvider>
          <Playground
            key={isClient}
            scope={{ ...React, ...StateX }}
            theme={prismTheme}
            noInline={true}
            {...props}
          ></Playground>
        </StateX.StateXProvider>
      ) : null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withLiveEditor(CodeBlock);
