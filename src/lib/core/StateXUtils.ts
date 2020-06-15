/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isNull, Path, Key } from './ImmutableTypes';
import { Resolvable } from './StateXTypes';
import { setMutate } from './ImmutableUtils';

function isNode(object: any): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const defaultView = object.ownerDocument?.defaultView ?? window;
  return typeof defaultView.Node === 'function'
    ? object instanceof defaultView.Node
    : typeof object === 'object' &&
        typeof object.nodeType === 'number' &&
        typeof object.nodeName === 'string';
}

function isPromise<T>(object: any): object is Promise<T> {
  if (object instanceof Promise) {
    return true;
  }
  return (
    object && typeof object === 'object' && typeof object.then === 'function'
  );
}

function isError(object: any): object is Error {
  if (object instanceof Error) {
    return true;
  }
  return false;
}

export function isReactElement(object: any) {
  // react element check
  switch (typeof object.$$typeof) {
    case 'symbol':
      return true;
    case 'number':
      return true;
  }

  return false;
}

let _freeze = false;

function setFreeze(m: boolean) {
  _freeze = m;
}

export function setMutateStateX(mutate: boolean) {
  setFreeze(!mutate);
  setMutate(mutate);
}

export function shouldFreeze(object: any) {
  if (!_freeze) {
    return false;
  }
  if (isNull(object) || typeof object !== 'object') {
    return false;
  }
  if (object.current) {
    console.warn('ref cannot be frozen');
    return false;
  }
  if (Object.isFrozen(object)) {
    return false;
  }

  if (object instanceof Element || object instanceof Event || isNode(object)) {
    return false;
  }

  if (isReactElement(object)) {
    return false;
  }

  if (isPromise(object)) {
    return false;
  }

  if (object instanceof Resolvable) {
    console.warn('Resolvable cannot be frozen');
    return false;
  }

  return true;
}

function deepFreeze(object: any) {
  if (typeof object === 'object' && object.current) {
    throw Error('Ref in deepFreeze!!!');
  }
  if (!shouldFreeze(object)) {
    return object;
  }
  const propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
    let value = object[name];
    if (!isNull(value) && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

export { deepFreeze, isPromise, isError };

export function emptyFunction() {}

export const emptyObject: Record<any, any> = Object.freeze({});

export function applyParamsToPath(
  pathWithParams: Path,
  params?: Record<string, Key>,
): Path {
  if (!params || Object.keys(params).length === 0) {
    return pathWithParams;
  }
  const path = [...pathWithParams];
  Object.entries(params).forEach((entry) => {
    const index = path.indexOf(`:${entry[0]}`);
    if (index !== -1) {
      path[index] = entry[1];
    }
  });
  const missingParams = path.filter(
    (key) => typeof key === 'string' && key.charAt(0) === ':',
  );
  if (missingParams.length) {
    throw Error(
      `Missing parameter values for ${missingParams.join(
        ', ',
      )} in path ${JSON.stringify(path)}. Params passed ${JSON.stringify(
        params,
      )}`,
    );
  }
  return path;
}
