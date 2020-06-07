"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
exports.useStateXRefValue = exports.useStateXRef = exports.useStateXForToggle = exports.useStateXForTextInput = exports.useStateXForSelect = exports.useStateXForNumberInput = exports.useStateXForCheckbox = exports.usePrintTree = exports.isReactElement = void 0;
var react_1 = require("react");
var StateXHooks_1 = require("./StateXHooks");
var Atom_1 = require("./Atom");
var StateXContext_1 = require("./StateXContext");
var StateX_1 = require("./StateX");
var ImmutableTypes_1 = require("./ImmutableTypes");
var StateXUtils_1 = require("./StateXUtils");
exports.isReactElement = StateXUtils_1.isReactElement;
function useStateXOnChangeForTextInput(path, options) {
    var setValue = StateXHooks_1.useStateXValueSetter(path, options);
    var onChange = react_1.useCallback(function (event) { return setValue(event.target.value); }, [
        setValue,
    ]);
    return [onChange, setValue];
}
function useStateXOnChangeForNumberInput(path) {
    var setValue = StateXHooks_1.useStateXValueSetter(path);
    var onChange = react_1.useCallback(function (event) {
        var value = Number(event.target.value);
        if (!Number.isNaN(value)) {
            setValue(value);
        }
    }, [setValue]);
    return [onChange, setValue];
}
function useStateXRef(path) {
    var newRef = react_1.useRef(null);
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    if (!node.data.ref) {
        node.data.ref = newRef;
    }
    react_1.useEffect(function () {
        return function () {
            node.data.ref = undefined;
        };
    }, [node]);
    return node.data.ref;
}
exports.useStateXRef = useStateXRef;
function useStateXRefValue(path) {
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    return node.data.ref;
}
exports.useStateXRefValue = useStateXRefValue;
function useStateXForTextInput(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (typeof defaultOrOptions !== 'string') {
            defaultOrOptions = '';
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom or path.');
    }
    var value = StateXHooks_1.useStateXValueInternal(pathOrAtom, defaultValue, options);
    var onChange = useStateXOnChangeForTextInput(pathOrAtom, options)[0];
    return { value: value, onChange: onChange, type: (options === null || options === void 0 ? void 0 : options.type) || 'text' };
}
exports.useStateXForTextInput = useStateXForTextInput;
function useStateXForSelect(path, options) {
    var value = StateXHooks_1.useStateXValue(path, options) || '';
    var onChange = useStateXOnChangeForTextInput(path, options)[0];
    return { value: value, onChange: onChange };
}
exports.useStateXForSelect = useStateXForSelect;
function useStateXForNumberInput(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (typeof defaultOrOptions !== 'number') {
            defaultOrOptions = 0;
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom or path.');
    }
    var value = StateXHooks_1.useStateXValueInternal(pathOrAtom, defaultValue, options);
    var onChange = useStateXOnChangeForNumberInput(pathOrAtom)[0];
    return { value: value, onChange: onChange, type: 'number' };
}
exports.useStateXForNumberInput = useStateXForNumberInput;
function useStateXOnToggle(pathOrAtom, options) {
    var setValue = StateXHooks_1.useStateXValueSetter(pathOrAtom, options);
    var onChange = react_1.useCallback(function () {
        setValue(function (value) { return !value; });
    }, [setValue]);
    return [onChange, setValue];
}
function useStateXForToggle(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (typeof defaultOrOptions !== 'boolean') {
            defaultOrOptions = false;
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom or path.');
    }
    var value = StateXHooks_1.useStateXValueInternal(pathOrAtom, defaultValue, options);
    var onToggle = useStateXOnToggle(pathOrAtom, options)[0];
    return [!!value, onToggle];
}
exports.useStateXForToggle = useStateXForToggle;
function useStateXForCheckbox(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (typeof defaultOrOptions !== 'boolean') {
            defaultOrOptions = false;
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom or path.');
    }
    var value = StateXHooks_1.useStateXValueInternal(pathOrAtom, defaultValue, options);
    var onChange = useStateXOnToggle(pathOrAtom, options)[0];
    return { onChange: onChange, checked: !!value, type: 'checkbox' };
}
exports.useStateXForCheckbox = useStateXForCheckbox;
function usePrintTree() {
    var store = StateXContext_1.useStateXStore();
    return function (path) {
        var sb = [];
        store.trie().forEach(path, function (node, level) {
            sb.push("" + ''.padStart(level * 2, '-') + node.path.join('.') + " " + node.data.holders.size);
            node.data.holders.forEach(function (holder) {
                sb.push("" + ''.padStart(level * 2 + 2, ' ') + holder.node.path.join('.'));
            });
        });
        console.log(sb.join('\n'));
    };
}
exports.usePrintTree = usePrintTree;
