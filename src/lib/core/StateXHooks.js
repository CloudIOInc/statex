"use strict";
/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
exports.__esModule = true;
exports.useWithStateX = exports.useStateXValueSetter = exports.useStateXValueResolveable = exports.useStateXValueRemover = exports.useStateXValueInternal = exports.useStateXValueGetterWithPath = exports.useStateXValue = exports.useStateXResolveable = exports.useStateXCallback = exports.useStateX = exports.useRemoveStateX = exports.useLatest = exports.useDebug = exports.selector = exports.atom = exports.StateXProvider = void 0;
var react_1 = require("react");
var StateXTypes_1 = require("./StateXTypes");
var Atom_1 = require("./Atom");
var Selector_1 = require("./Selector");
var StateXTypes_2 = require("./StateXTypes");
var StateX_1 = require("./StateX");
var StateXUtils_1 = require("./StateXUtils");
var StateXContext_1 = require("./StateXContext");
exports.StateXProvider = StateXContext_1.StateXProvider;
var ImmutableTypes_1 = require("./ImmutableTypes");
function atom(props) {
    return new Atom_1["default"](props);
}
exports.atom = atom;
function useStateXValueGetterWithPath() {
    var store = StateXContext_1.useStateXStore();
    var get = react_1.useCallback(function (path, props) {
        return StateX_1.getStateXValue(store, path, props);
    }, [store]);
    return get;
}
exports.useStateXValueGetterWithPath = useStateXValueGetterWithPath;
function useStateXCallback(fn, deps) {
    var store = StateXContext_1.useStateXStore();
    return react_1.useCallback(function () { return fn({ get: StateX_1.makeGet(store), set: StateX_1.makeSet(store) }); }, 
    // @ts-ignore
    [fn, store]);
}
exports.useStateXCallback = useStateXCallback;
function useStateXValueSetter(pathOrAtom, options) {
    var path;
    if (pathOrAtom instanceof Atom_1["default"]) {
        path = pathOrAtom.path;
    }
    else if (pathOrAtom instanceof Selector_1["default"]) {
        path = pathOrAtom.pathWithParams;
    }
    else {
        path = pathOrAtom;
    }
    path = StateXUtils_1.applyParamsToPath(path, options === null || options === void 0 ? void 0 : options.params);
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    var optionsRef = useLatest(options);
    var setValue = react_1.useCallback(function (value) {
        try {
            return StateX_1.setStateXValue(store, node, value, optionsRef.current);
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }, [store, node, optionsRef]);
    return setValue;
}
exports.useStateXValueSetter = useStateXValueSetter;
function useStateXValue(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (pathOrAtom instanceof Selector_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (defaultOrOptions === undefined) {
            defaultOrOptions = null;
            // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom, selector or path.');
    }
    return useStateXValueInternal(pathOrAtom, defaultValue, options);
}
exports.useStateXValue = useStateXValue;
function useStateXValueInternal(pathOrAtom, defaultValue, options) {
    var path = resolveParams(pathOrAtom);
    path = StateXUtils_1.applyParamsToPath(path, options === null || options === void 0 ? void 0 : options.params);
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    var value = useStateXValueResolveableInternal(node, pathOrAtom, defaultValue, options);
    if (StateXTypes_2.isResolvable(value)) {
        value = value.resolveIfSelf(node);
    }
    return value;
}
exports.useStateXValueInternal = useStateXValueInternal;
function useStateXValueResolveable(selector, options) {
    var path = resolveParams(selector);
    path = StateXUtils_1.applyParamsToPath(path, options === null || options === void 0 ? void 0 : options.params);
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    var value = useStateXValueResolveableInternal(node, selector, selector.defaultValue, options);
    if (StateXTypes_2.isResolvable(value)) {
        return value;
    }
    else {
        // must be default value
        return StateXTypes_2.Resolvable.withValue(node, value);
    }
}
exports.useStateXValueResolveable = useStateXValueResolveable;
function useStateXResolveable(selector, options) {
    var value = useStateXValueResolveable(selector, options);
    var setValue = useStateXValueSetter(selector, options);
    return [value, setValue];
}
exports.useStateXResolveable = useStateXResolveable;
function useStateXValueResolveableInternal(node, pathOrAtom, defaultValue, options) {
    var _a;
    var store = StateXContext_1.useStateXStore();
    StateX_1.registerStateX(store, pathOrAtom, node);
    if (node.data.defaultValue === undefined) {
        node.data.defaultValue = defaultValue;
    }
    var holderRef = react_1.useRef({
        setter: StateXUtils_1.emptyFunction,
        shouldComponentUpdate: options === null || options === void 0 ? void 0 : options.shouldComponentUpdate,
        onChange: options === null || options === void 0 ? void 0 : options.onChange,
        node: node
    });
    var _b = react_1.useState(defaultValue), selectorValue = _b[0], setSelectorValue = _b[1];
    var currentValue;
    if (pathOrAtom instanceof Selector_1["default"]) {
        currentValue = selectorValue;
    }
    else {
        currentValue = (_a = StateX_1._getIn(store, node, undefined, !!(options === null || options === void 0 ? void 0 : options.mutableRefObject))) !== null && _a !== void 0 ? _a : defaultValue;
    }
    var ref = react_1.useRef({ defaultValue: defaultValue, options: options, currentValue: currentValue });
    var _c = react_1.useState(currentValue), setValueInternal = _c[1];
    var setValue = react_1.useCallback(function (value) {
        if (StateXTypes_1.isSelectorNode(node)) {
            setSelectorValue(value);
        }
        else {
            setValueInternal(value);
        }
    }, [setSelectorValue, setValueInternal, node]);
    react_1.useEffect(function () {
        ref.current.currentValue = currentValue;
        ref.current.defaultValue = defaultValue;
        ref.current.options = options;
        holderRef.current.shouldComponentUpdate = options === null || options === void 0 ? void 0 : options.shouldComponentUpdate;
        holderRef.current.onChange = options === null || options === void 0 ? void 0 : options.onChange;
        holderRef.current.setter = setValue;
        holderRef.current.node = node;
    }, [currentValue, defaultValue, options, node, setValue]);
    react_1.useEffect(function () {
        // initial or node changed due to dynamic path
        var _a = ref.current, defaultValue = _a.defaultValue, options = _a.options;
        if (StateXTypes_1.isSelectorNode(node)) {
            // selector may have side effects...
            // hence make the initial call inside useEffect
            var currentValue_1 = node.data.selector.getValue(store, node, options);
            setSelectorValue(currentValue_1);
        }
        else {
            var currentValue_2 = StateX_1._getIn(store, node, undefined, !!(options === null || options === void 0 ? void 0 : options.mutableRefObject));
            if (currentValue_2 === undefined) {
                if (defaultValue !== undefined && defaultValue !== null) {
                    setValue(defaultValue);
                    if (!node.data.selector) {
                        StateX_1.setStateXValue(store, node, defaultValue, {
                            mutableRefObject: !!(options === null || options === void 0 ? void 0 : options.mutableRefObject)
                        });
                    }
                }
            }
            else {
                setValue(currentValue_2);
            }
        }
    }, [node, setValue, store]);
    react_1.useEffect(function () {
        // watch the path
        return StateX_1.enterStateX(node, holderRef.current);
    }, [node, holderRef]);
    return currentValue;
}
function resolveParams(pathOrAtom) {
    var path;
    if (pathOrAtom instanceof Atom_1["default"]) {
        path = pathOrAtom.path;
    }
    else if (pathOrAtom instanceof Selector_1["default"]) {
        path = pathOrAtom.pathWithParams;
    }
    else {
        path = pathOrAtom;
    }
    return path;
}
function useStateX(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (pathOrAtom instanceof Selector_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (defaultOrOptions === undefined) {
            defaultOrOptions = null;
            // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom, selector or path.');
    }
    var value = useStateXValueInternal(pathOrAtom, defaultValue, options);
    var setValue = useStateXValueSetter(pathOrAtom, options);
    return [value, setValue];
}
exports.useStateX = useStateX;
function useLatest(value) {
    var ref = react_1.useRef(value);
    react_1.useLayoutEffect(function () {
        ref.current = value;
    }, [value]);
    return ref;
}
exports.useLatest = useLatest;
function selector(props) {
    return new Selector_1["default"](props);
}
exports.selector = selector;
function useStateXValueRemover(pathOrAtom, options) {
    var path;
    if (pathOrAtom instanceof Atom_1["default"]) {
        path = pathOrAtom.path;
    }
    else {
        path = pathOrAtom;
    }
    path = StateXUtils_1.applyParamsToPath(path, options === null || options === void 0 ? void 0 : options.params);
    var store = StateXContext_1.useStateXStore();
    var node = StateX_1.getNode(store, path);
    var optionsRef = useLatest(options);
    var removeValue = react_1.useCallback(function () {
        return StateX_1.removeStateXValue(store, node.path, optionsRef.current);
    }, [node, optionsRef, store]);
    return removeValue;
}
exports.useStateXValueRemover = useStateXValueRemover;
function useRemoveStateX(pathOrAtom, defaultOrOptions, options) {
    var defaultValue;
    if (pathOrAtom instanceof Atom_1["default"]) {
        defaultValue = pathOrAtom.defaultValue;
        options = defaultOrOptions;
    }
    else if (ImmutableTypes_1.isPath(pathOrAtom)) {
        if (defaultOrOptions === undefined) {
            defaultOrOptions = null;
            // throw Error(`Missing default value for path [${pathOrAtom.join(', ')}]`);
        }
        defaultValue = defaultOrOptions;
    }
    else {
        throw Error('Invalid atom type value! Must be either an atom, selector or path.');
    }
    var value = useStateXValueInternal(pathOrAtom, defaultValue, options);
    var removeValue = useStateXValueRemover(pathOrAtom, options);
    return [value, removeValue];
}
exports.useRemoveStateX = useRemoveStateX;
function useWithStateX(state) {
    var setValue = useStateXValueSetter([]);
    var ref = react_1.useRef(state);
    react_1.useEffect(function () {
        setValue(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.useEffect(function () {
        if (JSON.stringify(ref.current) !== JSON.stringify(state)) {
            setValue(state);
            ref.current = state;
        }
    }, [setValue, state]);
    return null;
}
exports.useWithStateX = useWithStateX;
function useDebug() {
    var store = StateXContext_1.useStateXStore();
    var debug = react_1.useCallback(function (log, action, data) {
        store.debug(log, action, data);
    }, [store]);
    return debug;
}
exports.useDebug = useDebug;
