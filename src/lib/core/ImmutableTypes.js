"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
exports.isPath = exports.isNull = exports.isObjectCollection = exports.isArrayCollection = exports.toCollection = void 0;
function toCollection(value, msg) {
    if (value !== null && (Array.isArray(value) || typeof value === 'object')) {
        return value;
    }
    throw Error(msg);
}
exports.toCollection = toCollection;
function isArrayCollection(value) {
    return value !== null && Array.isArray(value);
}
exports.isArrayCollection = isArrayCollection;
function isObjectCollection(value) {
    return value && typeof value === 'object';
}
exports.isObjectCollection = isObjectCollection;
function isNull(value) {
    return value === null || value === undefined;
}
exports.isNull = isNull;
function isPath(path) {
    return Array.isArray(path);
}
exports.isPath = isPath;
