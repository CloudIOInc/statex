"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.updateIn = exports.setMutate = exports.update = exports.setIn = exports.set = exports.removeIn = exports.remove = exports.insertIn = exports.insert = exports.hasIn = exports.has = exports.getIn = exports.get = void 0;
var ImmutableTypes_1 = require("./ImmutableTypes");
var _mutate = true;
function setMutate(m) {
    _mutate = m;
}
exports.setMutate = setMutate;
function shallowCopy(collection) {
    if (Array.isArray(collection)) {
        return __spreadArrays(collection);
    }
    return __assign({}, collection);
}
function arraySet(collection, key, value) {
    if (collection[key] === value) {
        return collection;
    }
    // allow empty top rows. used for errors... if the 2nd line has error
    // we should be able to set the 2nd row as the 1st row will be missing if no errors
    // if (key > collection.length) {
    //   throw Error(`Index out of bound! Index ${key}. Size ${collection.length}.`);
    // }
    if (_mutate && !Object.isFrozen(collection)) {
        collection[key] = value;
        return collection;
    }
    if (key === collection.length) {
        return __spreadArrays(collection, [value]);
    }
    else {
        var copy = shallowCopy(collection);
        copy[key] = value;
        return copy;
    }
}
function objectSet(collection, key, value) {
    var _a;
    // @ts-ignore
    if (collection[key] === value) {
        return collection;
    }
    if (_mutate && !Object.isFrozen(collection)) {
        // @ts-ignore
        collection[key] = value;
        return collection;
    }
    return __assign(__assign({}, collection), (_a = {}, _a[key] = value, _a));
}
function update(collection, key, updater) {
    if (ImmutableTypes_1.isArrayCollection(collection)) {
        if (typeof key === 'number') {
            return arraySet(collection, key, updater(collection.length > key ? collection[key] : null));
        }
        else {
            throw Error("Invalid key " + String(key) + ". Must be of type number.");
        }
    }
    if (ImmutableTypes_1.isObjectCollection(collection)) {
        return objectSet(collection, key, updater(collection[key]));
    }
    return collection;
}
exports.update = update;
function set(collection, key, value) {
    return update(collection, key, function () { return value; });
}
exports.set = set;
function get(collection, key) {
    if (ImmutableTypes_1.isArrayCollection(collection)) {
        if (typeof key === 'number') {
            if (collection.length > key) {
                return collection[key];
            }
            return undefined;
        }
        else {
            throw Error("Invalid key " + key + ". Must be of type number.");
        }
    }
    if (ImmutableTypes_1.isObjectCollection(collection)) {
        return collection[key];
    }
    return null;
}
exports.get = get;
function getInInternal(collection, path, pathIndex) {
    var key = path[pathIndex];
    if (path.length === pathIndex + 1) {
        return get(collection, key);
    }
    var oldNestedValue = get(collection, key);
    if (ImmutableTypes_1.isNull(oldNestedValue)) {
        return null;
    }
    if (!ImmutableTypes_1.isObjectCollection(oldNestedValue)) {
        console.log(collection, path, pathIndex);
        throw Error("Invalid path " + JSON.stringify(path) + " at index " + pathIndex + ". Must be an object. Instead found " + oldNestedValue);
    }
    return getInInternal(oldNestedValue, path, pathIndex + 1);
}
function getIn(collection, path, defaultValue) {
    var value = getInInternal(collection, path, 0);
    if (ImmutableTypes_1.isNull(value)) {
        return defaultValue;
    }
    return value;
}
exports.getIn = getIn;
function has(collection, key) {
    var value;
    if (ImmutableTypes_1.isArrayCollection(collection)) {
        if (typeof key === 'number') {
            return collection.hasOwnProperty(key);
        }
        else {
            throw Error("Invalid key " + key + ". Must be of type number.");
        }
    }
    else if (ImmutableTypes_1.isObjectCollection(collection)) {
        return collection.hasOwnProperty(key);
    }
    return value !== null && value !== undefined;
}
exports.has = has;
function hasInInternal(collection, path, pathIndex) {
    var key = path[pathIndex];
    if (path.length === pathIndex + 1) {
        return has(collection, key);
    }
    var oldNestedValue = get(collection, key);
    if (ImmutableTypes_1.isNull(oldNestedValue)) {
        return false;
    }
    if (!ImmutableTypes_1.isObjectCollection(oldNestedValue)) {
        throw Error("Invalid path " + JSON.stringify(path) + " at index " + pathIndex + ". Must be an object.");
    }
    return hasInInternal(oldNestedValue, path, pathIndex + 1);
}
function hasIn(collection, path) {
    return hasInInternal(collection, path, 0);
}
exports.hasIn = hasIn;
function insert(collection, key, updater) {
    if (ImmutableTypes_1.isArrayCollection(collection)) {
        if (key < collection.length) {
            var left = collection.slice(0, key);
            var right = collection.slice(key);
            return __spreadArrays(left, [updater(collection[key])], right);
        }
        else if (key === collection.length) {
            return __spreadArrays(collection, [updater(null)]);
        }
        throw Error("Index out of bound! Index " + key + ". Size " + collection.length + ".");
    }
    throw Error("insert called on invalid collection. collection must be of type Array.");
}
exports.insert = insert;
function updateInInternal(collection, path, pathIndex, updater, performInsert) {
    if (path.length === 0 && pathIndex === 0) {
        return updater(collection);
    }
    var key = path[pathIndex];
    if (path.length === pathIndex + 1) {
        try {
            if (performInsert) {
                if (typeof key === 'number' && ImmutableTypes_1.isArrayCollection(collection)) {
                    return insert(collection, key, updater);
                }
                throw Error("insertIn called on invalid collection. \n          leaf collection must be of type Array \n          & leaf path must be a number.");
            }
            return update(collection, key, updater);
        }
        catch (e) {
            throw Error(e.message + " Path: " + JSON.stringify(path) + ".");
        }
    }
    var oldNestedValue;
    try {
        oldNestedValue = get(collection, key);
    }
    catch (e) {
        throw Error(e.message + " Path: " + JSON.stringify(path) + " at index " + pathIndex + ".");
    }
    var nestedValue;
    if (ImmutableTypes_1.isNull(oldNestedValue)) {
        if (typeof path[pathIndex + 1] === 'number') {
            nestedValue = [];
        }
        else {
            nestedValue = {};
        }
    }
    else {
        if (!ImmutableTypes_1.isObjectCollection(oldNestedValue)) {
            throw Error("Invalid path " + JSON.stringify(path) + " at index " + pathIndex + ". Must be an object.");
        }
        nestedValue = oldNestedValue;
    }
    nestedValue = updateInInternal(nestedValue, path, pathIndex + 1, updater, performInsert);
    if (nestedValue === oldNestedValue) {
        return collection;
    }
    try {
        return set(collection, key, nestedValue);
    }
    catch (e) {
        throw Error(e.message + " Path: " + JSON.stringify(path) + " at index " + pathIndex + ".");
    }
}
function updateIn(collection, path, updater) {
    var copy = updateInInternal(collection, path, 0, updater, false);
    return copy;
}
exports.updateIn = updateIn;
function setIn(collection, path, value) {
    return updateIn(collection, path, function () { return value; });
}
exports.setIn = setIn;
function insertIn(collection, path, value) {
    return updateInInternal(collection, path, 0, function () { return value; }, true);
}
exports.insertIn = insertIn;
function remove(collection, key) {
    if (has(collection, key)) {
        if (ImmutableTypes_1.isArrayCollection(collection)) {
            if (typeof key === 'number') {
                return __spreadArrays(collection.slice(0, key), collection.slice(key + 1));
            }
            else {
                throw Error("Invalid key " + key + ". Must be of type number.");
            }
        }
        var copy = shallowCopy(collection);
        if (ImmutableTypes_1.isObjectCollection(copy)) {
            delete copy[key];
            return copy;
        }
    }
    return collection;
}
exports.remove = remove;
function removeInInternal(collection, path, pathIndex) {
    var key = path[pathIndex];
    if (path.length === pathIndex + 1) {
        return remove(collection, key);
    }
    var oldNestedValue = get(collection, key);
    var nestedValue;
    if (oldNestedValue === null || oldNestedValue === undefined) {
        return collection;
    }
    else {
        nestedValue = ImmutableTypes_1.toCollection(oldNestedValue, "Invalid path " + JSON.stringify(path) + " at index " + pathIndex + ". Must be an object.");
    }
    nestedValue = removeInInternal(nestedValue, path, pathIndex + 1);
    if (nestedValue === oldNestedValue) {
        return collection;
    }
    return set(collection, key, nestedValue);
}
function removeIn(collection, path) {
    return removeInInternal(collection, path, 0);
}
exports.removeIn = removeIn;
