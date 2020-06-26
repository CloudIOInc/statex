/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  ArrayCollection,
  Collection,
  Key,
  ObjectCollection,
  Path,
  toCollection,
  isArrayCollection,
  isObjectCollection,
  isNull,
} from './ImmutableTypes';

function shallowCopy<C>(collection: C): C {
  if (Array.isArray(collection)) {
    return ([...collection] as unknown) as C;
  }
  return { ...collection } as C;
}

function arraySet<T extends ArrayCollection>(
  collection: T,
  key: number,
  value: any,
): T {
  if (collection[key] === value) {
    return collection;
  }
  // allow empty top rows. used for errors... if the 2nd line has error
  // we should be able to set the 2nd row as the 1st row will be missing if no errors
  // if (key > collection.length) {
  //   throw Error(`Index out of bound! Index ${key}. Size ${collection.length}.`);
  // }
  if (key === collection.length) {
    return [...collection, value] as T;
  } else {
    const copy = shallowCopy(collection);
    copy[key] = value;
    return copy;
  }
}

function objectSet<T extends ObjectCollection>(
  collection: T,
  key: Key,
  value: unknown,
): T {
  // @ts-ignore
  if (collection[key] === value) {
    return collection;
  }
  return { ...collection, [key]: value };
}

function update<C>(
  collection: C,
  key: Key,
  updater: (val: unknown) => unknown,
): C {
  if (isArrayCollection(collection)) {
    if (typeof key === 'number') {
      return arraySet(
        collection,
        key,
        updater(collection.length > key ? collection[key] : undefined),
      );
    } else {
      throw Error(`Invalid key ${String(key)}. Must be of type number.`);
    }
  }
  if (isObjectCollection(collection)) {
    return objectSet(collection, key, updater(collection[key]));
  }
  return collection;
}

function set<C>(collection: C, key: Key, value: unknown): C {
  return update(collection, key, () => value);
}

function get(collection: any, key: Key): any {
  if (isArrayCollection(collection)) {
    if (typeof key === 'number') {
      if (collection.length > key) {
        return collection[key];
      }
      return undefined;
    } else {
      throw Error(`Invalid key ${key}. Must be of type number.`);
    }
  }
  if (isObjectCollection(collection)) {
    return collection[key];
  }
  return undefined;
}

function getInInternal(
  collection: any,
  path: Path,
  pathIndex: number,
): unknown {
  if (path.length === 0 && pathIndex === 0) {
    return collection;
  }
  const key = path[pathIndex];
  if (path.length === pathIndex + 1) {
    return get(collection, key);
  }
  const oldNestedValue = get(collection, key);
  if (isNull(oldNestedValue)) {
    return undefined;
  }
  if (!isObjectCollection(oldNestedValue)) {
    console.error(collection, path, pathIndex);
    throw Error(
      `Invalid path ${JSON.stringify(
        path,
      )} at index ${pathIndex}. Must be an object. Instead found ${oldNestedValue}`,
    );
  }
  return getInInternal(oldNestedValue, path, pathIndex + 1);
}

function getIn(collection: any, path: Path, defaultValue: any): any {
  const value = getInInternal(collection, path, 0);
  if (value === undefined) {
    return defaultValue;
  }
  return value;
}

function has(collection: any, key: Key): boolean {
  let value;
  if (isArrayCollection(collection)) {
    if (typeof key === 'number') {
      return collection.hasOwnProperty(key);
    } else {
      throw Error(`Invalid key ${key}. Must be of type number.`);
    }
  } else if (isObjectCollection(collection)) {
    return collection.hasOwnProperty(key);
  }
  return value !== null && value !== undefined;
}

function hasInInternal(
  collection: any,
  path: Path,
  pathIndex: number,
): boolean {
  const key = path[pathIndex];
  if (path.length === pathIndex + 1) {
    return has(collection, key);
  }
  const oldNestedValue = get(collection, key);
  if (isNull(oldNestedValue)) {
    return false;
  }
  if (!isObjectCollection(oldNestedValue)) {
    throw Error(
      `Invalid path ${JSON.stringify(
        path,
      )} at index ${pathIndex}. Must be an object.`,
    );
  }
  return hasInInternal(oldNestedValue, path, pathIndex + 1);
}

function hasIn(collection: any, path: Path): boolean {
  return hasInInternal(collection, path, 0);
}

function insert<C>(
  collection: C,
  key: number,
  updater: (val: unknown) => unknown,
): C {
  if (isArrayCollection(collection)) {
    if (key < collection.length) {
      const left = collection.slice(0, key);
      const right = collection.slice(key);
      return ([...left, updater(collection[key]), ...right] as unknown) as C;
    } else if (key === collection.length) {
      return ([...collection, updater(undefined)] as unknown) as C;
    }
    throw Error(`Index out of bound! Index ${key}. Size ${collection.length}.`);
  }
  throw Error(
    `insert called on invalid collection. collection must be of type Array.`,
  );
}

function updateInInternal<C>(
  collection: C,
  path: Path,
  pathIndex: number,
  updater: (val: unknown) => unknown,
  performInsert: boolean,
): C {
  if (path.length === 0 && pathIndex === 0) {
    return updater(collection) as C;
  }
  const key = path[pathIndex];
  if (path.length === pathIndex + 1) {
    try {
      if (performInsert) {
        if (typeof key === 'number' && isArrayCollection(collection)) {
          return insert(collection, key, updater);
        }
        throw Error(
          `insertIn called on invalid collection. 
          leaf collection must be of type Array 
          & leaf path must be a number.`,
        );
      }
      return update(collection, key, updater);
    } catch (e) {
      throw Error(`${e.message} Path: ${JSON.stringify(path)}.`);
    }
  }
  let oldNestedValue: Collection | null;
  try {
    oldNestedValue = get(collection, key) as Collection;
  } catch (e) {
    throw Error(
      `${e.message} Path: ${JSON.stringify(path)} at index ${pathIndex}.`,
    );
  }

  let nestedValue;
  if (isNull(oldNestedValue)) {
    if (typeof path[pathIndex + 1] === 'number') {
      nestedValue = [];
    } else {
      nestedValue = {};
    }
  } else {
    if (!isObjectCollection(oldNestedValue)) {
      throw Error(
        `Invalid path ${JSON.stringify(
          path,
        )} at index ${pathIndex}. Must be an object.`,
      );
    }
    nestedValue = oldNestedValue;
  }
  nestedValue = updateInInternal(
    nestedValue,
    path,
    pathIndex + 1,
    updater,
    performInsert,
  );
  if (nestedValue === oldNestedValue) {
    return collection;
  }
  try {
    return set(collection, key, nestedValue);
  } catch (e) {
    throw Error(
      `${e.message} Path: ${JSON.stringify(path)} at index ${pathIndex}.`,
    );
  }
}

function updateIn<C>(
  collection: C,
  path: Path,
  updater: (val: unknown) => unknown,
): C {
  const copy: C = updateInInternal(collection, path, 0, updater, false);
  return copy;
}

function setIn<C>(collection: C, path: Path, value: unknown): C {
  return updateIn(collection, path, () => value);
}

function insertIn<C>(collection: C, path: Path, value: unknown): C {
  return updateInInternal(collection, path, 0, () => value, true);
}

function remove<C>(collection: C, key: Key): C {
  if (has(collection, key)) {
    if (isArrayCollection(collection)) {
      if (typeof key === 'number') {
        return ([
          ...collection.slice(0, key),
          ...collection.slice(key + 1),
        ] as unknown) as C;
      } else {
        throw Error(`Invalid key ${key}. Must be of type number.`);
      }
    }
    const copy = shallowCopy(collection);
    if (isObjectCollection(copy)) {
      delete copy[key];
      return copy;
    }
  }
  return collection;
}

function removeInInternal<C>(collection: C, path: Path, pathIndex: number): C {
  const key = path[pathIndex];
  if (path.length === pathIndex + 1) {
    return remove(collection, key);
  }
  const oldNestedValue = get(collection, key);
  let nestedValue: Collection;
  if (isNull(oldNestedValue)) {
    return collection;
  } else {
    nestedValue = toCollection(
      oldNestedValue,
      `Invalid path ${JSON.stringify(
        path,
      )} at index ${pathIndex}. Must be an object.`,
    );
  }
  nestedValue = removeInInternal(nestedValue, path, pathIndex + 1);
  if (nestedValue === oldNestedValue) {
    return collection;
  }
  return set(collection, key, nestedValue);
}

function removeIn<C>(collection: C, path: Path): C {
  return removeInInternal(collection, path, 0);
}

export {
  get,
  getIn,
  has,
  hasIn,
  insert,
  insertIn,
  remove,
  removeIn,
  set,
  setIn,
  update,
  updateIn,
};
