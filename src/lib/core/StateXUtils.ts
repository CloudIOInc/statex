/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isNull, Path, Key } from './ImmutableTypes';
import { Resolvable } from './StateXTypes';

function isNode(object: any): boolean {
  if (typeof window === 'undefined') {
    return typeof object === 'object' &&
      typeof object.nodeType === 'number' &&
      typeof object.nodeName === 'string'
      ? true
      : false;
  }

  const defaultView = object.ownerDocument?.defaultView ?? window;
  if (object === defaultView) {
    return true;
  }
  return object instanceof defaultView.Node;
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

export function shouldFreeze(object: any) {
  if (isNull(object) || typeof object !== 'object') {
    return false;
  }
  if (object.hasOwnProperty('current')) {
    return false;
  }

  if (isReactElement(object)) {
    return false;
  }

  if (Object.isFrozen(object)) {
    return false;
  }

  if (isNode(object)) {
    return false;
  }

  if (isPromise(object)) {
    return false;
  }

  if (object instanceof Resolvable) {
    return false;
  }

  return true;
}

function deepFreeze(object: any) {
  if (typeof object === 'object' && object.hasOwnProperty('current')) {
    throw Error('Ref must not be passed to deepFreeze!');
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
  let path: Path;
  if (!params || Object.keys(params).length === 0) {
    path = pathWithParams;
  } else {
    path = [...pathWithParams];
    Object.entries(params).forEach((entry) => {
      const index = path.indexOf(`:${entry[0]}`);
      if (index !== -1) {
        path[index] = entry[1];
      }
    });
  }
  const missingParams = path.filter(
    (key) => typeof key === 'string' && key.charAt(0) === ':',
  );
  if (missingParams.length) {
    throw Error(
      `Missing parameter values for ${missingParams.join(
        ', ',
      )} in path ${JSON.stringify(path)}. ${
        params ? `Params passed ${JSON.stringify(params)}` : 'No params passed!'
      }`,
    );
  }
  return path;
}

export function pathToString(path: Path) {
  return JSON.stringify(path);
}
