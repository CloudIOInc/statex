"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
var Atom = /** @class */ (function () {
    function Atom(props) {
        this.path = props.path;
        this.defaultValue = props.defaultValue;
        this.shouldComponentUpdate = props.shouldComponentUpdate;
        this.updater = props.updater;
        this.onChange = props.onChange;
    }
    return Atom;
}());
exports["default"] = Atom;
