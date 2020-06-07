"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./core/StateXTypes"), exports);
var StateXHooks_1 = require("./core/StateXHooks");
__createBinding(exports, StateXHooks_1, "StateXProvider");
__createBinding(exports, StateXHooks_1, "atom");
__createBinding(exports, StateXHooks_1, "selector");
__createBinding(exports, StateXHooks_1, "useDebug");
__createBinding(exports, StateXHooks_1, "useRemoveStateX");
__createBinding(exports, StateXHooks_1, "useStateX");
__createBinding(exports, StateXHooks_1, "useStateXCallback");
__createBinding(exports, StateXHooks_1, "useStateXResolveable");
__createBinding(exports, StateXHooks_1, "useStateXValue");
__createBinding(exports, StateXHooks_1, "useStateXValueGetterWithPath");
__createBinding(exports, StateXHooks_1, "useStateXValueRemover");
__createBinding(exports, StateXHooks_1, "useStateXValueResolveable");
__createBinding(exports, StateXHooks_1, "useStateXValueSetter");
__createBinding(exports, StateXHooks_1, "useWithStateX");
__exportStar(require("./core/StateXUIHooks"), exports);
