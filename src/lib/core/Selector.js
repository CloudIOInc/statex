"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
var StateXTypes_1 = require("./StateXTypes");
var StateXTypes_2 = require("./StateXTypes");
var StateXUtils_1 = require("./StateXUtils");
var StateX_1 = require("./StateX");
function notWritableSelector() {
    throw Error('Not a writable selector!');
}
var Selector = /** @class */ (function () {
    function Selector(_a) {
        var _this = this;
        var path = _a.path, get = _a.get, set = _a.set, shouldComponentUpdate = _a.shouldComponentUpdate, defaultValue = _a.defaultValue;
        this.dynamic = false;
        this.params = new Map();
        this._evaluate = function (store, props) {
            var get = props.get, set = props.set, options = props.options;
            var path = StateXUtils_1.applyParamsToPath(_this.pathWithParams, options === null || options === void 0 ? void 0 : options.params);
            var selectorNode = StateX_1.getNode(store, path);
            var value;
            store.activateNode(selectorNode, 'read');
            store.beforeSelectorGet(selectorNode);
            try {
                value = _this._get({ get: get, set: set, params: options === null || options === void 0 ? void 0 : options.params });
            }
            catch (errorOrPromise) {
                return _this.makeResolvable(store, selectorNode, false, errorOrPromise, options === null || options === void 0 ? void 0 : options.params);
            }
            finally {
                store.afterSelectorGet(selectorNode);
            }
            if (StateXUtils_1.isPromise(value)) {
                return _this.makeResolvable(store, selectorNode, true, value, options === null || options === void 0 ? void 0 : options.params);
            }
            else {
                selectorNode.data.selectorValue = value;
            }
            return value;
        };
        this.getValue = function (store, selectorNode, options) {
            var _a;
            if (!selectorNode.data.initialized) {
                (_a = selectorNode.data.previousNodes) === null || _a === void 0 ? void 0 : _a.forEach(function (node) {
                    var _a;
                    (_a = selectorNode.data.unregisterMap.get(node)) === null || _a === void 0 ? void 0 : _a();
                });
                selectorNode.data.unregisterMap = new Map();
                selectorNode.data.previousNodes = new Set();
                selectorNode.data.initialized = true;
                return _this.selectValueWithStateXHolder(store, options);
            }
            if (selectorNode.data.resolveable) {
                return selectorNode.data.resolveable;
            }
            return selectorNode.data.selectorValue;
        };
        this.setValue = function (store, selectorNode, value, options) {
            try {
                store.beforeSelectorSet(selectorNode);
                return _this._set({
                    set: StateX_1.makeSet(store),
                    get: StateX_1.makeGet(store),
                    params: options === null || options === void 0 ? void 0 : options.params,
                    value: value
                });
            }
            catch (error) {
                store["catch"](error);
                throw error;
            }
            finally {
                store.afterSelectorSet(selectorNode);
            }
        };
        this.watchStateXForSelector = function (store, selectorNode, node, options) {
            var unreg = selectorNode.data.unregisterMap.get(node);
            if (unreg) {
                console.warn('Node already registered', selectorNode.path.join('.'), node.path.join('.'));
                unreg();
            }
            var stateXHolder = {
                setter: function () {
                    // do nothing during initial enterStateX callback
                },
                node: selectorNode
            };
            var leaveStateX = StateX_1.enterStateX(node, stateXHolder);
            stateXHolder.setter = function () { return _this.update(store, selectorNode, options); };
            selectorNode.data.unregisterMap.set(node, leaveStateX);
        };
        this.update = function (store, selectorNode, options) {
            var val = _this.selectValueWithStateXHolder(store, options);
            if (StateXTypes_1.isResolvable(val)) {
                try {
                    selectorNode.data.holders.forEach(function (holder) { return holder.setter(val); });
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                // update the state... this will trigger re-render on all components watching this atom
                // setStateXValue(this.pathWithParams, val, props);
                // trigger the selector component re-render
                selectorNode.data.selectorValue = val;
                _this.inform(store, val, selectorNode, true);
            }
        };
        this.selectValueWithStateXHolder = function (store, options) {
            var path = StateXUtils_1.applyParamsToPath(_this.pathWithParams, options === null || options === void 0 ? void 0 : options.params);
            var selectorNode = StateX_1.getNode(store, path);
            var nodes = new Set();
            var value = _this._evaluate(store, {
                get: StateX_1.makeGet(store, nodes),
                set: StateX_1.makeSet(store),
                options: options
            });
            nodes.forEach(function (node) {
                if (!selectorNode.data.previousNodes.has(node)) {
                    // watch the atom
                    _this.watchStateXForSelector(store, selectorNode, node, options);
                }
                else {
                    // already watching
                    selectorNode.data.previousNodes["delete"](node);
                }
            });
            selectorNode.data.previousNodes.forEach(function (node) {
                var _a;
                // must be conditionally avoided... no need to watch the atom anymore
                (_a = selectorNode.data.unregisterMap.get(node)) === null || _a === void 0 ? void 0 : _a();
            });
            selectorNode.data.previousNodes = nodes;
            return value;
        };
        this._get = get;
        this._set = set !== null && set !== void 0 ? set : notWritableSelector;
        this.defaultValue = defaultValue;
        this.pathWithParams = path;
        this.shouldComponentUpdate = shouldComponentUpdate;
        for (var i = 0; i < path.length; i++) {
            var key = path[i];
            if (typeof key === 'string' && key.charAt(0) === ':') {
                this.params.set(key.substr(1), i);
            }
        }
        if (this.params.size) {
            this.dynamic = true;
        }
    }
    Selector.prototype.makeResolvable = function (store, selectorNode, self, promiseOrError, params) {
        var _this = this;
        if (selectorNode.data.resolveable) {
            // cancel the pending resolvable
            selectorNode.data.resolveable.cancelled = true;
        }
        var resolvable = new StateXTypes_2.Resolvable(selectorNode, self);
        if (StateXUtils_1.isPromise(promiseOrError)) {
            resolvable.promise = promiseOrError;
            promiseOrError
                .then(function (value) {
                resolvable.value = value;
                resolvable.status = 'resolved';
                if (!resolvable.cancelled) {
                    if (self) {
                        // react doesn't re-render if we return the same resolveable... hence clone it
                        selectorNode.data.resolveable = resolvable.clone();
                        selectorNode.data.selectorValue = value;
                        _this.inform(store, value, selectorNode, self);
                    }
                    else {
                        _this.update(store, selectorNode, params);
                    }
                    // setStateXValue(this.pathWithParams, value, { params });
                }
                return value;
            })["catch"](function (error) {
                resolvable.error = error;
                resolvable.status = 'error';
                if (!resolvable.cancelled) {
                    try {
                        // react doesn't re-render if we return the same resolveable... hence clone it
                        selectorNode.data.resolveable = resolvable.clone();
                        selectorNode.data.holders.forEach(function (holder) {
                            return holder.setter(selectorNode.data.resolveable);
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            });
        }
        else {
            resolvable.error = promiseOrError;
            resolvable.status = 'error';
        }
        selectorNode.data.resolveable = resolvable;
        return resolvable;
    };
    Selector.prototype.inform = function (store, val, selectorNode, self) {
        var oldValue = selectorNode.data.oldValue;
        selectorNode.data.oldValue = val;
        var shouldSelectorUpdate = true;
        if (this.shouldComponentUpdate) {
            store.beforeShouldComponentUpdate(selectorNode);
            shouldSelectorUpdate = this.shouldComponentUpdate(val, oldValue);
            store.afterShouldComponentUpdate(selectorNode);
        }
        if (shouldSelectorUpdate) {
            selectorNode.data.holders.forEach(function (holder) {
                if (holder.holding) {
                    var shouldUpdate = true;
                    if (holder.shouldComponentUpdate) {
                        store.beforeShouldComponentUpdate(holder.node);
                        shouldUpdate = holder.shouldComponentUpdate(val, oldValue);
                        store.afterShouldComponentUpdate(holder.node);
                    }
                    if (shouldUpdate) {
                        holder.setter(val);
                    }
                    // Do we need to call onChange
                    // if atom.shouldComponentUpdate returns false?
                    if (holder.onChange) {
                        store.beforeOnChange(holder.node);
                        holder.onChange({
                            value: val,
                            oldValue: oldValue,
                            get: StateX_1.makeGet(store),
                            set: StateX_1.makeSet(store)
                        });
                        store.afterOnChange(holder.node);
                    }
                }
            });
        }
    };
    return Selector;
}());
exports["default"] = Selector;
