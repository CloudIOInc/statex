import React from 'react';
import * as StateX from '@cloudio/statex';
import Playground from '../Playground';

export default function StateXScope({ children, ...props }) {
  return (
    <StateX.StateXProvider>
      <Playground scope={{ ...React, ...StateX }} {...props} />
    </StateX.StateXProvider>
  );
}
