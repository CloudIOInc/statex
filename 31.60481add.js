(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{132:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return p}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),l=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},h=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=l(n),h=r,p=d["".concat(i,".").concat(h)]||d[h]||f[h]||a;return n?o.a.createElement(p,s(s({ref:t},c),{},{components:n})):o.a.createElement(p,s({ref:t},c))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=h;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},138:function(e,t,n){e.exports=n(145)},145:function(e,t,n){"use strict";n.r(t),n.d(t,"Resolvable",(function(){return u})),n.d(t,"StateXProvider",(function(){return q})),n.d(t,"atom",(function(){return Q})),n.d(t,"hasSelector",(function(){return i})),n.d(t,"hasStateX",(function(){return a})),n.d(t,"isReactElement",(function(){return E})),n.d(t,"isResolvable",(function(){return c})),n.d(t,"isSelectorNode",(function(){return s})),n.d(t,"selector",(function(){return ce})),n.d(t,"useDebug",(function(){return he})),n.d(t,"usePrintTree",(function(){return we})),n.d(t,"useRemoveStateX",(function(){return de})),n.d(t,"useStateX",(function(){return se})),n.d(t,"useStateXCallback",(function(){return Z})),n.d(t,"useStateXForCheckbox",(function(){return je})),n.d(t,"useStateXForNumberInput",(function(){return ye})),n.d(t,"useStateXForSelect",(function(){return me})),n.d(t,"useStateXForTextInput",(function(){return be})),n.d(t,"useStateXForToggle",(function(){return Oe})),n.d(t,"useStateXRef",(function(){return ve})),n.d(t,"useStateXRefValue",(function(){return ge})),n.d(t,"useStateXResolveable",(function(){return oe})),n.d(t,"useStateXValue",(function(){return te})),n.d(t,"useStateXValueGetterWithPath",(function(){return Y})),n.d(t,"useStateXValueRemover",(function(){return le})),n.d(t,"useStateXValueResolveable",(function(){return re})),n.d(t,"useStateXValueSetter",(function(){return ee})),n.d(t,"useWithStateX",(function(){return fe}));var r=n(0),o=n.n(r);function a(e){return void 0!==e.atom}function i(e){return void 0!==e.selector}function s(e){return void 0!==e.data.selector}class u{constructor(e,t){this.cancelled=!1,this.clone=()=>{const e=new u(this.selectorNode,this.self);return e.value=this.value,e.status=this.status,e.promise=this.promise,e.error=this.error,e.cancelled=this.cancelled,e},this.resolveIfSelf=e=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:if(this.selectorNode===e&&this.self)return this.value;throw this.promise}},this.resolve=()=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:return this.value}},this.selectorNode=e,this.status="pending",this.self=t}static withValue(e,t){const n=new u(e,!0);return n.value=t,n.status="resolved",n}}function c(e){return e instanceof u}class l{constructor(e){this.path=e.path,this.defaultValue=e.defaultValue,this.shouldComponentUpdate=e.shouldComponentUpdate,this.updater=e.updater,this.onChange=e.onChange}}function d(e){return null!==e&&Array.isArray(e)}function f(e){return e&&"object"==typeof e}function h(e){return null==e}function p(e){return Array.isArray(e)}let v=!0;function g(e){v=e}function b(e){return Array.isArray(e)?[...e]:Object.assign({},e)}function m(e,t,n){if(d(e)){if("number"==typeof t)return function(e,t,n){if(e[t]===n)return e;if(v&&!Object.isFrozen(e))return e[t]=n,e;if(t===e.length)return[...e,n];{const r=b(e);return r[t]=n,r}}(e,t,n(e.length>t?e[t]:null));throw Error(`Invalid key ${String(t)}. Must be of type number.`)}return f(e)?function(e,t,n){return e[t]===n?e:v&&!Object.isFrozen(e)?(e[t]=n,e):Object.assign(Object.assign({},e),{[t]:n})}(e,t,n(e[t])):e}function y(e,t,n){return m(e,t,()=>n)}function S(e,t){if(d(e)){if("number"==typeof t)return e.length>t?e[t]:void 0;throw Error(`Invalid key ${t}. Must be of type number.`)}return f(e)?e[t]:null}function O(e,t,n){const r=function e(t,n,r){const o=n[r];if(n.length===r+1)return S(t,o);const a=S(t,o);if(h(a))return null;if(!f(a))throw console.log(t,n,r),Error(`Invalid path ${JSON.stringify(n)} at index ${r}. Must be an object. Instead found ${a}`);return e(a,n,r+1)}(e,t,0);return h(r)?n:r}function j(e,t,n){return function(e,t,n){return function e(t,n,r,o,a){if(0===n.length&&0===r)return o(t);const i=n[r];if(n.length===r+1)try{if(a){if("number"==typeof i&&d(t))return function(e,t,n){if(d(e)){if(t<e.length){const r=e.slice(0,t),o=e.slice(t);return[...r,n(e[t]),...o]}if(t===e.length)return[...e,n(null)];throw Error(`Index out of bound! Index ${t}. Size ${e.length}.`)}throw Error("insert called on invalid collection. collection must be of type Array.")}(t,i,o);throw Error("insertIn called on invalid collection. \n          leaf collection must be of type Array \n          & leaf path must be a number.")}return m(t,i,o)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)}.`)}let s,u;try{s=S(t,i)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)} at index ${r}.`)}if(h(s))u="number"==typeof n[r+1]?[]:{};else{if(!f(s))throw Error(`Invalid path ${JSON.stringify(n)} at index ${r}. Must be an object.`);u=s}if(u=e(u,n,r+1,o,a),u===s)return t;try{return y(t,i,u)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)} at index ${r}.`)}}(e,t,0,n,!1)}(e,t,()=>n)}function w(e,t,n){const r=t[n];if(t.length===n+1)return function(e,t){if(function(e,t){if(d(e)){if("number"==typeof t)return e.hasOwnProperty(t);throw Error(`Invalid key ${t}. Must be of type number.`)}return!!f(e)&&e.hasOwnProperty(t)}(e,t)){if(d(e)){if("number"==typeof t)return[...e.slice(0,t),...e.slice(t+1)];throw Error(`Invalid key ${t}. Must be of type number.`)}const n=b(e);if(f(n))return delete n[t],n}return e}(e,r);const o=S(e,r);let a;return null==o?e:(a=function(e,t){if(null!==e&&(Array.isArray(e)||"object"==typeof e))return e;throw Error(t)}(o,`Invalid path ${JSON.stringify(t)} at index ${n}. Must be an object.`),a=w(a,t,n+1),a===o?e:y(e,r,a))}function _(e){return e instanceof Promise||"object"==typeof e&&"function"==typeof e.then}function E(e){switch(typeof e.$$typeof){case"symbol":case"number":return!0}return!1}let N=!1;function C(e){N=!e,g(e)}function P(){}const x=Object.freeze({});function V(e,t){if(!t||0===Object.keys(t).length)return e;const n=[...e];Object.entries(t).forEach(e=>{const t=n.indexOf(":"+e[0]);-1!==t&&(n[t]=e[1])});const r=n.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(r.length)throw Error(`Missing parameter values for ${r.join(", ")} in path ${JSON.stringify(n)}. Params passed ${JSON.stringify(t)}`);return n}function $(e,t,n,r=!0){if(0===t.path.length)return e.getState();const o=O(e.getState(),t.path,n);return void 0===o?n:o}function R(e,t){const n=$(e,t);return t.data.lastKnownValue!==n}function U(e,t){const n=t.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(n.length)throw Error(`Missing parameter values for ${n.join(", ")} in path ${JSON.stringify(t)}!`);return e.trie().getNode(t)}function A(e,t){return e.data.holders.add(t),t.holding=!0,()=>{t.holding=!1,e.data.holders.delete(t)}}function k(e,t,n,r){return function(e,t,n,r){var o;let a,i;if(e.activateNode(t,"update",n),s(t))i=t.data.selector.setValue(e,t,n,r);else{const r=$(e,t);if(a=function(e){return"function"!=typeof e}(n)?n:n(r),a===r)return r;if("function"==typeof(null===(o=t.data.atom)||void 0===o?void 0:o.updater)&&(e.beforeAtomUpdater(t),a=t.data.atom.updater({value:a,oldValue:r,get:I(e),set:X(e)}),e.afterAtomUpdater(t)),a===r)return r;i=a,e.updatingState(t),e.trackAndMutate(t,a),e.addToPending(t.path,"update")}return i}(e,t,n,r)}function M(e,t,n){const r=function(e,t,n){var r;const{mutableRefObject:o,params:a}=n||x,i=U(e,V(t,a));return s(i)?i.data.selector.getValue(e,i,n):null!==(r=$(e,i,void 0,o))&&void 0!==r?r:i.data.defaultValue}(e,t,n);return c(r)?r.resolve():r}function z(e,t,n){t instanceof l&&n.data.atom!==t?(n.data.atom=t,n.data.defaultValue=t.defaultValue,void 0===O(e.getState(),n.path,void 0)&&e.trackAndMutate(n,t.defaultValue)):t instanceof F&&n.data.selector!==t&&(n.data.selector=t,s(n)&&(n.data.initialized=!1))}function I(e,t){return(n,r)=>{let o;o=n instanceof F?V(n.pathWithParams,null==r?void 0:r.params):n instanceof l?V(n.path,null==r?void 0:r.params):n;const a=U(e,o);z(e,n,a),t&&t.add(U(e,o));const i=M(e,o,r);return c(i)?i.resolve():i}}function X(e){return(t,n,r)=>{let o;o=t instanceof F?V(t.pathWithParams,null==r?void 0:r.params):t instanceof l?V(t.path,null==r?void 0:r.params):t;const a=U(e,o);return z(e,t,a),k(e,a,n,r)}}function T(){throw Error("Not a writable selector!")}class F{constructor({path:e,get:t,set:n,shouldComponentUpdate:r,defaultValue:o}){this.dynamic=!1,this.params=new Map,this._evaluate=(e,t)=>{const{get:n,set:r,options:o}=t,a=U(e,V(this.pathWithParams,null==o?void 0:o.params));let i;e.activateNode(a,"read"),e.beforeSelectorGet(a);try{i=this._get({get:n,set:r,params:null==o?void 0:o.params})}catch(t){return this.makeResolvable(e,a,!1,t,null==o?void 0:o.params)}finally{e.afterSelectorGet(a)}return _(i)?this.makeResolvable(e,a,!0,i,null==o?void 0:o.params):(a.data.selectorValue=i,i)},this.getValue=(e,t,n)=>{var r;return t.data.initialized?t.data.resolveable?t.data.resolveable:t.data.selectorValue:(null===(r=t.data.previousNodes)||void 0===r||r.forEach(e=>{var n;null===(n=t.data.unregisterMap.get(e))||void 0===n||n()}),t.data.unregisterMap=new Map,t.data.previousNodes=new Set,t.data.initialized=!0,this.selectValueWithStateXHolder(e,n))},this.setValue=(e,t,n,r)=>{try{return e.beforeSelectorSet(t),this._set({set:X(e),get:I(e),params:null==r?void 0:r.params,value:n})}catch(t){throw e.catch(t),t}finally{e.afterSelectorSet(t)}},this.watchStateXForSelector=(e,t,n,r)=>{const o=t.data.unregisterMap.get(n);o&&(console.warn("Node already registered",t.path.join("."),n.path.join(".")),o());const a={setter:()=>{},node:t},i=A(n,a);a.setter=()=>this.update(e,t,r),t.data.unregisterMap.set(n,i)},this.update=(e,t,n)=>{const r=this.selectValueWithStateXHolder(e,n);if(c(r))try{t.data.holders.forEach(e=>e.setter(r))}catch(e){console.error(e)}else t.data.selectorValue=r,this.inform(e,r,t,!0)},this.selectValueWithStateXHolder=(e,t)=>{const n=V(this.pathWithParams,null==t?void 0:t.params),r=U(e,n),o=new Set,a=this._evaluate(e,{get:I(e,o),set:X(e),options:t});return o.forEach(n=>{r.data.previousNodes.has(n)?r.data.previousNodes.delete(n):this.watchStateXForSelector(e,r,n,t)}),r.data.previousNodes.forEach(e=>{var t;null===(t=r.data.unregisterMap.get(e))||void 0===t||t()}),r.data.previousNodes=o,a},this._get=t,this._set=null!=n?n:T,this.defaultValue=o,this.pathWithParams=e,this.shouldComponentUpdate=r;for(let a=0;a<e.length;a++){const t=e[a];"string"==typeof t&&":"===t.charAt(0)&&this.params.set(t.substr(1),a)}this.params.size&&(this.dynamic=!0)}makeResolvable(e,t,n,r,o){t.data.resolveable&&(t.data.resolveable.cancelled=!0);const a=new u(t,n);return _(r)?(a.promise=r,r.then(r=>(a.value=r,a.status="resolved",a.cancelled||(n?(t.data.resolveable=a.clone(),t.data.selectorValue=r,this.inform(e,r,t,n)):this.update(e,t,o)),r)).catch(e=>{if(a.error=e,a.status="error",!a.cancelled)try{t.data.resolveable=a.clone(),t.data.holders.forEach(e=>e.setter(t.data.resolveable))}catch(e){console.error(e)}})):(a.error=r,a.status="error"),t.data.resolveable=a,a}inform(e,t,n,r){const{oldValue:o}=n.data;n.data.oldValue=t;let a=!0;this.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(n),a=this.shouldComponentUpdate(t,o),e.afterShouldComponentUpdate(n)),a&&n.data.holders.forEach(n=>{if(n.holding){let r=!0;n.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(n.node),r=n.shouldComponentUpdate(t,o),e.afterShouldComponentUpdate(n.node)),r&&n.setter(t),n.onChange&&(e.beforeOnChange(n.node),n.onChange({value:t,oldValue:o,get:I(e),set:X(e)}),e.afterOnChange(n.node))}})}}class J{constructor(e){this._createNode=(e,t)=>({children:{},key:e,parent:t,path:t?[...t.path,e]:[],data:this.makeData(e,t)}),this._forEach=(e,t,n)=>{n(e,t),Object.values(e.children).forEach(e=>{this._forEach(e,t+1,n)})},this.forEach=(e,t)=>{const n=this.getNode(e);this._forEach(n,0,t)},this.getNode=(e,t=!0)=>{let n,r,o=this.root;for(let a=0;a<e.length;a++){if(r=e[a],n=o.children[r],!n){if(!t)throw Error(`Node not found at path ${e.join(".")}! Parent ${r} at index ${a} is missing!`);n=this._createNode(r,o),o.children[r]=n}o=n}return o},this.addNode=(e,t)=>{this.getNode(e).data=t},this.removeNode=e=>{var t;null===(t=e.parent)||void 0===t||delete t.children[e.key]},this._collectAllParentNodes=(e,t)=>{t.parent&&(e.push(t.parent),this._collectAllParentNodes(e,t.parent))},this.getAllParentNodes=e=>{const t=[];return this._collectAllParentNodes(t,this.getNode(e)),t},this._collectAllChildNodes=(e,t,n)=>{let r;for(const o in e.children)r=e.children[o],n&&!n(r)||(t.push(r),this._collectAllChildNodes(r,t,n))},this.getAllChildNodes=(e,t)=>{const n=[];return this._collectAllChildNodes(this.getNode(e),n,t),n},this.isRootNode=e=>e===this.root,this.makeData=e,this.root=this._createNode("_ROOT_")}}function W(){throw new Error("This component must be used inside a <StateXProvider> component.")}class D{constructor(e={},t=P){this._trie=new J(()=>({holders:new Set,defaultValue:void 0})),this.activeNodes=new Map,this.mutatedNodes=new Set,this.batching=!1,this.pending=[],this.updateSchedule=W,this.renderSchedule=W,this.postUpdateSchedule=W,this.postRenderSchedule=W,this.id=0,this.rendering=!1,this.registerPreUpdateScheduler=e=>{this.updateSchedule=e},this.registerPreRenderScheduler=e=>{this.renderSchedule=e},this.registerPostUpdateScheduler=e=>{this.postUpdateSchedule=e},this.registerPostRenderScheduler=e=>{this.postRenderSchedule=e},this.state=function e(t){if("object"==typeof t&&t.current)throw Error("Ref in deepFreeze!!!");if(!function(e){return!(!N||h(e)||"object"!=typeof e||(e.current?(console.warn("ref cannot be frozen"),1):Object.isFrozen(e)||e instanceof Element||e instanceof Event||function(e){var t,n;if("undefined"==typeof window)return!1;const r=null!==(n=null===(t=e.ownerDocument)||void 0===t?void 0:t.defaultView)&&void 0!==n?n:window;return"function"==typeof r.Node?e instanceof r.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName}(e)||E(e)||_(e)||e instanceof u&&(console.warn("Resolvable cannot be frozen"),1)))}(t))return t;const n=Object.getOwnPropertyNames(t);for(let r of n){let n=t[r];h(n)||"object"!=typeof n||e(n)}return Object.freeze(t)}(e),this.handleError=t}catch(e){this.handleError(e)}afterSelectorGet(e){}afterSelectorSet(e){}beforeSelectorGet(e){}beforeSelectorSet(e){}beforeShouldComponentUpdate(e){}afterShouldComponentUpdate(e){}beforeOnChange(e){}afterOnChange(e){}beforeAtomOnChange(e){}afterAtomOnChange(e){}beforeAtomUpdater(e){}afterAtomUpdater(e){}updatingState(e){}readingState(e){}removingState(e){}afterSelectorReads(){if(this.activeNodes.size){const e=["Derived nodes during render..."];this.activeNodes.forEach((t,n)=>e.push(n.path.join("."))),this.debug(e.join(", "),"render"),this.activeNodes.clear()}this.lastLogItem=void 0,C(!0)}renderingStarted(){this.rendering=!0}renderingCompleted(){this.rendering=!1}afterStateUpdates(){if(this.activeNodes.size){const e=["Changed Nodes during update..."];this.activeNodes.forEach((t,n)=>e.push(n.path.join("."))),this.debug(e.join(", "),"event"),this.activeNodes.clear()}this.renderSchedule(),this.postRenderSchedule(),this.processTrackedMutates(),function(e){const t=function(e){const t=new Set;let n,r,o,a;return e.getPendingPaths().forEach(i=>{if(r=e.trie().getNode(i),!R(e,r))return;t.add(r),e.trie().getAllChildNodes(i,t=>R(e,t)).forEach(t.add,t);const s=e.trie().getAllParentNodes(i);for(n=s.length,a=0;a<n&&(o=s[a],!t.has(o));a++)t.add(o)}),t}(e);e.clearPending(),0!==t.size&&t.forEach(t=>{if(!s(t)){const n=$(e,t),{lastKnownValue:r,holders:o,atom:a}=t.data,i=c(r)&&"pending"===r.status;n!==r&&(t.data.lastKnownValue=n,(i||!(null==a?void 0:a.shouldComponentUpdate)||a.shouldComponentUpdate(n,r))&&o.forEach(t=>{if(t.holding){let o=!0;t.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(t.node),o=t.shouldComponentUpdate(n,r),e.afterShouldComponentUpdate(t.node)),(i||o)&&t.setter(i||n),i||t.onChange&&(e.beforeOnChange(t.node),t.onChange({value:n,oldValue:r,get:I(e),set:X(e)}),e.afterOnChange(t.node))}}),(null==a?void 0:a.onChange)&&(e.beforeAtomOnChange(t),a.onChange({value:n,oldValue:r,get:I(e),set:X(e)}),e.afterAtomOnChange(t)))}})}(this)}debug(e,t,n){}activateNode(e,t,n){var r;let o=null!==(r=this.activeNodes.get(e))&&void 0!==r?r:0;if(o>10)throw Error(`Trying to ${t} $${e.path.join(".")} too many times!`);switch(this.activeNodes.set(e,++o),t){case"read":this.renderSchedule(),this.postRenderSchedule();break;default:if(this.updateSchedule(),this.postUpdateSchedule(),this.rendering){const n=`WARNING: Trying to ${t} $${e.path.join(".")} during render!`;this.debug(n,t)}}}addToPending(e,t){this.pending.push(e),this.updateSchedule(),this.postUpdateSchedule()}trie(){return this._trie}startBatch(){this.batching=!0}endBatch(){this.batching=!1}isBatching(){return this.batching}clearPending(){this.pending=[]}getPendingPaths(){return this.pending}getState(){return this.state}setState(e){this.state=e}trackAndMutate(e,t){e.parent&&this.mutatedNodes.add(e.parent),g(!0),this.setState(j(this.getState(),e.path,t)),g(!1)}processTrackedMutates(){g(!1),this.mutatedNodes.forEach(e=>{let t=O(this.getState(),e.path,void 0);t&&"object"==typeof t&&(t=Array.isArray(t)?[...t]:Object.assign({},t),this.setState(j(this.getState(),e.path,t)))}),this.mutatedNodes.clear()}}const G=Object(r.createContext)({current:new D});function K(){return Object(r.useContext)(G).current}function L(e){console.error("Unhandled Exception!"),console.error(e)}function B({registerPreUpdateScheduler:e,registerPreRenderScheduler:t}){const n=K();n.renderingStarted();const[o,a]=Object(r.useState)([]);e(()=>a([]));const[i,s]=Object(r.useState)([]);return t(()=>s([])),Object(r.useLayoutEffect)(()=>{n.renderingCompleted()},[i,n,o]),Object(r.useEffect)(()=>{n.afterStateUpdates()},[n,o]),Object(r.useEffect)(()=>{C(!1)},[]),null}function H({registerPostUpdateScheduler:e,registerPostRenderScheduler:t}){const n=K(),[,o]=Object(r.useState)([]);e(()=>o([]));const[a,i]=Object(r.useState)([]);return t(()=>i([])),Object(r.useLayoutEffect)(()=>{n.afterSelectorReads()},[a,n]),Object(r.useEffect)(()=>{C(!1)},[]),null}function q({initialState:e={},handleError:t=L,children:n}){const a=Object(r.useMemo)(()=>new D(e,t),[]),i=Object(r.useRef)(a);return o.a.createElement(G.Provider,{value:i},o.a.createElement(B,{registerPreUpdateScheduler:i.current.registerPreUpdateScheduler,registerPreRenderScheduler:i.current.registerPreRenderScheduler}),n,o.a.createElement(H,{registerPostUpdateScheduler:i.current.registerPostUpdateScheduler,registerPostRenderScheduler:i.current.registerPostRenderScheduler}))}function Q(e){return new l(e)}function Y(){const e=K();return Object(r.useCallback)((t,n)=>M(e,t,n),[e])}function Z(e,t){const n=K();return Object(r.useCallback)(()=>e({get:I(n),set:X(n)}),[e,n])}function ee(e,t){let n;n=e instanceof l?e.path:e instanceof F?e.pathWithParams:e,n=V(n,null==t?void 0:t.params);const o=K(),a=U(o,n),i=ue(t);return Object(r.useCallback)(e=>{try{return k(o,a,e,i.current)}catch(e){return void console.error(e)}},[o,a,i])}function te(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else if(e instanceof F)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return ne(e,r,n)}function ne(e,t,n){let r=ie(e);r=V(r,null==n?void 0:n.params);const o=U(K(),r);let a=ae(o,e,t,n);return c(a)&&(a=a.resolveIfSelf(o)),a}function re(e,t){let n=ie(e);n=V(n,null==t?void 0:t.params);const r=U(K(),n),o=ae(r,e,e.defaultValue,t);return c(o)?o:u.withValue(r,o)}function oe(e,t){return[re(e,t),ee(e,t)]}function ae(e,t,n,o){var a;const i=K();z(i,t,e),void 0===e.data.defaultValue&&(e.data.defaultValue=n);const u=Object(r.useRef)({setter:P,shouldComponentUpdate:null==o?void 0:o.shouldComponentUpdate,onChange:null==o?void 0:o.onChange,node:e}),[c,l]=Object(r.useState)(n);let d;d=t instanceof F?c:null!==(a=$(i,e,void 0,!!(null==o?void 0:o.mutableRefObject)))&&void 0!==a?a:n;const f=Object(r.useRef)({defaultValue:n,options:o,currentValue:d}),[,h]=Object(r.useState)(d),p=Object(r.useCallback)(t=>{s(e)?l(t):h(t)},[l,h,e]);return Object(r.useEffect)(()=>{f.current.currentValue=d,f.current.defaultValue=n,f.current.options=o,u.current.shouldComponentUpdate=null==o?void 0:o.shouldComponentUpdate,u.current.onChange=null==o?void 0:o.onChange,u.current.setter=p,u.current.node=e},[d,n,o,e,p]),Object(r.useEffect)(()=>{const{defaultValue:t,options:n}=f.current;if(s(e)){const t=e.data.selector.getValue(i,e,n);l(t)}else{const r=$(i,e,void 0,!!(null==n?void 0:n.mutableRefObject));void 0===r?null!=t&&(p(t),e.data.selector||k(i,e,t,{mutableRefObject:!!(null==n?void 0:n.mutableRefObject)})):p(r)}},[e,p,i]),Object(r.useEffect)(()=>A(e,u.current),[e,u]),d}function ie(e){let t;return t=e instanceof l?e.path:e instanceof F?e.pathWithParams:e,t}function se(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else if(e instanceof F)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return[ne(e,r,n),ee(e,n)]}function ue(e){const t=Object(r.useRef)(e);return Object(r.useLayoutEffect)(()=>{t.current=e},[e]),t}function ce(e){return new F(e)}function le(e,t){let n;n=e instanceof l?e.path:e,n=V(n,null==t?void 0:t.params);const o=K(),a=U(o,n),i=ue(t);return Object(r.useCallback)(()=>function(e,t,n){return function(e,t){const n=e.trie().getNode(t);e.activateNode(n,"remove");const r=$(e,n);return n.data.lastKnownValue=r,e.removingState(n),e.setState(function(e,t){return w(e,t,0)}(e.getState(),t)),n.parent&&e.addToPending(n.parent.path,"remove-child"),e.trie().removeNode(n),r}(e,V(t,null==n?void 0:n.params))}(o,a.path,i.current),[a,i,o])}function de(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return[ne(e,r,n),le(e,n)]}function fe(e){const t=ee([]),n=Object(r.useRef)(e);return Object(r.useEffect)(()=>{t(e)},[]),Object(r.useEffect)(()=>{JSON.stringify(n.current)!==JSON.stringify(e)&&(t(e),n.current=e)},[t,e]),null}function he(){const e=K();return Object(r.useCallback)((t,n,r)=>{e.debug(t,n,r)},[e])}function pe(e,t){const n=ee(e,t);return[Object(r.useCallback)(e=>n(e.target.value),[n]),n]}function ve(e){const t=Object(r.useRef)(null),n=U(K(),e);return n.data.ref||(n.data.ref=t),Object(r.useEffect)(()=>()=>{n.data.ref=void 0},[n]),n.data.ref}function ge(e){return U(K(),e).data.ref}function be(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"string"!=typeof t&&(t=""),r=t}const o=ne(e,r,n),[a]=pe(e,n);return{value:o,onChange:a,type:(null==n?void 0:n.type)||"text"}}function me(e,t){const n=te(e,t)||"",[r]=pe(e,t);return{value:n,onChange:r}}function ye(e,t,n){let o;if(e instanceof l)o=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"number"!=typeof t&&(t=0),o=t}const a=ne(e,o,n),[i]=function(e){const t=ee(e);return[Object(r.useCallback)(e=>{const n=Number(e.target.value);Number.isNaN(n)||t(n)},[t]),t]}(e);return{value:a,onChange:i,type:"number"}}function Se(e,t){const n=ee(e,t);return[Object(r.useCallback)(()=>{n(e=>!e)},[n]),n]}function Oe(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),r=t}const o=ne(e,r,n),[a]=Se(e,n);return[!!o,a]}function je(e,t,n){let r;if(e instanceof l)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),r=t}const o=ne(e,r,n),[a]=Se(e,n);return{onChange:a,checked:!!o,type:"checkbox"}}function we(){const e=K();return t=>{const n=[];e.trie().forEach(t,(e,t)=>{n.push(`${"".padStart(2*t,"-")}${e.path.join(".")} ${e.data.holders.size}`),e.data.holders.forEach(e=>{n.push(`${"".padStart(2*t+2," ")}${e.node.path.join(".")}`)})}),console.log(n.join("\n"))}}},150:function(e,t,n){var r=n(187)(Object,"create");e.exports=r},151:function(e,t,n){var r=n(260);e.exports=function(e,t){for(var n=e.length;n--;)if(r(e[n][0],t))return n;return-1}},152:function(e,t,n){var r=n(266);e.exports=function(e,t){var n=e.__data__;return r(t)?n["string"==typeof t?"string":"hash"]:n.map}},162:function(e,t,n){var r=n(246),o="object"==typeof self&&self&&self.Object===Object&&self,a=r||o||Function("return this")();e.exports=a},187:function(e,t,n){var r=n(243),o=n(252);e.exports=function(e,t){var n=o(e,t);return r(n)?n:void 0}},188:function(e,t,n){var r=n(162).Symbol;e.exports=r},189:function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},238:function(e,t,n){var r=n(239);function o(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],a=n.cache;if(a.has(o))return a.get(o);var i=e.apply(this,r);return n.cache=a.set(o,i)||a,i};return n.cache=new(o.Cache||r),n}o.Cache=r,e.exports=o},239:function(e,t,n){var r=n(240),o=n(265),a=n(267),i=n(268),s=n(269);function u(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},240:function(e,t,n){var r=n(241),o=n(257),a=n(264);e.exports=function(){this.size=0,this.__data__={hash:new r,map:new(a||o),string:new r}}},241:function(e,t,n){var r=n(242),o=n(253),a=n(254),i=n(255),s=n(256);function u(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},242:function(e,t,n){var r=n(150);e.exports=function(){this.__data__=r?r(null):{},this.size=0}},243:function(e,t,n){var r=n(244),o=n(249),a=n(189),i=n(251),s=/^\[object .+?Constructor\]$/,u=Function.prototype,c=Object.prototype,l=u.toString,d=c.hasOwnProperty,f=RegExp("^"+l.call(d).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!a(e)||o(e))&&(r(e)?f:s).test(i(e))}},244:function(e,t,n){var r=n(245),o=n(189);e.exports=function(e){if(!o(e))return!1;var t=r(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},245:function(e,t,n){var r=n(188),o=n(247),a=n(248),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):a(e)}},246:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(52))},247:function(e,t,n){var r=n(188),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=a.call(e,s),n=e[s];try{e[s]=void 0;var r=!0}catch(u){}var o=i.call(e);return r&&(t?e[s]=n:delete e[s]),o}},248:function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},249:function(e,t,n){var r,o=n(250),a=(r=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";e.exports=function(e){return!!a&&a in e}},250:function(e,t,n){var r=n(162)["__core-js_shared__"];e.exports=r},251:function(e,t){var n=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return n.call(e)}catch(t){}try{return e+""}catch(t){}}return""}},252:function(e,t){e.exports=function(e,t){return null==e?void 0:e[t]}},253:function(e,t){e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},254:function(e,t,n){var r=n(150),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(r){var n=t[e];return"__lodash_hash_undefined__"===n?void 0:n}return o.call(t,e)?t[e]:void 0}},255:function(e,t,n){var r=n(150),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return r?void 0!==t[e]:o.call(t,e)}},256:function(e,t,n){var r=n(150);e.exports=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=r&&void 0===t?"__lodash_hash_undefined__":t,this}},257:function(e,t,n){var r=n(258),o=n(259),a=n(261),i=n(262),s=n(263);function u(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},258:function(e,t){e.exports=function(){this.__data__=[],this.size=0}},259:function(e,t,n){var r=n(151),o=Array.prototype.splice;e.exports=function(e){var t=this.__data__,n=r(t,e);return!(n<0)&&(n==t.length-1?t.pop():o.call(t,n,1),--this.size,!0)}},260:function(e,t){e.exports=function(e,t){return e===t||e!=e&&t!=t}},261:function(e,t,n){var r=n(151);e.exports=function(e){var t=this.__data__,n=r(t,e);return n<0?void 0:t[n][1]}},262:function(e,t,n){var r=n(151);e.exports=function(e){return r(this.__data__,e)>-1}},263:function(e,t,n){var r=n(151);e.exports=function(e,t){var n=this.__data__,o=r(n,e);return o<0?(++this.size,n.push([e,t])):n[o][1]=t,this}},264:function(e,t,n){var r=n(187)(n(162),"Map");e.exports=r},265:function(e,t,n){var r=n(152);e.exports=function(e){var t=r(this,e).delete(e);return this.size-=t?1:0,t}},266:function(e,t){e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},267:function(e,t,n){var r=n(152);e.exports=function(e){return r(this,e).get(e)}},268:function(e,t,n){var r=n(152);e.exports=function(e){return r(this,e).has(e)}},269:function(e,t,n){var r=n(152);e.exports=function(e,t){var n=r(this,e),o=n.size;return n.set(e,t),this.size+=n.size==o?0:1,this}}}]);