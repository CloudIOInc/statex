"use strict";
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
exports.StateX = void 0;
var StateXUtils_1 = require("./StateXUtils");
var Trie_1 = require("./Trie");
var StateX_1 = require("./StateX");
var ImmutableUtils_1 = require("./ImmutableUtils");
function notInAContext() {
    throw new Error('This component must be used inside a <StateXProvider> component.');
}
var StateX = /** @class */ (function () {
    function StateX(initialState, handleError) {
        var _this = this;
        if (initialState === void 0) { initialState = {}; }
        if (handleError === void 0) { handleError = StateXUtils_1.emptyFunction; }
        this._trie = new Trie_1["default"](function () { return ({
            holders: new Set(),
            defaultValue: undefined
        }); });
        this.activeNodes = new Map();
        this.mutatedNodes = new Set();
        this.batching = false;
        this.pending = [];
        this.updateSchedule = notInAContext;
        this.renderSchedule = notInAContext;
        this.postUpdateSchedule = notInAContext;
        this.postRenderSchedule = notInAContext;
        this.id = 0;
        this.rendering = false;
        this.registerPreUpdateScheduler = function (fn) {
            _this.updateSchedule = fn;
        };
        this.registerPreRenderScheduler = function (fn) {
            _this.renderSchedule = fn;
        };
        this.registerPostUpdateScheduler = function (fn) {
            _this.postUpdateSchedule = fn;
        };
        this.registerPostRenderScheduler = function (fn) {
            _this.postRenderSchedule = fn;
        };
        this.state = StateXUtils_1.deepFreeze(initialState);
        this.handleError = handleError;
    }
    StateX.prototype["catch"] = function (error) {
        this.handleError(error);
    };
    StateX.prototype.afterSelectorGet = function (node) { };
    StateX.prototype.afterSelectorSet = function (node) { };
    StateX.prototype.beforeSelectorGet = function (node) { };
    StateX.prototype.beforeSelectorSet = function (node) { };
    StateX.prototype.beforeShouldComponentUpdate = function (node) { };
    StateX.prototype.afterShouldComponentUpdate = function (node) { };
    StateX.prototype.beforeOnChange = function (node) { };
    StateX.prototype.afterOnChange = function (node) { };
    StateX.prototype.beforeAtomOnChange = function (node) { };
    StateX.prototype.afterAtomOnChange = function (node) { };
    StateX.prototype.beforeAtomUpdater = function (node) { };
    StateX.prototype.afterAtomUpdater = function (node) { };
    StateX.prototype.updatingState = function (node) { };
    StateX.prototype.readingState = function (node) { };
    StateX.prototype.removingState = function (node) { };
    StateX.prototype.afterSelectorReads = function () {
        if (this.activeNodes.size) {
            var log_1 = ['Derived nodes during render...'];
            this.activeNodes.forEach(function (count, node) { return log_1.push(node.path.join('.')); });
            this.debug(log_1.join(', '), 'render');
            // clear all active read nodes
            this.activeNodes.clear();
        }
        this.lastLogItem = undefined;
        StateXUtils_1.setMutateStateX(true);
    };
    StateX.prototype.renderingStarted = function () {
        this.rendering = true;
    };
    StateX.prototype.renderingCompleted = function () {
        this.rendering = false;
    };
    StateX.prototype.afterStateUpdates = function () {
        if (this.activeNodes.size) {
            var log_2 = ['Changed Nodes during update...'];
            this.activeNodes.forEach(function (count, node) { return log_2.push(node.path.join('.')); });
            this.debug(log_2.join(', '), 'event');
            // clear all active nodes
            this.activeNodes.clear();
        }
        this.renderSchedule();
        this.postRenderSchedule();
        this.processTrackedMutates();
        StateX_1.inform(this);
    };
    StateX.prototype.debug = function (log, action, data) {
        if (process.env.NODE_ENV === 'development') {
            var logItem = { log: log, id: ++this.id, ts: performance.now(), action: action };
            var ms = this.lastLogItem
                ? Math.round(logItem.ts - this.lastLogItem.ts)
                : 0;
            if (data !== undefined) {
                console.debug(logItem.id, action + " => " + log + (ms ? " - " + ms + "ms" : ''), data);
            }
            else {
                console.debug(logItem.id, action + " => " + log + (ms ? " - " + ms + "ms" : ''));
            }
            this.lastLogItem = logItem;
        }
    };
    StateX.prototype.activateNode = function (node, action, data) {
        var _a;
        var count = (_a = this.activeNodes.get(node)) !== null && _a !== void 0 ? _a : 0;
        if (count > 10) {
            throw Error("Trying to " + action + " $" + node.path.join('.') + " too many times!");
        }
        this.activeNodes.set(node, ++count);
        switch (action) {
            case 'read':
                this.renderSchedule();
                this.postRenderSchedule();
                break;
            default:
                this.updateSchedule();
                this.postUpdateSchedule();
                if (this.rendering) {
                    var log = "WARNING: Trying to " + action + " $" + node.path.join('.') + " during render!";
                    this.debug(log, action);
                }
                break;
        }
    };
    StateX.prototype.addToPending = function (path, action) {
        this.pending.push(path);
        this.updateSchedule();
        this.postUpdateSchedule();
    };
    StateX.prototype.trie = function () {
        return this._trie;
    };
    StateX.prototype.startBatch = function () {
        this.batching = true;
    };
    StateX.prototype.endBatch = function () {
        this.batching = false;
    };
    StateX.prototype.isBatching = function () {
        return this.batching;
    };
    StateX.prototype.clearPending = function () {
        this.pending = [];
    };
    StateX.prototype.getPendingPaths = function () {
        return this.pending;
    };
    StateX.prototype.getState = function () {
        return this.state;
    };
    StateX.prototype.setState = function (newState) {
        this.state = newState;
    };
    StateX.prototype.trackAndMutate = function (node, value) {
        if (node.parent) {
            this.mutatedNodes.add(node.parent);
        }
        ImmutableUtils_1.setMutate(true);
        this.setState(ImmutableUtils_1.setIn(this.getState(), node.path, value));
        ImmutableUtils_1.setMutate(false);
    };
    StateX.prototype.processTrackedMutates = function () {
        var _this = this;
        ImmutableUtils_1.setMutate(false);
        this.mutatedNodes.forEach(function (node) {
            var object = ImmutableUtils_1.getIn(_this.getState(), node.path, undefined);
            if (object && typeof object === 'object') {
                if (Array.isArray(object)) {
                    object = __spreadArrays(object);
                }
                else {
                    object = __assign({}, object);
                }
                _this.setState(ImmutableUtils_1.setIn(_this.getState(), node.path, object));
            }
        });
        this.mutatedNodes.clear();
    };
    return StateX;
}());
exports.StateX = StateX;
