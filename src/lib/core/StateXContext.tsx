/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  useContext,
  MutableRefObject,
  useLayoutEffect,
  useMemo,
} from 'react';
import { setMutateStateX } from './StateXUtils';
import { StateX, notInAContext } from './StateXStore';

const StateXContext = createContext<MutableRefObject<StateX>>({
  current: new StateX(),
});

function useStateXStore(): StateX {
  return useContext(StateXContext).current;
}

function defaultErrorHandler(error: any) {
  console.error('Unhandled Exception!');
  console.error(error);
}

interface StateXPreSchedulerProps {
  registerPreUpdateScheduler: (fn: () => void) => void;
  registerPreRenderScheduler: (fn: () => void) => void;
}
interface StateXPostSchedulerProps {
  registerPostUpdateScheduler: (fn: () => void) => void;
  registerPostRenderScheduler: (fn: () => void) => void;
}
function StateXPreScheduler({
  registerPreUpdateScheduler,
  registerPreRenderScheduler,
}: StateXPreSchedulerProps) {
  const store = useStateXStore();
  store.renderingStarted();

  const [update, setUpdate] = useState([]);
  registerPreUpdateScheduler(() => setUpdate([]));

  const [render, setRender] = useState([]);
  registerPreRenderScheduler(() => setRender([]));

  useLayoutEffect(() => {
    store.renderingCompleted();
  }, [render, store, update]);

  useEffect(() => {
    store.afterStateUpdates();
  }, [store, update]);

  useEffect(() => {
    setMutateStateX(false);
  }, []);

  useEffect(() => {
    return () => {
      registerPreUpdateScheduler(notInAContext);
      registerPreRenderScheduler(notInAContext);
    };
  }, [registerPreRenderScheduler, registerPreUpdateScheduler]);

  return null;
}

function StateXPostScheduler({
  registerPostUpdateScheduler,
  registerPostRenderScheduler,
}: StateXPostSchedulerProps) {
  const store = useStateXStore();

  const [, setUpdate] = useState([]);
  registerPostUpdateScheduler(() => setUpdate([]));

  const [render, setRender] = useState([]);
  registerPostRenderScheduler(() => setRender([]));

  useLayoutEffect(() => {
    // dom events can fire after useLayoutEffect & before useEffect
    store.afterSelectorReads();
  }, [render, store]);

  useEffect(() => {
    setMutateStateX(false);
  }, []);

  useEffect(() => {
    return () => {
      registerPostUpdateScheduler(notInAContext);
      registerPostRenderScheduler(notInAContext);
    };
  }, [registerPostRenderScheduler, registerPostUpdateScheduler]);

  return null;
}

interface Props {
  initialState?: any;
  children: any;
  handleError?: (error: any) => void;
}

function StateXProvider({
  initialState = {},
  handleError = defaultErrorHandler,
  children,
}: Props) {
  const stateX = useMemo(
    () => new StateX(initialState, handleError),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const ref = useRef(stateX);
  useEffect(() => {
    return () => stateX.destroy();
  }, [stateX]);
  return (
    <StateXContext.Provider value={ref}>
      <StateXPreScheduler
        registerPreUpdateScheduler={ref.current.registerPreUpdateScheduler}
        registerPreRenderScheduler={ref.current.registerPreRenderScheduler}
      />
      {children}
      <StateXPostScheduler
        registerPostUpdateScheduler={ref.current.registerPostUpdateScheduler}
        registerPostRenderScheduler={ref.current.registerPostRenderScheduler}
      />
    </StateXContext.Provider>
  );
}

export { useStateXStore, StateXProvider };
