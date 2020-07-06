/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type Key = string | number;

export type Path = Key[];

export type ArrayCollection = (string | number)[] | Collection[];

export type ObjectCollection = {
  [key: string]: Collection | string | number | null | undefined | Collection[];
};

export type Collection = ArrayCollection | ObjectCollection;

export function toCollection(value: unknown, msg: string): Collection {
  if (value !== null && (Array.isArray(value) || typeof value === 'object')) {
    return value as Collection;
  }
  throw Error(msg);
}

export function isArrayCollection(value: unknown): value is ArrayCollection {
  return value !== null && Array.isArray(value);
}

export function isObjectCollection(value: unknown): value is ObjectCollection {
  return value && !Array.isArray(value) && typeof value === 'object';
}

export function isCollection(value: unknown): value is Collection {
  return isArrayCollection(value) || isObjectCollection(value);
}

export function isNull(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isPath(path: any): path is Path {
  return Array.isArray(path);
}
