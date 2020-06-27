(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{80:function(t,e,r){"use strict";r.r(e),r.d(e,"frontMatter",(function(){return i})),r.d(e,"metadata",(function(){return c})),r.d(e,"rightToc",(function(){return l})),r.d(e,"default",(function(){return u}));var n=r(2),o=r(6),a=(r(0),r(94)),i={title:"Intro"},c={id:"basic-tutorial/intro",isDocsHomePage:!1,title:"Intro",description:"This section assumes you have installed StateX and React. See the Getting Started page for how to get started with StateX and React from scratch.",source:"@site/docs/basic-tutorial/intro.md",permalink:"/statex/docs/basic-tutorial/intro",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/basic-tutorial/intro.md",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/statex/docs/introduction/installation"},next:{title:"Atoms",permalink:"/statex/docs/basic-tutorial/atoms"}},l=[],s={rightToc:l};function u(t){var e=t.components,r=Object(o.a)(t,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,r,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"This section assumes you have installed StateX and React. See the ",Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"../"}),"Getting Started")," page for how to get started with StateX and React from scratch."),Object(a.b)("p",null,"In this tutorial, we'll be building a simple todo-list application. Our app will be able to do the following:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Add todo items"),Object(a.b)("li",{parentName:"ul"},"Edit todo items"),Object(a.b)("li",{parentName:"ul"},"Delete todo items"),Object(a.b)("li",{parentName:"ul"},"Filter todo items"),Object(a.b)("li",{parentName:"ul"},"Display useful stats")),Object(a.b)("p",null,"Along the way, we'll cover atoms, selectors, and the hooks exposed by the StateX API. We'll also cover optimization"))}u.isMDXComponent=!0},94:function(t,e,r){"use strict";r.d(e,"a",(function(){return p})),r.d(e,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var s=o.a.createContext({}),u=function(t){var e=o.a.useContext(s),r=e;return t&&(r="function"==typeof t?t(e):c(c({},e),t)),r},p=function(t){var e=u(t.components);return o.a.createElement(s.Provider,{value:e},t.children)},b={inlineCode:"code",wrapper:function(t){var e=t.children;return o.a.createElement(o.a.Fragment,{},e)}},d=o.a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,a=t.originalType,i=t.parentName,s=l(t,["components","mdxType","originalType","parentName"]),p=u(r),d=n,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||a;return r?o.a.createElement(m,c(c({ref:e},s),{},{components:r})):o.a.createElement(m,c({ref:e},s))}));function m(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var a=r.length,i=new Array(a);i[0]=d;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=t,c.mdxType="string"==typeof t?t:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);