(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{170:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return p}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=o.a.createContext({}),l=function(e){var t=o.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=l(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=l(r),h=n,p=d["".concat(i,".").concat(h)]||d[h]||f[h]||a;return r?o.a.createElement(p,s(s({ref:t},c),{},{components:r})):o.a.createElement(p,s({ref:t},c))}));function p(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=h;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}h.displayName="MDXCreateElement"},175:function(e,t,r){e.exports=r(183)},183:function(e,t,r){"use strict";r.r(t),r.d(t,"Resolvable",(function(){return u})),r.d(t,"StateXProvider",(function(){return q})),r.d(t,"atom",(function(){return Q})),r.d(t,"hasSelector",(function(){return i})),r.d(t,"hasStateX",(function(){return a})),r.d(t,"isReactElement",(function(){return E})),r.d(t,"isResolvable",(function(){return c})),r.d(t,"isSelectorNode",(function(){return s})),r.d(t,"selector",(function(){return le})),r.d(t,"useDebug",(function(){return pe})),r.d(t,"usePrintTree",(function(){return _e})),r.d(t,"useRemoveStateX",(function(){return fe})),r.d(t,"useStateX",(function(){return ue})),r.d(t,"useStateXCallback",(function(){return te})),r.d(t,"useStateXForCheckbox",(function(){return we})),r.d(t,"useStateXForNumberInput",(function(){return Se})),r.d(t,"useStateXForSelect",(function(){return ye})),r.d(t,"useStateXForTextInput",(function(){return me})),r.d(t,"useStateXForToggle",(function(){return je})),r.d(t,"useStateXGetter",(function(){return Z})),r.d(t,"useStateXRef",(function(){return ge})),r.d(t,"useStateXRefValue",(function(){return be})),r.d(t,"useStateXResolveable",(function(){return ie})),r.d(t,"useStateXSetter",(function(){return Y})),r.d(t,"useStateXValue",(function(){return ne})),r.d(t,"useStateXValueGetter",(function(){return ee})),r.d(t,"useStateXValueRemover",(function(){return de})),r.d(t,"useStateXValueResolveable",(function(){return ae})),r.d(t,"useStateXValueSetter",(function(){return re})),r.d(t,"useWithStateX",(function(){return he}));var n=r(0),o=r.n(n);function a(e){return void 0!==e.atom}function i(e){return void 0!==e.selector}function s(e){return void 0!==e.data.selector}class u{constructor(e,t,r=!1){this.cancelled=!1,this.clone=()=>{const e=new u(this.selectorNode,this.self,this.isDefault);return e.value=this.value,e.status=this.status,e.promise=this.promise,e.error=this.error,e.cancelled=this.cancelled,e},this.resolveIfSelf=e=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:if(this.selectorNode===e&&this.self)return this.value;throw this.promise}},this.resolve=()=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:return this.value}},this.selectorNode=e,this.status="pending",this.self=t,this.isDefault=r}static withValue(e,t,r=!1){const n=new u(e,!0,r);return n.value=t,n.status="resolved",n}}function c(e){return e instanceof u}class l{constructor(e){this.path=e.path,this.defaultValue=e.defaultValue,this.shouldComponentUpdate=e.shouldComponentUpdate,this.updater=e.updater,this.onChange=e.onChange}}function d(e){return null!==e&&Array.isArray(e)}function f(e){return e&&"object"==typeof e}function h(e){return null==e}function p(e){return Array.isArray(e)}let v=!0;function g(e){v=e}function b(e){return Array.isArray(e)?[...e]:Object.assign({},e)}function m(e,t,r){if(d(e)){if("number"==typeof t)return function(e,t,r){if(e[t]===r)return e;if(v&&!Object.isFrozen(e))return e[t]=r,e;if(t===e.length)return[...e,r];{const n=b(e);return n[t]=r,n}}(e,t,r(e.length>t?e[t]:null));throw Error(`Invalid key ${String(t)}. Must be of type number.`)}return f(e)?function(e,t,r){return e[t]===r?e:v&&!Object.isFrozen(e)?(e[t]=r,e):Object.assign(Object.assign({},e),{[t]:r})}(e,t,r(e[t])):e}function y(e,t,r){return m(e,t,()=>r)}function S(e,t){if(d(e)){if("number"==typeof t)return e.length>t?e[t]:void 0;throw Error(`Invalid key ${t}. Must be of type number.`)}return f(e)?e[t]:null}function O(e,t,r){const n=function e(t,r,n){if(0===r.length&&0===n)return t;const o=r[n];if(r.length===n+1)return S(t,o);const a=S(t,o);if(h(a))return null;if(!f(a))throw console.error(t,r,n),Error(`Invalid path ${JSON.stringify(r)} at index ${n}. Must be an object. Instead found ${a}`);return e(a,r,n+1)}(e,t,0);return h(n)?r:n}function j(e,t,r){return function(e,t,r){return function e(t,r,n,o,a){if(0===r.length&&0===n)return o(t);const i=r[n];if(r.length===n+1)try{if(a){if("number"==typeof i&&d(t))return function(e,t,r){if(d(e)){if(t<e.length){const n=e.slice(0,t),o=e.slice(t);return[...n,r(e[t]),...o]}if(t===e.length)return[...e,r(null)];throw Error(`Index out of bound! Index ${t}. Size ${e.length}.`)}throw Error("insert called on invalid collection. collection must be of type Array.")}(t,i,o);throw Error("insertIn called on invalid collection. \n          leaf collection must be of type Array \n          & leaf path must be a number.")}return m(t,i,o)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(r)}.`)}let s,u;try{s=S(t,i)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(r)} at index ${n}.`)}if(h(s))u="number"==typeof r[n+1]?[]:{};else{if(!f(s))throw Error(`Invalid path ${JSON.stringify(r)} at index ${n}. Must be an object.`);u=s}if(u=e(u,r,n+1,o,a),u===s)return t;try{return y(t,i,u)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(r)} at index ${n}.`)}}(e,t,0,r,!1)}(e,t,()=>r)}function w(e,t,r){const n=t[r];if(t.length===r+1)return function(e,t){if(function(e,t){if(d(e)){if("number"==typeof t)return e.hasOwnProperty(t);throw Error(`Invalid key ${t}. Must be of type number.`)}return!!f(e)&&e.hasOwnProperty(t)}(e,t)){if(d(e)){if("number"==typeof t)return[...e.slice(0,t),...e.slice(t+1)];throw Error(`Invalid key ${t}. Must be of type number.`)}const r=b(e);if(f(r))return delete r[t],r}return e}(e,n);const o=S(e,n);let a;return null==o?e:(a=function(e,t){if(null!==e&&(Array.isArray(e)||"object"==typeof e))return e;throw Error(t)}(o,`Invalid path ${JSON.stringify(t)} at index ${r}. Must be an object.`),a=w(a,t,r+1),a===o?e:y(e,n,a))}function _(e){return e instanceof Promise||e&&"object"==typeof e&&"function"==typeof e.then}function E(e){switch(typeof e.$$typeof){case"symbol":case"number":return!0}return!1}let N=!1;function C(e){N=!e,g(e)}function x(){}const P=Object.freeze({});function V(e,t){if(!t||0===Object.keys(t).length)return e;const r=[...e];Object.entries(t).forEach(e=>{const t=r.indexOf(":"+e[0]);-1!==t&&(r[t]=e[1])});const n=r.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(n.length)throw Error(`Missing parameter values for ${n.join(", ")} in path ${JSON.stringify(r)}. Params passed ${JSON.stringify(t)}`);return r}function $(e,t,r,n=!0){if(0===t.path.length)return e.getState();const o=O(e.getState(),t.path,r);return void 0===o?r:o}function R(e,t){const r=$(e,t);return t.data.lastKnownValue!==r}function U(e,t){const r=t.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(r.length)throw Error(`Missing parameter values for ${r.join(", ")} in path ${JSON.stringify(t)}!`);return e.trie().getNode(t)}function A(e,t){return e.data.holders.add(t),t.holding=!0,()=>{t.holding=!1,e.data.holders.delete(t)}}function k(e,t,r,n){return function(e,t,r,n){var o,a;let i,u,c;if(e.activateNode(t,"update",r),c=s(t)?null!==(o=t.data.selectorValue)&&void 0!==o?o:t.data.selector.defaultValue:$(e,t),i=function(e){return"function"!=typeof e}(r)?r:r(c),i===c)return c;if(s(t))u=t.data.selector.setValue(e,t,i,n);else{if("function"==typeof(null===(a=t.data.atom)||void 0===a?void 0:a.updater)&&(e.beforeAtomUpdater(t),i=t.data.atom.updater({value:i,oldValue:c,get:X(e),set:I(e)}),e.afterAtomUpdater(t)),i===c)return c;u=i,e.updatingState(t),e.trackAndMutate(t,i),e.addToPending(t.path,"update")}return u}(e,t,r,n)}function M(e,t,r){t instanceof l&&r.data.atom!==t?(r.data.atom=t,r.data.defaultValue=t.defaultValue,void 0===O(e.getState(),r.path,void 0)&&e.trackAndMutate(r,t.defaultValue)):t instanceof F&&r.data.selector!==t&&(r.data.selector=t,s(r)&&(r.data.initialized=!1))}function z(e,t){let r;if(e instanceof l)r=e.path;else if(e instanceof F)r=e.pathWithParams;else{if(!Array.isArray(e))throw Error(`Invalid state ${JSON.stringify(e)}. Must be path or atom or selector.`);r=e}return V(r,t)}function X(e,t){return(r,n)=>{const o=z(r,null==n?void 0:n.params),a=U(e,o);return M(e,r,a),t&&t.add(U(e,o)),function(e,t,r){const n=function(e,t,r){var n;const{mutableRefObject:o}=r||P;return s(t)?t.data.selector.getValue(e,t,r):null!==(n=$(e,t,void 0,o))&&void 0!==n?n:t.data.defaultValue}(e,t,r);return c(n)?n.resolve():n}(e,a,n)}}function I(e){return(t,r,n)=>{const o=z(t,null==n?void 0:n.params),a=U(e,o);return M(e,t,a),k(e,a,r,n)}}function T(){throw Error("Not a writable selector!")}class F{constructor({path:e,get:t,set:r,shouldComponentUpdate:n,defaultValue:o}){this.dynamic=!1,this.params=new Map,this._evaluate=(e,t)=>{const{get:r,set:n,options:o}=t,a=U(e,V(this.pathWithParams,null==o?void 0:o.params));let i;e.activateNode(a,"read"),e.beforeSelectorGet(a);try{i=this._get({get:r,set:n,params:null==o?void 0:o.params})}catch(t){return this.makeResolvable(e,a,!1,t,null==o?void 0:o.params)}finally{e.afterSelectorGet(a)}return _(i)?this.makeResolvable(e,a,!0,i,null==o?void 0:o.params):(a.data.selectorValue=i,i)},this.getValue=(e,t,r)=>{var n;return t.data.initialized?t.data.resolveable?t.data.resolveable:t.data.selectorValue:(null===(n=t.data.previousNodes)||void 0===n||n.forEach(e=>{var r;null===(r=t.data.unregisterMap.get(e))||void 0===r||r()}),t.data.unregisterMap=new Map,t.data.previousNodes=new Set,t.data.initialized=!0,this.selectValueWithStateXHolder(e,r))},this.setValue=(e,t,r,n)=>{try{return e.beforeSelectorSet(t),this._set({set:I(e),get:X(e),params:null==n?void 0:n.params,value:r},r)}catch(t){throw e.catch(t),t}finally{e.afterSelectorSet(t)}},this.watchStateXForSelector=(e,t,r,n)=>{const o=t.data.unregisterMap.get(r);o&&(console.warn("Node already registered",t.path.join("."),r.path.join(".")),o());const a={setter:()=>{},node:t},i=A(r,a);a.setter=()=>this.update(e,t,n),t.data.unregisterMap.set(r,i)},this.update=(e,t,r)=>{const n=this.selectValueWithStateXHolder(e,r);if(c(n))try{t.data.holders.forEach(e=>e.setter(n))}catch(e){console.error(e)}else t.data.selectorValue=n,this.inform(e,n,t,!0)},this.selectValueWithStateXHolder=(e,t)=>{const r=V(this.pathWithParams,null==t?void 0:t.params),n=U(e,r),o=new Set,a=this._evaluate(e,{get:X(e,o),set:I(e),options:t});return o.forEach(r=>{n.data.previousNodes.has(r)?n.data.previousNodes.delete(r):this.watchStateXForSelector(e,n,r,t)}),n.data.previousNodes.forEach(e=>{var t;null===(t=n.data.unregisterMap.get(e))||void 0===t||t()}),n.data.previousNodes=o,a},this._get=t,this._set=null!=r?r:T,this.defaultValue=o,this.pathWithParams=e,this.shouldComponentUpdate=n;for(let a=0;a<e.length;a++){const t=e[a];"string"==typeof t&&":"===t.charAt(0)&&this.params.set(t.substr(1),a)}this.params.size&&(this.dynamic=!0)}makeResolvable(e,t,r,n,o){t.data.resolveable&&(t.data.resolveable.cancelled=!0);const a=new u(t,r);return _(n)?(a.promise=n,n.then(n=>(a.value=n,a.status="resolved",a.cancelled||(r?(t.data.resolveable=a.clone(),t.data.selectorValue=n,this.inform(e,n,t,r)):this.update(e,t,o)),n)).catch(e=>{if(a.error=e,a.status="error",!a.cancelled)try{t.data.resolveable=a.clone(),t.data.holders.forEach(e=>e.setter(t.data.resolveable))}catch(e){console.error(e)}})):(a.error=n,a.status="error"),t.data.resolveable=a,a}inform(e,t,r,n){const{oldValue:o}=r.data;r.data.oldValue=t;let a=!0;this.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(r),a=this.shouldComponentUpdate(t,o),e.afterShouldComponentUpdate(r)),a&&r.data.holders.forEach(r=>{if(r.holding){let n=!0;r.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(r.node),n=r.shouldComponentUpdate(t,o),e.afterShouldComponentUpdate(r.node)),n&&r.setter(t),r.onChange&&(e.beforeOnChange(r.node),r.onChange({value:t,oldValue:o,get:X(e),set:I(e)}),e.afterOnChange(r.node))}})}}class J{constructor(e){this._createNode=(e,t)=>({children:{},key:e,parent:t,path:t?[...t.path,e]:[],data:this.makeData(e,t)}),this._forEach=(e,t,r)=>{r(e,t),Object.values(e.children).forEach(e=>{this._forEach(e,t+1,r)})},this.forEach=(e,t)=>{const r=this.getNode(e);this._forEach(r,0,t)},this.getNode=(e,t=!0)=>{let r,n,o=this.root;for(let a=0;a<e.length;a++){if(n=e[a],r=o.children[n],!r){if(!t)throw Error(`Node not found at path ${e.join(".")}! Parent ${n} at index ${a} is missing!`);r=this._createNode(n,o),o.children[n]=r}o=r}return o},this.addNode=(e,t)=>{this.getNode(e).data=t},this.removeNode=e=>{var t;null===(t=e.parent)||void 0===t||delete t.children[e.key]},this._collectAllParentNodes=(e,t)=>{t.parent&&(e.push(t.parent),this._collectAllParentNodes(e,t.parent))},this.getAllParentNodes=e=>{const t=[];return this._collectAllParentNodes(t,this.getNode(e)),t},this._collectAllChildNodes=(e,t,r)=>{let n;for(const o in e.children)n=e.children[o],r&&!r(n)||(t.push(n),this._collectAllChildNodes(n,t,r))},this.getAllChildNodes=(e,t)=>{const r=[];return this._collectAllChildNodes(this.getNode(e),r,t),r},this.isRootNode=e=>e===this.root,this.makeData=e,this.root=this._createNode("_ROOT_")}}function D(){throw new Error("This component must be used inside a <StateXProvider> component.")}class W{constructor(e={},t=x){this._trie=new J(()=>({holders:new Set,defaultValue:void 0})),this.activeNodes=new Map,this.mutatedNodes=new Set,this.batching=!1,this.pending=[],this.updateSchedule=D,this.renderSchedule=D,this.postUpdateSchedule=D,this.postRenderSchedule=D,this.id=0,this.rendering=!1,this.registerPreUpdateScheduler=e=>{this.updateSchedule=e},this.registerPreRenderScheduler=e=>{this.renderSchedule=e},this.registerPostUpdateScheduler=e=>{this.postUpdateSchedule=e},this.registerPostRenderScheduler=e=>{this.postRenderSchedule=e},this.state=function e(t){if("object"==typeof t&&t.current)throw Error("Ref in deepFreeze!!!");if(!function(e){return!(!N||h(e)||"object"!=typeof e||(e.current?(console.warn("ref cannot be frozen"),1):Object.isFrozen(e)||e instanceof Element||e instanceof Event||function(e){var t,r;if("undefined"==typeof window)return!1;const n=null!==(r=null===(t=e.ownerDocument)||void 0===t?void 0:t.defaultView)&&void 0!==r?r:window;return"function"==typeof n.Node?e instanceof n.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName}(e)||E(e)||_(e)||e instanceof u&&(console.warn("Resolvable cannot be frozen"),1)))}(t))return t;const r=Object.getOwnPropertyNames(t);for(let n of r){let r=t[n];h(r)||"object"!=typeof r||e(r)}return Object.freeze(t)}(e),this.handleError=t}catch(e){this.handleError(e)}afterSelectorGet(e){}afterSelectorSet(e){}beforeSelectorGet(e){}beforeSelectorSet(e){}beforeShouldComponentUpdate(e){}afterShouldComponentUpdate(e){}beforeOnChange(e){}afterOnChange(e){}beforeAtomOnChange(e){}afterAtomOnChange(e){}beforeAtomUpdater(e){}afterAtomUpdater(e){}updatingState(e){}readingState(e){}removingState(e){}afterSelectorReads(){this.activeNodes.size&&this.activeNodes.clear(),this.lastLogItem=void 0,C(!0)}renderingStarted(){this.rendering=!0}renderingCompleted(){this.rendering=!1}afterStateUpdates(){this.activeNodes.size&&this.activeNodes.clear(),this.renderSchedule(),this.postRenderSchedule(),this.processTrackedMutates(),function(e){const t=function(e){const t=new Set;let r,n,o,a;return e.getPendingPaths().forEach(i=>{if(n=e.trie().getNode(i),!R(e,n))return;t.add(n),e.trie().getAllChildNodes(i,t=>R(e,t)).forEach(t.add,t);const s=e.trie().getAllParentNodes(i);for(r=s.length,a=0;a<r&&(o=s[a],!t.has(o));a++)t.add(o)}),t}(e);e.clearPending(),0!==t.size&&t.forEach(t=>{if(!s(t)){const r=$(e,t),{lastKnownValue:n,holders:o,atom:a}=t.data,i=c(n)&&"pending"===n.status;r!==n&&(t.data.lastKnownValue=r,(i||!(null==a?void 0:a.shouldComponentUpdate)||a.shouldComponentUpdate(r,n))&&o.forEach(t=>{if(t.holding){let o=!0;t.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(t.node),o=t.shouldComponentUpdate(r,n),e.afterShouldComponentUpdate(t.node)),(i||o)&&t.setter(i||r),i||t.onChange&&(e.beforeOnChange(t.node),t.onChange({value:r,oldValue:n,get:X(e),set:I(e)}),e.afterOnChange(t.node))}}),(null==a?void 0:a.onChange)&&(e.beforeAtomOnChange(t),a.onChange({value:r,oldValue:n,get:X(e),set:I(e)}),e.afterAtomOnChange(t)))}})}(this)}debug(e,t,r){}activateNode(e,t,r){var n;let o=null!==(n=this.activeNodes.get(e))&&void 0!==n?n:0;if(o>10)throw Error(`Trying to ${t} $${e.path.join(".")} too many times!`);switch(this.activeNodes.set(e,++o),t){case"read":this.renderSchedule(),this.postRenderSchedule();break;default:if(this.updateSchedule(),this.postUpdateSchedule(),this.rendering){const r=`WARNING: Trying to ${t} $${e.path.join(".")} during render!`;this.debug(r,t)}}}addToPending(e,t){this.pending.push(e),this.updateSchedule(),this.postUpdateSchedule()}trie(){return this._trie}startBatch(){this.batching=!0}endBatch(){this.batching=!1}isBatching(){return this.batching}clearPending(){this.pending=[]}getPendingPaths(){return this.pending}getState(){return this.state}setState(e){this.state=e}trackAndMutate(e,t){e.parent&&this.mutatedNodes.add(e.parent),g(!0),this.setState(j(this.getState(),e.path,t)),g(!1)}trackAndRemove(e){e.parent&&this.mutatedNodes.add(e.parent),g(!0),this.setState(w(this.getState(),e.path,0)),g(!1)}processTrackedMutates(){g(!1),this.mutatedNodes.forEach(e=>{let t=O(this.getState(),e.path,void 0);t&&"object"==typeof t&&(t=Array.isArray(t)?[...t]:Object.assign({},t),this.setState(j(this.getState(),e.path,t)))}),this.mutatedNodes.clear()}}const G=Object(n.createContext)({current:new W});function K(){return Object(n.useContext)(G).current}function L(e){console.error("Unhandled Exception!"),console.error(e)}function B({registerPreUpdateScheduler:e,registerPreRenderScheduler:t}){const r=K();r.renderingStarted();const[o,a]=Object(n.useState)([]);e(()=>a([]));const[i,s]=Object(n.useState)([]);return t(()=>s([])),Object(n.useLayoutEffect)(()=>{r.renderingCompleted()},[i,r,o]),Object(n.useEffect)(()=>{r.afterStateUpdates()},[r,o]),Object(n.useEffect)(()=>{C(!1)},[]),null}function H({registerPostUpdateScheduler:e,registerPostRenderScheduler:t}){const r=K(),[,o]=Object(n.useState)([]);e(()=>o([]));const[a,i]=Object(n.useState)([]);return t(()=>i([])),Object(n.useLayoutEffect)(()=>{r.afterSelectorReads()},[a,r]),Object(n.useEffect)(()=>{C(!1)},[]),null}function q({initialState:e={},handleError:t=L,children:r}){const a=Object(n.useMemo)(()=>new W(e,t),[]),i=Object(n.useRef)(a);return o.a.createElement(G.Provider,{value:i},o.a.createElement(B,{registerPreUpdateScheduler:i.current.registerPreUpdateScheduler,registerPreRenderScheduler:i.current.registerPreRenderScheduler}),r,o.a.createElement(H,{registerPostUpdateScheduler:i.current.registerPostUpdateScheduler,registerPostRenderScheduler:i.current.registerPostRenderScheduler}))}function Q(e){return new l(e)}function Y(){const e=K();return Object(n.useMemo)(()=>I(e),[e])}function Z(){const e=K();return Object(n.useMemo)(()=>X(e),[e])}function ee(){return Z()}function te(e,t){const r=ce(e),o=K();return Object(n.useCallback)((...e)=>r.current({get:X(o),set:I(o)},...e),[...t,r,o])}function re(e,t){const r=z(e,null==t?void 0:t.params),o=K(),a=U(o,r),i=ce(t);return Object(n.useCallback)(e=>k(o,a,e,i.current),[o,a,i])}function ne(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else if(e instanceof F)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),n=t}return oe(e,n,r)}function oe(e,t,r){const n=z(e,null==r?void 0:r.params),o=U(K(),n);let a=se(o,e,t,r);return c(a)&&(a=a.resolveIfSelf(o)),a}function ae(e,t){const r=z(e,null==t?void 0:t.params),n=U(K(),r),o=se(n,e,e.defaultValue,t);return c(o)?o:u.withValue(n,o)}function ie(e,t){return[ae(e,t),re(e,t)]}function se(e,t,r,o){var a;const i=K();M(i,t,e),void 0===e.data.defaultValue&&(e.data.defaultValue=r);const c=Object(n.useRef)({setter:x,shouldComponentUpdate:null==o?void 0:o.shouldComponentUpdate,onChange:null==o?void 0:o.onChange,node:e}),[l,d]=Object(n.useState)(u.withValue(e,r,!0));let f;f=t instanceof F?e!==c.current.node?r:l:null!==(a=$(i,e,void 0,!!(null==o?void 0:o.mutableRefObject)))&&void 0!==a?a:r;const h=Object(n.useRef)({defaultValue:r,options:o,currentValue:f}),[,p]=Object(n.useState)(f),v=Object(n.useCallback)(t=>{s(e)?d(t):p(t)},[d,p,e]);return Object(n.useEffect)(()=>{h.current.currentValue=f,h.current.defaultValue=r,h.current.options=o,c.current.shouldComponentUpdate=null==o?void 0:o.shouldComponentUpdate,c.current.onChange=null==o?void 0:o.onChange,c.current.setter=v,c.current.node=e},[f,r,o,e,v]),Object(n.useEffect)(()=>{const{defaultValue:t,options:r}=h.current;if(s(e)){const t=e.data.selector.getValue(i,e,r);d(t)}else{const n=$(i,e,void 0,!!(null==r?void 0:r.mutableRefObject));void 0===n?null!=t&&(v(t),e.data.selector||k(i,e,t,{mutableRefObject:!!(null==r?void 0:r.mutableRefObject)})):v(n)}},[e,v,i]),Object(n.useEffect)(()=>A(e,c.current),[e,c]),f}function ue(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else if(e instanceof F)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),n=t}return[oe(e,n,r),re(e,r)]}function ce(e){const t=Object(n.useRef)(e);return Object(n.useLayoutEffect)(()=>{t.current=e},[e]),t}function le(e){return new F(e)}function de(e,t){const r=z(e,null==t?void 0:t.params),o=K(),a=U(o,r),i=ce(t);return Object(n.useCallback)(()=>function(e,t,r){return function(e,t){const r=e.trie().getNode(t);e.activateNode(r,"remove");const n=$(e,r);return r.data.lastKnownValue=n,e.removingState(r),e.trackAndRemove(r),r.parent&&e.addToPending(r.parent.path,"remove-child"),e.trie().removeNode(r),n}(e,V(t,null==r?void 0:r.params))}(o,a.path,i.current),[a,i,o])}function fe(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),n=t}return[oe(e,n,r),de(e,r)]}function he(e){const t=K(),r=re([]),o=Object(n.useRef)(e),a=Object(n.useRef)(!0);return a.current&&(a.current=!1,t.setState(j(t.getState(),[],e))),Object(n.useEffect)(()=>{JSON.stringify(o.current)!==JSON.stringify(e)&&(r(e),o.current=e)},[r,e]),null}function pe(){const e=K();return Object(n.useCallback)((t,r,n)=>{e.debug(t,r,n)},[e])}function ve(e,t){const r=re(e,t);return[Object(n.useCallback)(e=>r(e.target.value),[r]),r]}function ge(e){const t=Object(n.useRef)(null),r=U(K(),e);return r.data.ref||(r.data.ref=t),Object(n.useEffect)(()=>()=>{r.data.ref=void 0},[r]),r.data.ref}function be(e){return U(K(),e).data.ref}function me(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"string"!=typeof t&&(t=""),n=t}const o=oe(e,n,r),[a]=ve(e,r);return{value:o,onChange:a,type:(null==r?void 0:r.type)||"text"}}function ye(e,t){const r=ne(e,t)||"",[n]=ve(e,t);return{value:r,onChange:n}}function Se(e,t,r){let o;if(e instanceof l)o=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"number"!=typeof t&&(t=0),o=t}const a=oe(e,o,r),[i]=function(e){const t=re(e);return[Object(n.useCallback)(e=>{const r=Number(e.target.value);Number.isNaN(r)||t(r)},[t]),t]}(e);return{value:a,onChange:i,type:"number"}}function Oe(e,t){const r=re(e,t);return[Object(n.useCallback)(()=>{r(e=>!e)},[r]),r]}function je(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),n=t}const o=oe(e,n,r),[a]=Oe(e,r);return[!!o,a]}function we(e,t,r){let n;if(e instanceof l)n=e.defaultValue,r=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),n=t}const o=oe(e,n,r),[a]=Oe(e,r);return{onChange:a,checked:!!o,type:"checkbox"}}function _e(){const e=K();return t=>{const r=[];e.trie().forEach(t,(e,t)=>{r.push(`${"".padStart(2*t,"-")}${e.path.join(".")} ${e.data.holders.size}`),e.data.holders.forEach(e=>{r.push(`${"".padStart(2*t+2," ")}${e.node.path.join(".")}`)})}),console.log(r.join("\n"))}}},198:function(e,t,r){var n=r(241)(Object,"create");e.exports=n},199:function(e,t,r){var n=r(314);e.exports=function(e,t){for(var r=e.length;r--;)if(n(e[r][0],t))return r;return-1}},200:function(e,t,r){var n=r(320);e.exports=function(e,t){var r=e.__data__;return n(t)?r["string"==typeof t?"string":"hash"]:r.map}},212:function(e,t,r){var n=r(300),o="object"==typeof self&&self&&self.Object===Object&&self,a=n||o||Function("return this")();e.exports=a},241:function(e,t,r){var n=r(297),o=r(306);e.exports=function(e,t){var r=o(e,t);return n(r)?r:void 0}},242:function(e,t,r){var n=r(212).Symbol;e.exports=n},243:function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},292:function(e,t,r){var n=r(293);function o(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var r=function(){var n=arguments,o=t?t.apply(this,n):n[0],a=r.cache;if(a.has(o))return a.get(o);var i=e.apply(this,n);return r.cache=a.set(o,i)||a,i};return r.cache=new(o.Cache||n),r}o.Cache=n,e.exports=o},293:function(e,t,r){var n=r(294),o=r(319),a=r(321),i=r(322),s=r(323);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},294:function(e,t,r){var n=r(295),o=r(311),a=r(318);e.exports=function(){this.size=0,this.__data__={hash:new n,map:new(a||o),string:new n}}},295:function(e,t,r){var n=r(296),o=r(307),a=r(308),i=r(309),s=r(310);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},296:function(e,t,r){var n=r(198);e.exports=function(){this.__data__=n?n(null):{},this.size=0}},297:function(e,t,r){var n=r(298),o=r(303),a=r(243),i=r(305),s=/^\[object .+?Constructor\]$/,u=Function.prototype,c=Object.prototype,l=u.toString,d=c.hasOwnProperty,f=RegExp("^"+l.call(d).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!a(e)||o(e))&&(n(e)?f:s).test(i(e))}},298:function(e,t,r){var n=r(299),o=r(243);e.exports=function(e){if(!o(e))return!1;var t=n(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},299:function(e,t,r){var n=r(242),o=r(301),a=r(302),i=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):a(e)}},300:function(e,t,r){(function(t){var r="object"==typeof t&&t&&t.Object===Object&&t;e.exports=r}).call(this,r(70))},301:function(e,t,r){var n=r(242),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,s=n?n.toStringTag:void 0;e.exports=function(e){var t=a.call(e,s),r=e[s];try{e[s]=void 0;var n=!0}catch(u){}var o=i.call(e);return n&&(t?e[s]=r:delete e[s]),o}},302:function(e,t){var r=Object.prototype.toString;e.exports=function(e){return r.call(e)}},303:function(e,t,r){var n,o=r(304),a=(n=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"";e.exports=function(e){return!!a&&a in e}},304:function(e,t,r){var n=r(212)["__core-js_shared__"];e.exports=n},305:function(e,t){var r=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return r.call(e)}catch(t){}try{return e+""}catch(t){}}return""}},306:function(e,t){e.exports=function(e,t){return null==e?void 0:e[t]}},307:function(e,t){e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},308:function(e,t,r){var n=r(198),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(n){var r=t[e];return"__lodash_hash_undefined__"===r?void 0:r}return o.call(t,e)?t[e]:void 0}},309:function(e,t,r){var n=r(198),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return n?void 0!==t[e]:o.call(t,e)}},310:function(e,t,r){var n=r(198);e.exports=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=n&&void 0===t?"__lodash_hash_undefined__":t,this}},311:function(e,t,r){var n=r(312),o=r(313),a=r(315),i=r(316),s=r(317);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},312:function(e,t){e.exports=function(){this.__data__=[],this.size=0}},313:function(e,t,r){var n=r(199),o=Array.prototype.splice;e.exports=function(e){var t=this.__data__,r=n(t,e);return!(r<0)&&(r==t.length-1?t.pop():o.call(t,r,1),--this.size,!0)}},314:function(e,t){e.exports=function(e,t){return e===t||e!=e&&t!=t}},315:function(e,t,r){var n=r(199);e.exports=function(e){var t=this.__data__,r=n(t,e);return r<0?void 0:t[r][1]}},316:function(e,t,r){var n=r(199);e.exports=function(e){return n(this.__data__,e)>-1}},317:function(e,t,r){var n=r(199);e.exports=function(e,t){var r=this.__data__,o=n(r,e);return o<0?(++this.size,r.push([e,t])):r[o][1]=t,this}},318:function(e,t,r){var n=r(241)(r(212),"Map");e.exports=n},319:function(e,t,r){var n=r(200);e.exports=function(e){var t=n(this,e).delete(e);return this.size-=t?1:0,t}},320:function(e,t){e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},321:function(e,t,r){var n=r(200);e.exports=function(e){return n(this,e).get(e)}},322:function(e,t,r){var n=r(200);e.exports=function(e){return n(this,e).has(e)}},323:function(e,t,r){var n=r(200);e.exports=function(e,t){var r=n(this,e),o=r.size;return r.set(e,t),this.size+=r.size==o?0:1,this}}}]);