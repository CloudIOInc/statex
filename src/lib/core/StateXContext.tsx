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
import { StateX, notInAContext } from './StateXStore';
import { SchedulerFn } from './StateXTypes';

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
  registerPreUpdateScheduler: (fn: SchedulerFn) => void;
  registerPreRenderScheduler: (fn: SchedulerFn) => void;
}

interface StateXPostSchedulerProps {
  registerPostRenderScheduler: (fn: SchedulerFn) => void;
  registerPostListenerScheduler: (fn: SchedulerFn) => void;
  registerPostUpdateRenderSchedule: (fn: SchedulerFn) => void;
}

const initialArray: [] = [];

function StateXPreScheduler({
  registerPreUpdateScheduler,
  registerPreRenderScheduler,
}: StateXPreSchedulerProps) {
  const store = useStateXStore();
  store.renderingStarted();

  const [update, setUpdate] = useState(initialArray);
  registerPreUpdateScheduler(setUpdate);

  const [render, setRender] = useState(initialArray);
  registerPreRenderScheduler(setRender);

  useLayoutEffect(() => {
    // mark rendering complete during both render & update
    store.renderingCompleted();
  }, [update, render, store]);

  useEffect(() => {
    if (initialArray !== update) {
      store.afterStateUpdates();
    }
  }, [store, update]);

  useEffect(() => {
    return () => {
      registerPreUpdateScheduler(notInAContext);
      registerPreRenderScheduler(notInAContext);
    };
  }, [registerPreRenderScheduler, registerPreUpdateScheduler]);

  return null;
}

function StateXPostScheduler({
  registerPostRenderScheduler,
  registerPostListenerScheduler,
  registerPostUpdateRenderSchedule,
}: StateXPostSchedulerProps) {
  const store = useStateXStore();

  const [render, setRender] = useState(initialArray);
  registerPostRenderScheduler(setRender);

  const [listenerAdded, setListenerAdded] = useState(initialArray);
  registerPostListenerScheduler(setListenerAdded);

  const [updateRender, setUpdateRender] = useState(initialArray);
  registerPostUpdateRenderSchedule(setUpdateRender);

  useLayoutEffect(() => {
    // dom events can fire after useLayoutEffect & before useEffect
    store.afterSelectorReads();
  }, [render, store]);

  useEffect(() => {
    if (initialArray !== updateRender) {
      if (store.getPendingPaths().length) {
        // store changed due to default values
        store.afterStateUpdates();
      } else {
        store.informStateChange();
      }
    }
  }, [updateRender, store]);

  useEffect(() => {
    store.started();
  }, [store]);

  useEffect(() => {
    if (initialArray !== listenerAdded) {
      store.informStateChange();
    }
  }, [listenerAdded, store]);

  useEffect(() => {
    return () => {
      registerPostListenerScheduler(notInAContext);
      registerPostRenderScheduler(notInAContext);
      registerPostUpdateRenderSchedule(notInAContext);
    };
  }, [
    registerPostListenerScheduler,
    registerPostRenderScheduler,
    registerPostUpdateRenderSchedule,
  ]);

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
        registerPostRenderScheduler={ref.current.registerPostRenderScheduler}
        registerPostListenerScheduler={
          ref.current.registerPostListenerScheduler
        }
        registerPostUpdateRenderSchedule={
          ref.current.registerPostUpdateRenderSchedule
        }
      />
    </StateXContext.Provider>
  );
}

export { useStateXStore, StateXProvider };
