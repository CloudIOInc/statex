import React from 'react';
import { useStateXValue } from '@cloudio/statex';

const StateXViewer = () => {
  const value = useStateXValue([], {});

  return <pre>{JSON.stringify(value, null, ' ')}</pre>;
};

export default StateXViewer;
