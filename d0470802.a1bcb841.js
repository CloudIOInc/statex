(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{168:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return j})),n.d(t,"metadata",(function(){return w})),n.d(t,"rightToc",(function(){return E})),n.d(t,"default",(function(){return C}));var r=n(2),a=n(9),o=n(0),i=n.n(o),s=n(170),u=n(175),l=(n(56),n(18),{display:"flex"}),c={display:"flex",flexDirection:"column",padding:20,whiteSpace:"nowrap"},d={flex:1,padding:20},f=[{key:"Lorem"},{key:"Mauris"},{key:"Nam"},{key:"Curabitur"}],h={Lorem:[{key:"Lorem",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas iaculis nibh, vel vestibulum augue. Nunc imperdiet, tortor et accumsan egestas, nisl mi porta mi, bibendum congue libero orci sit amet orci. Ut pharetra at urna a accumsan. Nulla leo felis, tristique eget metus maximus, rhoncus ornare ante. Donec mi est, aliquet pretium placerat id, dignissim in erat. Suspendisse convallis a mauris id tincidunt. Curabitur et mattis arcu, ac sodales massa. Praesent porttitor mauris eu nunc tempor, sit amet imperdiet lacus vulputate. Aliquam scelerisque risus eu elementum molestie. Aenean blandit euismod molestie."}],Mauris:[{key:"Mauris",desc:"Mauris ac sollicitudin odio. Integer nec viverra purus. Quisque eget sodales velit, et pulvinar enim. Pellentesque pulvinar faucibus lorem, at sagittis lectus suscipit ut. Phasellus tristique enim eu feugiat rutrum. Quisque sollicitudin eros erat, eget rhoncus arcu euismod in. Sed non enim nulla. Duis non sagittis lorem. Fusce at vulputate dui, at faucibus turpis. In vel cursus dolor, quis hendrerit urna. Proin non ultricies augue, semper placerat sem. Sed at metus quis nisl sodales consectetur in in dolor."}],Nam:[{key:"Nam",desc:"Nam convallis efficitur faucibus. Suspendisse molestie mauris vitae turpis vestibulum, vel finibus dolor tempus. Nullam non urna sed neque dignissim pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium diam vitae mollis elementum. In vitae pretium sem, ut euismod enim. Fusce varius justo in massa viverra, ac pellentesque libero dignissim. Sed ullamcorper eleifend diam. Ut leo turpis, pharetra nec ipsum vitae, elementum dignissim sem. Donec eu lectus eget tellus pharetra vulputate. Vivamus non mi ac turpis accumsan egestas at iaculis lectus."}],Curabitur:[{key:"Curabitur",desc:"Curabitur efficitur laoreet libero non vulputate. Fusce ultricies sapien in ligula rhoncus accumsan. Nunc ac est blandit tellus convallis maximus nec quis risus. Mauris tincidunt sapien id lacinia mollis. Curabitur suscipit egestas ante at porta. Nam dui justo, lobortis a auctor et, viverra non nunc. Quisque cursus aliquet tortor eget finibus. Suspendisse potenti. Vestibulum neque augue, suscipit vitae augue ut, tristique imperdiet leo. Suspendisse ante mi, pharetra quis pretium facilisis, dignissim in neque. Donec vehicula sem nec leo rutrum tincidunt. Nulla facilisi."}]},p=Object(u.atom)({path:["data","activeMaster"],defaultValue:null}),m=Object(u.selector)({path:["data","master"],defaultValue:[],get:function(){return new Promise((function(e){setTimeout((function(){return e(f)}),1e3)}))}}),b=Object(u.selector)({path:["data","details",":key"],defaultValue:[],get:function(e){var t=e.params;return(null==t?void 0:t.key)?new Promise((function(e){setTimeout((function(){return e(h[t.key])}),1e3)})):[]}});function g(){var e;const t=Object(u.useStateXValue)(p),n=Object(u.useStateXValue)(b,{params:{key:null!==(e=null==t?void 0:t.key)&&void 0!==e?e:"DEFAULT"}});return t&&n?i.a.createElement(i.a.Fragment,null,t.key,n.map(e=>i.a.createElement("div",{key:e.key},e.desc))):i.a.createElement("div",null,"\u261c Click on a master link...")}function v(){const e=Object(u.useStateXValue)(m),[t,n]=Object(u.useStateX)(p);return i.a.createElement(i.a.Fragment,null,e.map(e=>i.a.createElement("div",{key:e.key},t===e?i.a.createElement(i.a.Fragment,null,"\u27a3 "):null,i.a.createElement("a",{href:"#/",onClick:()=>n(e)},e.key))))}function y(){return i.a.createElement("div",{style:l},i.a.createElement("div",{style:c},i.a.createElement(o.Suspense,{fallback:"Loading Master..."},i.a.createElement(v,null))),i.a.createElement("div",{style:d},i.a.createElement(o.Suspense,{fallback:"Loading Details..."},i.a.createElement(g,null))))}var S=n(24);function O(){return S.a.canUseDOM?i.a.createElement(u.StateXProvider,null,i.a.createElement(y,null)):null}var j={id:"master-detail",title:"Master Detail"},w={id:"examples/master-detail",title:"Master Detail",description:"In this example, both master & details are load using async selectors.",source:"@site/docs/examples/master-detail.md",permalink:"/statex/docs/examples/master-detail",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/examples/master-detail.md",sidebar:"someSidebar",previous:{title:"Canvas",permalink:"/statex/docs/examples/canvas"},next:{title:"TodoMVC",permalink:"/statex/docs/examples/todomvc"}},E=[],N={rightToc:E};function C(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},N,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"In this example, both master & details are load using async ",Object(s.b)("a",Object(r.a)({parentName:"p"},{href:"../api-reference/core/selector"}),"selectors"),"."),Object(s.b)(O,{mdxType:"App"}),Object(s.b)("p",null,Object(s.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex/blob/master/website/src/components/master-details/App.tsx"}),"View this code on github")))}C.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return p}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),c=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=c(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},h=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,p=d["".concat(i,".").concat(h)]||d[h]||f[h]||o;return n?a.a.createElement(p,s(s({ref:t},l),{},{components:n})):a.a.createElement(p,s({ref:t},l))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},175:function(e,t,n){e.exports=n(183)},183:function(e,t,n){"use strict";n.r(t),n.d(t,"Resolvable",(function(){return u})),n.d(t,"StateXProvider",(function(){return H})),n.d(t,"atom",(function(){return Q})),n.d(t,"hasSelector",(function(){return i})),n.d(t,"hasStateX",(function(){return o})),n.d(t,"isReactElement",(function(){return N})),n.d(t,"isResolvable",(function(){return l})),n.d(t,"isSelectorNode",(function(){return s})),n.d(t,"selector",(function(){return ce})),n.d(t,"useDebug",(function(){return pe})),n.d(t,"usePrintTree",(function(){return Ee})),n.d(t,"useRemoveStateX",(function(){return fe})),n.d(t,"useStateX",(function(){return ue})),n.d(t,"useStateXCallback",(function(){return te})),n.d(t,"useStateXForCheckbox",(function(){return we})),n.d(t,"useStateXForNumberInput",(function(){return Se})),n.d(t,"useStateXForSelect",(function(){return ye})),n.d(t,"useStateXForTextInput",(function(){return ve})),n.d(t,"useStateXForToggle",(function(){return je})),n.d(t,"useStateXGetter",(function(){return Z})),n.d(t,"useStateXRef",(function(){return be})),n.d(t,"useStateXRefValue",(function(){return ge})),n.d(t,"useStateXResolveable",(function(){return ie})),n.d(t,"useStateXSetter",(function(){return Y})),n.d(t,"useStateXValue",(function(){return re})),n.d(t,"useStateXValueGetter",(function(){return ee})),n.d(t,"useStateXValueRemover",(function(){return de})),n.d(t,"useStateXValueResolveable",(function(){return oe})),n.d(t,"useStateXValueSetter",(function(){return ne})),n.d(t,"useWithStateX",(function(){return he}));var r=n(0),a=n.n(r);function o(e){return void 0!==e.atom}function i(e){return void 0!==e.selector}function s(e){return void 0!==e.data.selector}class u{constructor(e,t,n=!1){this.cancelled=!1,this.clone=()=>{const e=new u(this.selectorNode,this.self,this.isDefault);return e.value=this.value,e.status=this.status,e.promise=this.promise,e.error=this.error,e.cancelled=this.cancelled,e},this.resolveIfSelf=e=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:if(this.selectorNode===e&&this.self)return this.value;throw this.promise}},this.resolve=()=>{switch(this.status){case"pending":throw this.promise;case"error":throw this.error;default:return this.value}},this.selectorNode=e,this.status="pending",this.self=t,this.isDefault=n}static withValue(e,t,n=!1){const r=new u(e,!0,n);return r.value=t,r.status="resolved",r}}function l(e){return e instanceof u}class c{constructor(e){this.path=e.path,this.defaultValue=e.defaultValue,this.shouldComponentUpdate=e.shouldComponentUpdate,this.updater=e.updater,this.onChange=e.onChange}}function d(e){return null!==e&&Array.isArray(e)}function f(e){return e&&"object"==typeof e}function h(e){return null==e}function p(e){return Array.isArray(e)}let m=!0;function b(e){m=e}function g(e){return Array.isArray(e)?[...e]:Object.assign({},e)}function v(e,t,n){if(d(e)){if("number"==typeof t)return function(e,t,n){if(e[t]===n)return e;if(m&&!Object.isFrozen(e))return e[t]=n,e;if(t===e.length)return[...e,n];{const r=g(e);return r[t]=n,r}}(e,t,n(e.length>t?e[t]:null));throw Error(`Invalid key ${String(t)}. Must be of type number.`)}return f(e)?function(e,t,n){return e[t]===n?e:m&&!Object.isFrozen(e)?(e[t]=n,e):Object.assign(Object.assign({},e),{[t]:n})}(e,t,n(e[t])):e}function y(e,t,n){return v(e,t,()=>n)}function S(e,t){if(d(e)){if("number"==typeof t)return e.length>t?e[t]:void 0;throw Error(`Invalid key ${t}. Must be of type number.`)}return f(e)?e[t]:null}function O(e,t,n){const r=function e(t,n,r){if(0===n.length&&0===r)return t;const a=n[r];if(n.length===r+1)return S(t,a);const o=S(t,a);if(h(o))return null;if(!f(o))throw console.error(t,n,r),Error(`Invalid path ${JSON.stringify(n)} at index ${r}. Must be an object. Instead found ${o}`);return e(o,n,r+1)}(e,t,0);return h(r)?n:r}function j(e,t,n){return function(e,t,n){return function e(t,n,r,a,o){if(0===n.length&&0===r)return a(t);const i=n[r];if(n.length===r+1)try{if(o){if("number"==typeof i&&d(t))return function(e,t,n){if(d(e)){if(t<e.length){const r=e.slice(0,t),a=e.slice(t);return[...r,n(e[t]),...a]}if(t===e.length)return[...e,n(null)];throw Error(`Index out of bound! Index ${t}. Size ${e.length}.`)}throw Error("insert called on invalid collection. collection must be of type Array.")}(t,i,a);throw Error("insertIn called on invalid collection. \n          leaf collection must be of type Array \n          & leaf path must be a number.")}return v(t,i,a)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)}.`)}let s,u;try{s=S(t,i)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)} at index ${r}.`)}if(h(s))u="number"==typeof n[r+1]?[]:{};else{if(!f(s))throw Error(`Invalid path ${JSON.stringify(n)} at index ${r}. Must be an object.`);u=s}if(u=e(u,n,r+1,a,o),u===s)return t;try{return y(t,i,u)}catch(t){throw Error(`${t.message} Path: ${JSON.stringify(n)} at index ${r}.`)}}(e,t,0,n,!1)}(e,t,()=>n)}function w(e,t,n){const r=t[n];if(t.length===n+1)return function(e,t){if(function(e,t){if(d(e)){if("number"==typeof t)return e.hasOwnProperty(t);throw Error(`Invalid key ${t}. Must be of type number.`)}return!!f(e)&&e.hasOwnProperty(t)}(e,t)){if(d(e)){if("number"==typeof t)return[...e.slice(0,t),...e.slice(t+1)];throw Error(`Invalid key ${t}. Must be of type number.`)}const n=g(e);if(f(n))return delete n[t],n}return e}(e,r);const a=S(e,r);let o;return null==a?e:(o=function(e,t){if(null!==e&&(Array.isArray(e)||"object"==typeof e))return e;throw Error(t)}(a,`Invalid path ${JSON.stringify(t)} at index ${n}. Must be an object.`),o=w(o,t,n+1),o===a?e:y(e,r,o))}function E(e){return e instanceof Promise||e&&"object"==typeof e&&"function"==typeof e.then}function N(e){switch(typeof e.$$typeof){case"symbol":case"number":return!0}return!1}let C=!1;function V(e){C=!e,b(e)}function P(){}const k=Object.freeze({});function x(e,t){if(!t||0===Object.keys(t).length)return e;const n=[...e];Object.entries(t).forEach(e=>{const t=n.indexOf(":"+e[0]);-1!==t&&(n[t]=e[1])});const r=n.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(r.length)throw Error(`Missing parameter values for ${r.join(", ")} in path ${JSON.stringify(n)}. Params passed ${JSON.stringify(t)}`);return n}function M(e,t,n,r=!0){if(0===t.path.length)return e.getState();const a=O(e.getState(),t.path,n);return void 0===a?n:a}function U(e,t){const n=M(e,t);return t.data.lastKnownValue!==n}function R(e,t){const n=t.filter(e=>"string"==typeof e&&-1!==e.indexOf(":"));if(n.length)throw Error(`Missing parameter values for ${n.join(", ")} in path ${JSON.stringify(t)}!`);return e.trie().getNode(t)}function A(e,t){return e.data.holders.add(t),t.holding=!0,()=>{t.holding=!1,e.data.holders.delete(t)}}function $(e,t,n,r){return function(e,t,n,r){var a,o;let i,u,l;if(e.activateNode(t,"update",n),l=s(t)?null!==(a=t.data.selectorValue)&&void 0!==a?a:t.data.selector.defaultValue:M(e,t),i=function(e){return"function"!=typeof e}(n)?n:n(l),i===l)return l;if(s(t))u=t.data.selector.setValue(e,t,i,r);else{if("function"==typeof(null===(o=t.data.atom)||void 0===o?void 0:o.updater)&&(e.beforeAtomUpdater(t),i=t.data.atom.updater({value:i,oldValue:l,get:T(e),set:D(e)}),e.afterAtomUpdater(t)),i===l)return l;u=i,e.updatingState(t),e.trackAndMutate(t,i),e.addToPending(t.path,"update")}return u}(e,t,n,r)}function I(e,t,n){t instanceof c&&n.data.atom!==t?(n.data.atom=t,n.data.defaultValue=t.defaultValue,void 0===O(e.getState(),n.path,void 0)&&e.trackAndMutate(n,t.defaultValue)):t instanceof q&&n.data.selector!==t&&(n.data.selector=t,s(n)&&(n.data.initialized=!1))}function X(e,t){let n;if(e instanceof c)n=e.path;else if(e instanceof q)n=e.pathWithParams;else{if(!Array.isArray(e))throw Error(`Invalid state ${JSON.stringify(e)}. Must be path or atom or selector.`);n=e}return x(n,t)}function T(e,t){return(n,r)=>{const a=X(n,null==r?void 0:r.params),o=R(e,a);return I(e,n,o),t&&t.add(R(e,a)),function(e,t,n){const r=function(e,t,n){var r;const{mutableRefObject:a}=n||k;return s(t)?t.data.selector.getValue(e,t,n):null!==(r=M(e,t,void 0,a))&&void 0!==r?r:t.data.defaultValue}(e,t,n);return l(r)?r.resolve():r}(e,o,r)}}function D(e){return(t,n,r)=>{const a=X(t,null==r?void 0:r.params),o=R(e,a);return I(e,t,o),$(e,o,n,r)}}function _(){throw Error("Not a writable selector!")}class q{constructor({path:e,get:t,set:n,shouldComponentUpdate:r,defaultValue:a}){this.dynamic=!1,this.params=new Map,this._evaluate=(e,t)=>{const{get:n,set:r,options:a}=t,o=R(e,x(this.pathWithParams,null==a?void 0:a.params));let i;e.activateNode(o,"read"),e.beforeSelectorGet(o);try{i=this._get({get:n,set:r,params:null==a?void 0:a.params})}catch(t){return this.makeResolvable(e,o,!1,t,null==a?void 0:a.params)}finally{e.afterSelectorGet(o)}return E(i)?this.makeResolvable(e,o,!0,i,null==a?void 0:a.params):(o.data.selectorValue=i,i)},this.getValue=(e,t,n)=>{var r;return t.data.initialized?t.data.resolveable?t.data.resolveable:t.data.selectorValue:(null===(r=t.data.previousNodes)||void 0===r||r.forEach(e=>{var n;null===(n=t.data.unregisterMap.get(e))||void 0===n||n()}),t.data.unregisterMap=new Map,t.data.previousNodes=new Set,t.data.initialized=!0,this.selectValueWithStateXHolder(e,n))},this.setValue=(e,t,n,r)=>{try{return e.beforeSelectorSet(t),this._set({set:D(e),get:T(e),params:null==r?void 0:r.params,value:n},n)}catch(t){throw e.catch(t),t}finally{e.afterSelectorSet(t)}},this.watchStateXForSelector=(e,t,n,r)=>{const a=t.data.unregisterMap.get(n);a&&(console.warn("Node already registered",t.path.join("."),n.path.join(".")),a());const o={setter:()=>{},node:t},i=A(n,o);o.setter=()=>this.update(e,t,r),t.data.unregisterMap.set(n,i)},this.update=(e,t,n)=>{const r=this.selectValueWithStateXHolder(e,n);if(l(r))try{t.data.holders.forEach(e=>e.setter(r))}catch(e){console.error(e)}else t.data.selectorValue=r,this.inform(e,r,t,!0)},this.selectValueWithStateXHolder=(e,t)=>{const n=x(this.pathWithParams,null==t?void 0:t.params),r=R(e,n),a=new Set,o=this._evaluate(e,{get:T(e,a),set:D(e),options:t});return a.forEach(n=>{r.data.previousNodes.has(n)?r.data.previousNodes.delete(n):this.watchStateXForSelector(e,r,n,t)}),r.data.previousNodes.forEach(e=>{var t;null===(t=r.data.unregisterMap.get(e))||void 0===t||t()}),r.data.previousNodes=a,o},this._get=t,this._set=null!=n?n:_,this.defaultValue=a,this.pathWithParams=e,this.shouldComponentUpdate=r;for(let o=0;o<e.length;o++){const t=e[o];"string"==typeof t&&":"===t.charAt(0)&&this.params.set(t.substr(1),o)}this.params.size&&(this.dynamic=!0)}makeResolvable(e,t,n,r,a){t.data.resolveable&&(t.data.resolveable.cancelled=!0);const o=new u(t,n);return E(r)?(o.promise=r,r.then(r=>(o.value=r,o.status="resolved",o.cancelled||(n?(t.data.resolveable=o.clone(),t.data.selectorValue=r,this.inform(e,r,t,n)):this.update(e,t,a)),r)).catch(e=>{if(o.error=e,o.status="error",!o.cancelled)try{t.data.resolveable=o.clone(),t.data.holders.forEach(e=>e.setter(t.data.resolveable))}catch(e){console.error(e)}})):(o.error=r,o.status="error"),t.data.resolveable=o,o}inform(e,t,n,r){const{oldValue:a}=n.data;n.data.oldValue=t;let o=!0;this.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(n),o=this.shouldComponentUpdate(t,a),e.afterShouldComponentUpdate(n)),o&&n.data.holders.forEach(n=>{if(n.holding){let r=!0;n.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(n.node),r=n.shouldComponentUpdate(t,a),e.afterShouldComponentUpdate(n.node)),r&&n.setter(t),n.onChange&&(e.beforeOnChange(n.node),n.onChange({value:t,oldValue:a,get:T(e),set:D(e)}),e.afterOnChange(n.node))}})}}class F{constructor(e){this._createNode=(e,t)=>({children:{},key:e,parent:t,path:t?[...t.path,e]:[],data:this.makeData(e,t)}),this._forEach=(e,t,n)=>{n(e,t),Object.values(e.children).forEach(e=>{this._forEach(e,t+1,n)})},this.forEach=(e,t)=>{const n=this.getNode(e);this._forEach(n,0,t)},this.getNode=(e,t=!0)=>{let n,r,a=this.root;for(let o=0;o<e.length;o++){if(r=e[o],n=a.children[r],!n){if(!t)throw Error(`Node not found at path ${e.join(".")}! Parent ${r} at index ${o} is missing!`);n=this._createNode(r,a),a.children[r]=n}a=n}return a},this.addNode=(e,t)=>{this.getNode(e).data=t},this.removeNode=e=>{var t;null===(t=e.parent)||void 0===t||delete t.children[e.key]},this._collectAllParentNodes=(e,t)=>{t.parent&&(e.push(t.parent),this._collectAllParentNodes(e,t.parent))},this.getAllParentNodes=e=>{const t=[];return this._collectAllParentNodes(t,this.getNode(e)),t},this._collectAllChildNodes=(e,t,n)=>{let r;for(const a in e.children)r=e.children[a],n&&!n(r)||(t.push(r),this._collectAllChildNodes(r,t,n))},this.getAllChildNodes=(e,t)=>{const n=[];return this._collectAllChildNodes(this.getNode(e),n,t),n},this.isRootNode=e=>e===this.root,this.makeData=e,this.root=this._createNode("_ROOT_")}}function z(){throw new Error("This component must be used inside a <StateXProvider> component.")}class J{constructor(e={},t=P){this._trie=new F(()=>({holders:new Set,defaultValue:void 0})),this.activeNodes=new Map,this.mutatedNodes=new Set,this.batching=!1,this.pending=[],this.updateSchedule=z,this.renderSchedule=z,this.postUpdateSchedule=z,this.postRenderSchedule=z,this.id=0,this.rendering=!1,this.registerPreUpdateScheduler=e=>{this.updateSchedule=e},this.registerPreRenderScheduler=e=>{this.renderSchedule=e},this.registerPostUpdateScheduler=e=>{this.postUpdateSchedule=e},this.registerPostRenderScheduler=e=>{this.postRenderSchedule=e},this.state=function e(t){if("object"==typeof t&&t.current)throw Error("Ref in deepFreeze!!!");if(!function(e){return!(!C||h(e)||"object"!=typeof e||(e.current?(console.warn("ref cannot be frozen"),1):Object.isFrozen(e)||e instanceof Element||e instanceof Event||function(e){var t,n;if("undefined"==typeof window)return!1;const r=null!==(n=null===(t=e.ownerDocument)||void 0===t?void 0:t.defaultView)&&void 0!==n?n:window;return"function"==typeof r.Node?e instanceof r.Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName}(e)||N(e)||E(e)||e instanceof u&&(console.warn("Resolvable cannot be frozen"),1)))}(t))return t;const n=Object.getOwnPropertyNames(t);for(let r of n){let n=t[r];h(n)||"object"!=typeof n||e(n)}return Object.freeze(t)}(e),this.handleError=t}catch(e){this.handleError(e)}afterSelectorGet(e){}afterSelectorSet(e){}beforeSelectorGet(e){}beforeSelectorSet(e){}beforeShouldComponentUpdate(e){}afterShouldComponentUpdate(e){}beforeOnChange(e){}afterOnChange(e){}beforeAtomOnChange(e){}afterAtomOnChange(e){}beforeAtomUpdater(e){}afterAtomUpdater(e){}updatingState(e){}readingState(e){}removingState(e){}afterSelectorReads(){this.activeNodes.size&&this.activeNodes.clear(),this.lastLogItem=void 0,V(!0)}renderingStarted(){this.rendering=!0}renderingCompleted(){this.rendering=!1}afterStateUpdates(){this.activeNodes.size&&this.activeNodes.clear(),this.renderSchedule(),this.postRenderSchedule(),this.processTrackedMutates(),function(e){const t=function(e){const t=new Set;let n,r,a,o;return e.getPendingPaths().forEach(i=>{if(r=e.trie().getNode(i),!U(e,r))return;t.add(r),e.trie().getAllChildNodes(i,t=>U(e,t)).forEach(t.add,t);const s=e.trie().getAllParentNodes(i);for(n=s.length,o=0;o<n&&(a=s[o],!t.has(a));o++)t.add(a)}),t}(e);e.clearPending(),0!==t.size&&t.forEach(t=>{if(!s(t)){const n=M(e,t),{lastKnownValue:r,holders:a,atom:o}=t.data,i=l(r)&&"pending"===r.status;n!==r&&(t.data.lastKnownValue=n,(i||!(null==o?void 0:o.shouldComponentUpdate)||o.shouldComponentUpdate(n,r))&&a.forEach(t=>{if(t.holding){let a=!0;t.shouldComponentUpdate&&(e.beforeShouldComponentUpdate(t.node),a=t.shouldComponentUpdate(n,r),e.afterShouldComponentUpdate(t.node)),(i||a)&&t.setter(i||n),i||t.onChange&&(e.beforeOnChange(t.node),t.onChange({value:n,oldValue:r,get:T(e),set:D(e)}),e.afterOnChange(t.node))}}),(null==o?void 0:o.onChange)&&(e.beforeAtomOnChange(t),o.onChange({value:n,oldValue:r,get:T(e),set:D(e)}),e.afterAtomOnChange(t)))}})}(this)}debug(e,t,n){}activateNode(e,t,n){var r;let a=null!==(r=this.activeNodes.get(e))&&void 0!==r?r:0;if(a>10)throw Error(`Trying to ${t} $${e.path.join(".")} too many times!`);switch(this.activeNodes.set(e,++a),t){case"read":this.renderSchedule(),this.postRenderSchedule();break;default:if(this.updateSchedule(),this.postUpdateSchedule(),this.rendering){const n=`WARNING: Trying to ${t} $${e.path.join(".")} during render!`;this.debug(n,t)}}}addToPending(e,t){this.pending.push(e),this.updateSchedule(),this.postUpdateSchedule()}trie(){return this._trie}startBatch(){this.batching=!0}endBatch(){this.batching=!1}isBatching(){return this.batching}clearPending(){this.pending=[]}getPendingPaths(){return this.pending}getState(){return this.state}setState(e){this.state=e}trackAndMutate(e,t){e.parent&&this.mutatedNodes.add(e.parent),b(!0),this.setState(j(this.getState(),e.path,t)),b(!1)}trackAndRemove(e){e.parent&&this.mutatedNodes.add(e.parent),b(!0),this.setState(w(this.getState(),e.path,0)),b(!1)}processTrackedMutates(){b(!1),this.mutatedNodes.forEach(e=>{let t=O(this.getState(),e.path,void 0);t&&"object"==typeof t&&(t=Array.isArray(t)?[...t]:Object.assign({},t),this.setState(j(this.getState(),e.path,t)))}),this.mutatedNodes.clear()}}const L=Object(r.createContext)({current:new J});function W(){return Object(r.useContext)(L).current}function G(e){console.error("Unhandled Exception!"),console.error(e)}function K({registerPreUpdateScheduler:e,registerPreRenderScheduler:t}){const n=W();n.renderingStarted();const[a,o]=Object(r.useState)([]);e(()=>o([]));const[i,s]=Object(r.useState)([]);return t(()=>s([])),Object(r.useLayoutEffect)(()=>{n.renderingCompleted()},[i,n,a]),Object(r.useEffect)(()=>{n.afterStateUpdates()},[n,a]),Object(r.useEffect)(()=>{V(!1)},[]),null}function B({registerPostUpdateScheduler:e,registerPostRenderScheduler:t}){const n=W(),[,a]=Object(r.useState)([]);e(()=>a([]));const[o,i]=Object(r.useState)([]);return t(()=>i([])),Object(r.useLayoutEffect)(()=>{n.afterSelectorReads()},[o,n]),Object(r.useEffect)(()=>{V(!1)},[]),null}function H({initialState:e={},handleError:t=G,children:n}){const o=Object(r.useMemo)(()=>new J(e,t),[]),i=Object(r.useRef)(o);return a.a.createElement(L.Provider,{value:i},a.a.createElement(K,{registerPreUpdateScheduler:i.current.registerPreUpdateScheduler,registerPreRenderScheduler:i.current.registerPreRenderScheduler}),n,a.a.createElement(B,{registerPostUpdateScheduler:i.current.registerPostUpdateScheduler,registerPostRenderScheduler:i.current.registerPostRenderScheduler}))}function Q(e){return new c(e)}function Y(){const e=W();return Object(r.useMemo)(()=>D(e),[e])}function Z(){const e=W();return Object(r.useMemo)(()=>T(e),[e])}function ee(){return Z()}function te(e,t){const n=le(e),a=W();return Object(r.useCallback)((...e)=>n.current({get:T(a),set:D(a)},...e),[...t,n,a])}function ne(e,t){const n=X(e,null==t?void 0:t.params),a=W(),o=R(a,n),i=le(t);return Object(r.useCallback)(e=>$(a,o,e,i.current),[a,o,i])}function re(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else if(e instanceof q)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return ae(e,r,n)}function ae(e,t,n){const r=X(e,null==n?void 0:n.params),a=R(W(),r);let o=se(a,e,t,n);return l(o)&&(o=o.resolveIfSelf(a)),o}function oe(e,t){const n=X(e,null==t?void 0:t.params),r=R(W(),n),a=se(r,e,e.defaultValue,t);return l(a)?a:u.withValue(r,a)}function ie(e,t){return[oe(e,t),ne(e,t)]}function se(e,t,n,a){var o;const i=W();I(i,t,e),void 0===e.data.defaultValue&&(e.data.defaultValue=n);const l=Object(r.useRef)({setter:P,shouldComponentUpdate:null==a?void 0:a.shouldComponentUpdate,onChange:null==a?void 0:a.onChange,node:e}),[c,d]=Object(r.useState)(u.withValue(e,n,!0));let f;f=t instanceof q?e!==l.current.node?n:c:null!==(o=M(i,e,void 0,!!(null==a?void 0:a.mutableRefObject)))&&void 0!==o?o:n;const h=Object(r.useRef)({defaultValue:n,options:a,currentValue:f}),[,p]=Object(r.useState)(f),m=Object(r.useCallback)(t=>{s(e)?d(t):p(t)},[d,p,e]);return Object(r.useEffect)(()=>{h.current.currentValue=f,h.current.defaultValue=n,h.current.options=a,l.current.shouldComponentUpdate=null==a?void 0:a.shouldComponentUpdate,l.current.onChange=null==a?void 0:a.onChange,l.current.setter=m,l.current.node=e},[f,n,a,e,m]),Object(r.useEffect)(()=>{const{defaultValue:t,options:n}=h.current;if(s(e)){const t=e.data.selector.getValue(i,e,n);d(t)}else{const r=M(i,e,void 0,!!(null==n?void 0:n.mutableRefObject));void 0===r?null!=t&&(m(t),e.data.selector||$(i,e,t,{mutableRefObject:!!(null==n?void 0:n.mutableRefObject)})):m(r)}},[e,m,i]),Object(r.useEffect)(()=>A(e,l.current),[e,l]),f}function ue(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else if(e instanceof q)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return[ae(e,r,n),ne(e,n)]}function le(e){const t=Object(r.useRef)(e);return Object(r.useLayoutEffect)(()=>{t.current=e},[e]),t}function ce(e){return new q(e)}function de(e,t){const n=X(e,null==t?void 0:t.params),a=W(),o=R(a,n),i=le(t);return Object(r.useCallback)(()=>function(e,t,n){return function(e,t){const n=e.trie().getNode(t);e.activateNode(n,"remove");const r=M(e,n);return n.data.lastKnownValue=r,e.removingState(n),e.trackAndRemove(n),n.parent&&e.addToPending(n.parent.path,"remove-child"),e.trie().removeNode(n),r}(e,x(t,null==n?void 0:n.params))}(a,o.path,i.current),[o,i,a])}function fe(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom, selector or path.");void 0===t&&(t=null),r=t}return[ae(e,r,n),de(e,n)]}function he(e){const t=W(),n=ne([]),a=Object(r.useRef)(e),o=Object(r.useRef)(!0);return o.current&&(o.current=!1,t.setState(j(t.getState(),[],e))),Object(r.useEffect)(()=>{JSON.stringify(a.current)!==JSON.stringify(e)&&(n(e),a.current=e)},[n,e]),null}function pe(){const e=W();return Object(r.useCallback)((t,n,r)=>{e.debug(t,n,r)},[e])}function me(e,t){const n=ne(e,t);return[Object(r.useCallback)(e=>n(e.target.value),[n]),n]}function be(e){const t=Object(r.useRef)(null),n=R(W(),e);return n.data.ref||(n.data.ref=t),Object(r.useEffect)(()=>()=>{n.data.ref=void 0},[n]),n.data.ref}function ge(e){return R(W(),e).data.ref}function ve(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"string"!=typeof t&&(t=""),r=t}const a=ae(e,r,n),[o]=me(e,n);return{value:a,onChange:o,type:(null==n?void 0:n.type)||"text"}}function ye(e,t){const n=re(e,t)||"",[r]=me(e,t);return{value:n,onChange:r}}function Se(e,t,n){let a;if(e instanceof c)a=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"number"!=typeof t&&(t=0),a=t}const o=ae(e,a,n),[i]=function(e){const t=ne(e);return[Object(r.useCallback)(e=>{const n=Number(e.target.value);Number.isNaN(n)||t(n)},[t]),t]}(e);return{value:o,onChange:i,type:"number"}}function Oe(e,t){const n=ne(e,t);return[Object(r.useCallback)(()=>{n(e=>!e)},[n]),n]}function je(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),r=t}const a=ae(e,r,n),[o]=Oe(e,n);return[!!a,o]}function we(e,t,n){let r;if(e instanceof c)r=e.defaultValue,n=t;else{if(!p(e))throw Error("Invalid atom type value! Must be either an atom or path.");"boolean"!=typeof t&&(t=!1),r=t}const a=ae(e,r,n),[o]=Oe(e,n);return{onChange:o,checked:!!a,type:"checkbox"}}function Ee(){const e=W();return t=>{const n=[];e.trie().forEach(t,(e,t)=>{n.push(`${"".padStart(2*t,"-")}${e.path.join(".")} ${e.data.holders.size}`),e.data.holders.forEach(e=>{n.push(`${"".padStart(2*t+2," ")}${e.node.path.join(".")}`)})}),console.log(n.join("\n"))}}}}]);