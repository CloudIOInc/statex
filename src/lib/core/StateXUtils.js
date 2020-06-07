"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.applyParamsToPath = exports.emptyObject = exports.emptyFunction = exports.isError = exports.isPromise = exports.deepFreeze = exports.shouldFreeze = exports.setMutateStateX = exports.isReactElement = void 0;
var ImmutableTypes_1 = require("./ImmutableTypes");
var StateXTypes_1 = require("./StateXTypes");
var ImmutableUtils_1 = require("./ImmutableUtils");
function isNode(object) {
    var _a, _b;
    if (typeof window === 'undefined') {
        return false;
    }
    var defaultView = (_b = (_a = object.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) !== null && _b !== void 0 ? _b : window;
    return typeof defaultView.Node === 'function'
        ? object instanceof defaultView.Node
        : typeof object === 'object' &&
            typeof object.nodeType === 'number' &&
            typeof object.nodeName === 'string';
}
function isPromise(object) {
    if (object instanceof Promise) {
        return true;
    }
    return typeof object === 'object' && typeof object.then === 'function';
}
exports.isPromise = isPromise;
function isError(object) {
    if (object instanceof Error) {
        return true;
    }
    return false;
}
exports.isError = isError;
function isReactElement(object) {
    // react element check
    switch (typeof object.$$typeof) {
        case 'symbol':
            return true;
        case 'number':
            return true;
    }
    return false;
}
exports.isReactElement = isReactElement;
var _freeze = false;
function setFreeze(m) {
    _freeze = m;
}
function setMutateStateX(mutate) {
    setFreeze(!mutate);
    ImmutableUtils_1.setMutate(mutate);
}
exports.setMutateStateX = setMutateStateX;
function shouldFreeze(object) {
    if (!_freeze) {
        return false;
    }
    if (ImmutableTypes_1.isNull(object) || typeof object !== 'object') {
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
    if (object instanceof StateXTypes_1.Resolvable) {
        console.warn('Resolvable cannot be frozen');
        return false;
    }
    return true;
}
exports.shouldFreeze = shouldFreeze;
function deepFreeze(object) {
    if (typeof object === 'object' && object.current) {
        throw Error('Ref in deepFreeze!!!');
    }
    if (!shouldFreeze(object)) {
        return object;
    }
    var propNames = Object.getOwnPropertyNames(object);
    for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
        var name_1 = propNames_1[_i];
        var value = object[name_1];
        if (!ImmutableTypes_1.isNull(value) && typeof value === 'object') {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}
exports.deepFreeze = deepFreeze;
function emptyFunction() { }
exports.emptyFunction = emptyFunction;
exports.emptyObject = Object.freeze({});
function applyParamsToPath(pathWithParams, params) {
    if (!params || Object.keys(params).length === 0) {
        return pathWithParams;
    }
    var path = __spreadArrays(pathWithParams);
    Object.entries(params).forEach(function (entry) {
        var index = path.indexOf(":" + entry[0]);
        if (index !== -1) {
            path[index] = entry[1];
        }
    });
    var missingParams = path.filter(function (key) { return typeof key === 'string' && key.indexOf(':') !== -1; });
    if (missingParams.length) {
        throw Error("Missing parameter values for " + missingParams.join(', ') + " in path " + JSON.stringify(path) + ". Params passed " + JSON.stringify(params));
    }
    return path;
}
exports.applyParamsToPath = applyParamsToPath;
