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
var Trie = /** @class */ (function () {
    function Trie(makeData) {
        var _this = this;
        this._createNode = function (key, parent) {
            var node = {
                children: {},
                key: key,
                parent: parent,
                path: parent ? __spreadArrays(parent.path, [key]) : [],
                data: _this.makeData(key, parent)
            };
            return node;
        };
        this._forEach = function (node, level, fn) {
            fn(node, level);
            Object.values(node.children).forEach(function (n) {
                _this._forEach(n, level + 1, fn);
            });
        };
        this.forEach = function (path, fn) {
            var node = _this.getNode(path);
            _this._forEach(node, 0, fn);
        };
        this.getNode = function (path, createMissingNode) {
            if (createMissingNode === void 0) { createMissingNode = true; }
            var node = _this.root;
            var child;
            var key;
            for (var i = 0; i < path.length; i++) {
                key = path[i];
                child = node.children[key];
                if (!child) {
                    if (createMissingNode) {
                        child = _this._createNode(key, node);
                        node.children[key] = child;
                    }
                    else {
                        throw Error("Node not found at path " + path.join('.') + "! Parent " + key + " at index " + i + " is missing!");
                    }
                }
                node = child;
            }
            return node;
        };
        this.addNode = function (path, data) {
            var node = _this.getNode(path);
            node.data = data;
        };
        this.removeNode = function (node) {
            var _a;
            (_a = node.parent) === null || _a === void 0 ? true : delete _a.children[node.key];
        };
        this._collectAllParentNodes = function (list, node) {
            if (node.parent) {
                list.push(node.parent);
                _this._collectAllParentNodes(list, node.parent);
            }
        };
        this.getAllParentNodes = function (path) {
            var nodes = [];
            _this._collectAllParentNodes(nodes, _this.getNode(path));
            return nodes;
        };
        this._collectAllChildNodes = function (node, list, filter) {
            var childNode;
            for (var child in node.children) {
                childNode = node.children[child];
                if (!filter || filter(childNode)) {
                    list.push(childNode);
                    _this._collectAllChildNodes(childNode, list, filter);
                }
            }
        };
        this.getAllChildNodes = function (path, filter) {
            var nodes = [];
            _this._collectAllChildNodes(_this.getNode(path), nodes, filter);
            return nodes;
        };
        this.isRootNode = function (node) { return node === _this.root; };
        this.makeData = makeData;
        this.root = this._createNode('_ROOT_');
    }
    return Trie;
}());
exports["default"] = Trie;
