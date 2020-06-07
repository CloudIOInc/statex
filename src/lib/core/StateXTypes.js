"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
exports.isResolvable = exports.Resolvable = exports.isSelectorNode = exports.hasSelector = exports.hasStateX = void 0;
function hasStateX(node) {
    return node.atom !== undefined;
}
exports.hasStateX = hasStateX;
function hasSelector(node) {
    return node.selector !== undefined;
}
exports.hasSelector = hasSelector;
function isSelectorNode(node) {
    return node.data.selector !== undefined;
}
exports.isSelectorNode = isSelectorNode;
var Resolvable = /** @class */ (function () {
    function Resolvable(selectorNode, self) {
        var _this = this;
        this.cancelled = false;
        this.clone = function () {
            var resolvable = new Resolvable(_this.selectorNode, _this.self);
            resolvable.value = _this.value;
            resolvable.status = _this.status;
            resolvable.promise = _this.promise;
            resolvable.error = _this.error;
            resolvable.cancelled = _this.cancelled;
            return resolvable;
        };
        this.resolveIfSelf = function (selectorNode) {
            switch (_this.status) {
                case 'pending':
                    throw _this.promise;
                case 'error':
                    throw _this.error;
                default:
                    if (_this.selectorNode === selectorNode && _this.self) {
                        return _this.value;
                    }
                    throw _this.promise;
            }
        };
        this.resolve = function () {
            switch (_this.status) {
                case 'pending':
                    throw _this.promise;
                case 'error':
                    throw _this.error;
                default:
                    return _this.value;
            }
        };
        this.selectorNode = selectorNode;
        this.status = 'pending';
        this.self = self;
    }
    Resolvable.withValue = function (selectorNode, value) {
        var resolvable = new Resolvable(selectorNode, true);
        resolvable.value = value;
        resolvable.status = 'resolved';
        return resolvable;
    };
    return Resolvable;
}());
exports.Resolvable = Resolvable;
function isResolvable(value) {
    return value instanceof Resolvable;
}
exports.isResolvable = isResolvable;
