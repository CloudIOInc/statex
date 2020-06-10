(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{136:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return s}));var n=r(2),a=r(9),o=(r(0),r(170)),i={title:"StateXProvider",sidebar_label:"StateXProvider"},c={id:"api-reference/core/StateXProvider",title:"StateXProvider",description:"Provides the context in which atoms have values. Must be an ancestor of any component that uses any StateX hooks. Multiple roots may co-exist; atoms will have distinct values within each root. If they are nested, the innermost root will completely mask any outer roots.",source:"@site/docs/api-reference/core/StateXProvider.md",permalink:"/statex/docs/api-reference/core/StateXProvider",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/StateXProvider.md",sidebar_label:"StateXProvider",sidebar:"someSidebar",previous:{title:"TodoMVC",permalink:"/statex/docs/examples/todomvc"},next:{title:"path",permalink:"/statex/docs/api-reference/core/path"}},p=[{value:"&lt;StateXProvider ...props /&gt;",id:"statexprovider-props-",children:[]},{value:"Example",id:"example",children:[]}],l={rightToc:p};function s(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"statexprovider-props-"},"<StateXProvider ...props />"),Object(o.b)("p",null,"Provides the context in which atoms have values. Must be an ancestor of any component that uses any StateX hooks. Multiple roots may co-exist; atoms will have distinct values within each root. If they are nested, the innermost root will completely mask any outer roots."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"props")," (Optional)"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"initialState")," Object or Array"),Object(o.b)("p",{parentName:"li"},"You application's intial state.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"handleError")," (error) => void;"),Object(o.b)("p",{parentName:"li"},"This method will be invoked whenever an exception is thrown from a selector."))))),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"import { StateXProvider } from '@cloudio/statex';\n\nfunction AppRoot() {\n  return (\n    <StateXProvider>\n      <App />\n    </StateXProvider>\n  );\n}\n")))}s.isMDXComponent=!0},170:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(r),d=n,m=u["".concat(i,".").concat(d)]||u[d]||b[d]||o;return r?a.a.createElement(m,c(c({ref:t},l),{},{components:r})):a.a.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);