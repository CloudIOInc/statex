(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{110:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return s})),r.d(t,"default",(function(){return u}));var n=r(2),a=r(6),o=(r(0),r(129)),i={title:"path",sidebar_label:"path"},c={id:"api-reference/core/path",title:"path",description:"A path is like an address that points to a specific node of your global state tree",source:"@site/docs/api-reference/core/path.md",permalink:"/statex/docs/api-reference/core/path",editUrl:"https://github.com/CloudIOInc/statex/website/docs/api-reference/core/path.md",sidebar_label:"path",sidebar:"someSidebar",previous:{title:"StateXProvider",permalink:"/statex/docs/api-reference/core/StateXProvider"},next:{title:"atom(options)",permalink:"/statex/docs/api-reference/core/atom"}},s=[{value:"Demo",id:"demo",children:[]}],l={rightToc:s};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"A path is like an address that points to a specific node of your global state tree"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-shell",metastring:'title="path: ( string | number )[]"',title:'"path:',"(":!0,string:!0,"|":!0,number:!0,')[]"':!0}),"// state: { root: { userList: ['User A', 'User B'] } }\n\n['root', 'userList'] // ['User A', 'User B']\n\n['root', 'userList', 1] // User B\n\n")),Object(o.b)("p",null,"The following hooks can be used to interact with atoms:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"useStateX"}),Object(o.b)("inlineCode",{parentName:"a"},"useStateX()")),": use this hook when you intend on both reading and writing to the atom. This hook subscribes the component to the atom."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"useStateXValue"}),Object(o.b)("inlineCode",{parentName:"a"},"useStateXValue()")),": use this hook when you intend on only reading the atom. This hook subscribes the component to the atom."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"useStateXValueSetter"}),Object(o.b)("inlineCode",{parentName:"a"},"useStateXValueSetter()")),": use this hook when you intend on only writing to the atom."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"useRemoveStateX"}),Object(o.b)("inlineCode",{parentName:"a"},"useRemoveStateX()")),": use this hook to remove an atom from the global state.")),Object(o.b)("p",null,"For rare cases where you need to read an atom value without subscribing to the component, see ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"useStateXValueGetterWithPath"}),Object(o.b)("inlineCode",{parentName:"a"},"useStateXValueGetterWithPath()")),"."),Object(o.b)("h3",{id:"demo"},"Demo"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"live open",live:!0,open:!0}),"useWithStateX({ root: { userList: ['User A', 'User B'] } });\n\nconst [value, setValue] = useStateX(['root', 'userList', 1]);\n\nreturn value;\n")))}u.isMDXComponent=!0},129:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return h}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(r),m=n,h=p["".concat(i,".").concat(m)]||p[m]||b[m]||o;return r?a.a.createElement(h,c(c({ref:t},l),{},{components:r})):a.a.createElement(h,c({ref:t},l))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);