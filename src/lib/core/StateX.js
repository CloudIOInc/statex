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
exports.setStateXValue = exports.removeStateXValue = exports.registerStateX = exports.isResolvable = exports.inform = exports.hasStateXValue = exports.getStateXValue = exports.getNode = exports.enterStateX = exports._getIn = exports.makeSet = exports.makeGet = void 0;
var StateXTypes_1 = require("./StateXTypes");
exports.isResolvable = StateXTypes_1.isResolvable;
var ImmutableUtils_1 = require("./ImmutableUtils");
var StateXUtils_1 = require("./StateXUtils");
var Atom_1 = require("./Atom");
var Selector_1 = require("./Selector");
function _getIn(store, node, value, mutableRefObject) {
    if (mutableRefObject === void 0) { mutableRefObject = true; }
    if (node.path.length === 0) {
        return store.getState();
    }
    var val = ImmutableUtils_1.getIn(store.getState(), node.path, value);
    if (val === undefined) {
        return value;
    }
    if (process.env.NODE_ENV === 'development') {
        return !mutableRefObject && val && typeof val === 'object'
            ? StateXUtils_1.deepFreeze(val)
            : val;
    }
    else {
        return val;
    }
}
exports._getIn = _getIn;
function isNodeDirty(store, node) {
    var value = _getIn(store, node);
    return node.data.lastKnownValue !== value;
}
function getNode(store, path) {
    var missingParams = path.filter(function (key) { return typeof key === 'string' && key.indexOf(':') !== -1; });
    if (missingParams.length) {
        throw Error("Missing parameter values for " + missingParams.join(', ') + " in path " + JSON.stringify(path) + "!");
    }
    return store.trie().getNode(path);
}
exports.getNode = getNode;
function enterStateX(node, stateXHolder) {
    node.data.holders.add(stateXHolder);
    stateXHolder.holding = true;
    return function () {
        stateXHolder.holding = false;
        node.data.holders["delete"](stateXHolder);
    };
}
exports.enterStateX = enterStateX;
function getDirtyNodes(store) {
    var nodes = new Set();
    var length;
    var node;
    var parentNode;
    var j;
    store.getPendingPaths().forEach(function (path) {
        node = store.trie().getNode(path);
        if (!isNodeDirty(store, node)) {
            return;
        }
        nodes.add(node);
        var dirtyChildren = store
            .trie()
            .getAllChildNodes(path, function (node) { return isNodeDirty(store, node); });
        dirtyChildren.forEach(nodes.add, nodes);
        var parentNodes = store.trie().getAllParentNodes(path);
        length = parentNodes.length;
        for (j = 0; j < length; j++) {
            parentNode = parentNodes[j];
            if (!nodes.has(parentNode)) {
                nodes.add(parentNode);
            }
            else {
                // parents already exists
                break;
            }
        }
    });
    return nodes;
}
function inform(store) {
    var nodes = getDirtyNodes(store);
    store.clearPending();
    if (nodes.size === 0) {
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        store.debug('Found ' + nodes.size + ' dirty nodes...', 'inform');
        // nodes.forEach((n) => store.debug(n.path.join('.'), 'inform'));
    }
    var total = 0;
    nodes.forEach(function (node) {
        if (!StateXTypes_1.isSelectorNode(node)) {
            var value_1 = _getIn(store, node);
            var _a = node.data, lastKnownValue_1 = _a.lastKnownValue, holders = _a.holders, atom = _a.atom;
            var resolvable_1 = StateXTypes_1.isResolvable(lastKnownValue_1) && lastKnownValue_1.status === 'pending';
            if (value_1 !== lastKnownValue_1) {
                node.data.lastKnownValue = value_1;
                if (resolvable_1 ||
                    !(atom === null || atom === void 0 ? void 0 : atom.shouldComponentUpdate) ||
                    atom.shouldComponentUpdate(value_1, lastKnownValue_1)) {
                    holders.forEach(function (holder) {
                        if (holder.holding) {
                            var shouldUpdate = true;
                            if (holder.shouldComponentUpdate) {
                                store.beforeShouldComponentUpdate(holder.node);
                                shouldUpdate = holder.shouldComponentUpdate(value_1, lastKnownValue_1);
                                store.afterShouldComponentUpdate(holder.node);
                            }
                            if (resolvable_1 || shouldUpdate) {
                                total++;
                                holder.setter(resolvable_1 ? resolvable_1 : value_1);
                            }
                            if (!resolvable_1) {
                                // Do we need to call onChange
                                // if atom.shouldComponentUpdate returns false?
                                if (holder.onChange) {
                                    store.beforeOnChange(holder.node);
                                    holder.onChange({
                                        value: value_1,
                                        oldValue: lastKnownValue_1,
                                        get: makeGet(store),
                                        set: makeSet(store)
                                    });
                                    store.afterOnChange(holder.node);
                                }
                            }
                        }
                    });
                }
                if (atom === null || atom === void 0 ? void 0 : atom.onChange) {
                    store.beforeAtomOnChange(node);
                    atom.onChange({
                        value: value_1,
                        oldValue: lastKnownValue_1,
                        get: makeGet(store),
                        set: makeSet(store)
                    });
                    store.afterAtomOnChange(node);
                }
            }
        }
    });
    if (process.env.NODE_ENV === 'development') {
        store.debug('Triggered re-render for ' + total + ' components...');
    }
}
exports.inform = inform;
function isSetStateActionValue(value) {
    return typeof value !== 'function';
}
function _removeIn(store, path) {
    var node = store.trie().getNode(path);
    store.activateNode(node, 'remove');
    var oldValue = _getIn(store, node);
    node.data.lastKnownValue = oldValue;
    store.removingState(node);
    store.setState(ImmutableUtils_1.removeIn(store.getState(), path));
    if (node.parent) {
        store.addToPending(node.parent.path, 'remove-child');
    }
    store.trie().removeNode(node);
    return oldValue;
}
function _setIn(store, node, value, options) {
    var _a;
    store.activateNode(node, 'update', value);
    var newValue;
    var returnValue;
    if (StateXTypes_1.isSelectorNode(node)) {
        returnValue = node.data.selector.setValue(store, node, value, options);
    }
    else {
        var oldValue = _getIn(store, node);
        if (isSetStateActionValue(value)) {
            newValue = value;
        }
        else {
            newValue = value(oldValue);
        }
        if (newValue === oldValue) {
            // do nothing
            return oldValue;
        }
        if (typeof ((_a = node.data.atom) === null || _a === void 0 ? void 0 : _a.updater) === 'function') {
            store.beforeAtomUpdater(node);
            newValue = node.data.atom.updater({
                value: newValue,
                oldValue: oldValue,
                get: makeGet(store),
                set: makeSet(store)
            });
            store.afterAtomUpdater(node);
        }
        if (newValue === oldValue) {
            // do nothing
            return oldValue;
        }
        returnValue = newValue;
        if (process.env.NODE_ENV === 'development') {
            if (!(options === null || options === void 0 ? void 0 : options.mutableRefObject) && StateXUtils_1.shouldFreeze(returnValue)) {
                if (Array.isArray(returnValue)) {
                    newValue = __spreadArrays(returnValue);
                }
                else {
                    newValue = __assign({}, returnValue);
                }
                // do not deepFreeze
                Object.freeze(returnValue);
            }
        }
        store.updatingState(node);
        store.trackAndMutate(node, newValue);
        store.addToPending(node.path, 'update');
    }
    return returnValue;
}
function hasStateXValue(store, path) {
    return _getIn(store, store.trie().getNode(path)) !== undefined;
}
exports.hasStateXValue = hasStateXValue;
function setStateXValue(store, node, value, options) {
    return _setIn(store, node, value, options);
}
exports.setStateXValue = setStateXValue;
function removeStateXValue(store, pathWithParams, options) {
    var path = StateXUtils_1.applyParamsToPath(pathWithParams, options === null || options === void 0 ? void 0 : options.params);
    return _removeIn(store, path);
}
exports.removeStateXValue = removeStateXValue;
function getResolvableStateXValue(store, pathWithParams, options) {
    var _a;
    var _b = options || StateXUtils_1.emptyObject, mutableRefObject = _b.mutableRefObject, params = _b.params;
    var path = StateXUtils_1.applyParamsToPath(pathWithParams, params);
    var node = getNode(store, path);
    if (StateXTypes_1.isSelectorNode(node)) {
        return node.data.selector.getValue(store, node, options);
    }
    else {
        return ((_a = _getIn(store, node, undefined, mutableRefObject)) !== null && _a !== void 0 ? _a : node.data.defaultValue);
    }
}
function getStateXValue(store, path, props) {
    var value = getResolvableStateXValue(store, path, props);
    if (StateXTypes_1.isResolvable(value)) {
        return value.resolve();
    }
    return value;
}
exports.getStateXValue = getStateXValue;
function registerStateX(store, pathOrAtom, node) {
    if (pathOrAtom instanceof Atom_1["default"] && node.data.atom !== pathOrAtom) {
        node.data.atom = pathOrAtom;
        node.data.defaultValue = pathOrAtom.defaultValue;
        var val = ImmutableUtils_1.getIn(store.getState(), node.path, undefined);
        if (val === undefined) {
            store.trackAndMutate(node, pathOrAtom.defaultValue);
        }
    }
    else if (pathOrAtom instanceof Selector_1["default"]) {
        if (node.data.selector !== pathOrAtom) {
            node.data.selector = pathOrAtom;
            if (StateXTypes_1.isSelectorNode(node)) {
                // re-initialize selector to cleanup existing subscriptions
                node.data.initialized = false;
            }
        }
    }
}
exports.registerStateX = registerStateX;
function makeGet(store, nodes) {
    return function (pathOrAtom, options) {
        var path;
        if (pathOrAtom instanceof Selector_1["default"]) {
            path = StateXUtils_1.applyParamsToPath(pathOrAtom.pathWithParams, options === null || options === void 0 ? void 0 : options.params);
        }
        else if (pathOrAtom instanceof Atom_1["default"]) {
            path = StateXUtils_1.applyParamsToPath(pathOrAtom.path, options === null || options === void 0 ? void 0 : options.params);
        }
        else {
            path = pathOrAtom;
        }
        var node = getNode(store, path);
        registerStateX(store, pathOrAtom, node);
        // collect all the nodes being accessed
        if (nodes) {
            nodes.add(getNode(store, path));
        }
        var value = getStateXValue(store, path, options);
        if (StateXTypes_1.isResolvable(value)) {
            return value.resolve();
        }
        return value;
    };
}
exports.makeGet = makeGet;
function makeSet(store) {
    return function (pathOrAtom, value, options) {
        var path;
        if (pathOrAtom instanceof Selector_1["default"]) {
            path = StateXUtils_1.applyParamsToPath(pathOrAtom.pathWithParams, options === null || options === void 0 ? void 0 : options.params);
        }
        else if (pathOrAtom instanceof Atom_1["default"]) {
            path = StateXUtils_1.applyParamsToPath(pathOrAtom.path, options === null || options === void 0 ? void 0 : options.params);
        }
        else {
            path = pathOrAtom;
        }
        var node = getNode(store, path);
        registerStateX(store, pathOrAtom, node);
        return setStateXValue(store, node, value, options);
    };
}
exports.makeSet = makeSet;
