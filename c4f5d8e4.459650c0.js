(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{100:function(t,e){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},101:function(t,e,n){var r=n(89),o=n(96),a=n(106),i=n(109)("src"),c=n(132),u=(""+c).split("toString");n(100).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var s="function"==typeof n;s&&(a(n,"name")||o(n,"name",e)),t[e]!==n&&(s&&(a(n,i)||o(n,i,t[e]?""+t[e]:u.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[i]||c.call(this)}))},102:function(t,e,n){var r=n(89),o=n(100),a=n(96),i=n(101),c=n(107),u=function(t,e,n){var s,l,f,p,m=t&u.F,d=t&u.G,g=t&u.S,v=t&u.P,h=t&u.B,y=d?r:g?r[e]||(r[e]={}):(r[e]||{}).prototype,b=d?o:o[e]||(o[e]={}),_=b.prototype||(b.prototype={});for(s in d&&(n=e),n)f=((l=!m&&y&&void 0!==y[s])?y:n)[s],p=h&&l?c(f,r):v&&"function"==typeof f?c(Function.call,f):f,y&&i(y,s,f,t&u.U),b[s]!=f&&a(b,s,p),v&&_[s]!=f&&(_[s]=f)};r.core=o,u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},103:function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},104:function(t,e,n){var r=n(95),o=n(129),a=n(130),i=Object.defineProperty;e.f=n(94)?Object.defineProperty:function(t,e,n){if(r(t),e=a(e,!0),r(n),o)try{return i(t,e,n)}catch(c){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},106:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},107:function(t,e,n){var r=n(115);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},109:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},110:function(t,e,n){var r=n(100),o=n(89),a=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(120)?"pure":"global",copyright:"\xa9 2019 Denis Pushkarev (zloirock.ru)"})},112:function(t,e,n){var r=n(117),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},115:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},116:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},117:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},118:function(t,e,n){var r=n(98),o=n(89).document,a=r(o)&&r(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},119:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},120:function(t,e){t.exports=!1},129:function(t,e,n){t.exports=!n(94)&&!n(103)((function(){return 7!=Object.defineProperty(n(118)("div"),"a",{get:function(){return 7}}).a}))},130:function(t,e,n){var r=n(98);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},132:function(t,e,n){t.exports=n(110)("native-function-to-string",Function.toString)},78:function(t,e,n){"use strict";n.r(e);var r=n(2),o=n(0),a=n.n(o),i=n(90),c=n(179),u=n(144),s=n(113),l=n(152),f=n(79),p=n.n(f);const m=[{title:a.a.createElement(a.a.Fragment,null,"Simple & Powerful"),imageUrl:"img/undraw_docusaurus_mountain.svg",description:a.a.createElement(a.a.Fragment,null,"StateX is simple, powerful and flexible API to manage react global state. It's build ground up with Typescript & React Hooks.")},{title:a.a.createElement(a.a.Fragment,null,"Data-Flow Graph"),imageUrl:"img/undraw_docusaurus_tree.svg",description:a.a.createElement(a.a.Fragment,null,"Derived data and asynchronous queries are tamed with pure functions and efficient subscriptions.")},{title:a.a.createElement(a.a.Fragment,null,"Cross-App Observation"),imageUrl:"img/undraw_docusaurus_react.svg",description:a.a.createElement(a.a.Fragment,null,"Implement persistence, routing, time-travel debugging, or undo by observing all state changes across your app, without impairing code-splitting.")}];function d({imageUrl:t,title:e,description:n}){const r=Object(l.a)(t);return a.a.createElement("div",{className:Object(i.a)("col col--4",p.a.feature)},r&&a.a.createElement("div",{className:"text--center"},a.a.createElement("img",{className:p.a.featureImage,src:r,alt:e})),a.a.createElement("h3",null,e),a.a.createElement("p",null,n))}e.default=function(){const t=Object(s.a)(),{siteConfig:e={}}=t;return a.a.createElement(c.a,{description:"A state management library for React."},a.a.createElement("header",{className:Object(i.a)("hero hero--primary",p.a.heroBanner)},a.a.createElement("div",{className:"container"},a.a.createElement("h1",{className:"hero__title"},e.title),a.a.createElement("p",{className:"hero__subtitle"},e.tagline),a.a.createElement("div",{className:p.a.buttons},a.a.createElement(u.a,{className:Object(i.a)("hero__button button button--outline button--secondary button--lg",p.a.getStarted),to:Object(l.a)("docs/")},"Get Started")))),a.a.createElement("main",null,m&&m.length>0&&a.a.createElement("section",{className:p.a.features},a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"row"},m.map((t,e)=>a.a.createElement(d,Object(r.a)({key:e},t))))))))}},89:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},91:function(t,e,n){var r=n(110)("wks"),o=n(109),a=n(89).Symbol,i="function"==typeof a;(t.exports=function(t){return r[t]||(r[t]=i&&a[t]||(i?a:o)("Symbol."+t))}).store=r},94:function(t,e,n){t.exports=!n(103)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},95:function(t,e,n){var r=n(98);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},96:function(t,e,n){var r=n(104),o=n(119);t.exports=n(94)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},98:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}}}]);