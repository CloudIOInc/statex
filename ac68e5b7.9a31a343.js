(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{121:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return c})),n.d(e,"metadata",(function(){return i})),n.d(e,"rightToc",(function(){return l})),n.d(e,"default",(function(){return s}));var r=n(2),a=n(6),o=(n(0),n(134)),c={title:"Installation"},i={id:"introduction/installation",title:"Installation",description:"The StateX package lives in npm. To install the latest stable version, run the following command:",source:"@site/docs/introduction/installation.md",permalink:"/statex/docs/introduction/installation",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/introduction/installation.md",sidebar:"someSidebar",previous:{title:"Core Concepts",permalink:"/statex/docs/introduction/core-concepts"},next:{title:"Intro",permalink:"/statex/docs/basic-tutorial/intro"}},l=[],p={rightToc:l};function s(t){var e=t.components,n=Object(a.a)(t,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The StateX package lives in ",Object(o.b)("a",{href:"https://www.npmjs.com/get-npm",target:"_blank"},"npm"),". To install the latest stable version, run the following command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"npm install @cloudio/statex\n")),Object(o.b)("p",null,"Or if you're using ",Object(o.b)("a",{href:"https://classic.yarnpkg.com/en/docs/install/",target:"_blank"},"yarn"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-shell"}),"yarn add @cloudio/statex\n")),Object(o.b)("h5",{id:"todomvc-app-built-with-create-react-app--statex"},"TodoMVC App built with create-react-app & StateX"),Object(o.b)("p",null,"Checkout ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex-todomvc"}),"https://github.com/CloudIOInc/statex-todomvc")))}s.isMDXComponent=!0},134:function(t,e,n){"use strict";n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=a.a.createContext({}),s=function(t){var e=a.a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},u=function(t){var e=s(t.components);return a.a.createElement(p.Provider,{value:e},t.children)},b={inlineCode:"code",wrapper:function(t){var e=t.children;return a.a.createElement(a.a.Fragment,{},e)}},d=a.a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,c=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),u=s(n),d=r,m=u["".concat(c,".").concat(d)]||u[d]||b[d]||o;return n?a.a.createElement(m,i(i({ref:e},p),{},{components:n})):a.a.createElement(m,i({ref:e},p))}));function m(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var l in e)hasOwnProperty.call(e,l)&&(i[l]=e[l]);i.originalType=t,i.mdxType="string"==typeof t?t:r,c[1]=i;for(var p=2;p<o;p++)c[p]=n[p];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);