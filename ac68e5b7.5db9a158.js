/*! For license information please see ac68e5b7.5db9a158.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{159:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return s})),a.d(t,"rightToc",(function(){return p})),a.d(t,"default",(function(){return b}));var n=a(2),r=a(9),c=(a(0),a(172)),o=a(217),i=a(215),l={title:"Installation"},s={id:"introduction/installation",title:"Installation",description:"The StateX package lives in npm. To install the latest stable version, run the following command:",source:"@site/docs/introduction/installation.md",permalink:"/statex/docs/introduction/installation",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/introduction/installation.md",sidebar:"someSidebar",previous:{title:"Core Concepts",permalink:"/statex/docs/introduction/core-concepts"},next:{title:"Intro",permalink:"/statex/docs/basic-tutorial/intro"}},p=[{value:"Create React App Tempates",id:"create-react-app-tempates",children:[]}],u={rightToc:p};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The StateX package lives in ",Object(c.b)("a",{href:"https://www.npmjs.com/get-npm",target:"_blank"},"npm"),". To install the latest stable version, run the following command:"),Object(c.b)(o.a,{defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(c.b)(i.a,{value:"yarn",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash",metastring:"{1}","{1}":!0}),"yarn add @cloudio/statex\n"))),Object(c.b)(i.a,{value:"npm",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash",metastring:"{1}","{1}":!0}),"npm install --save @cloudio/statex\n")))),Object(c.b)("h3",{id:"create-react-app-tempates"},"Create React App Tempates"),Object(c.b)(o.a,{defaultValue:"Typescript",values:[{label:"Typescript",value:"Typescript"},{label:"Javascript",value:"Javascript"}],mdxType:"Tabs"},Object(c.b)(i.a,{value:"Typescript",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash",metastring:"{1}","{1}":!0}),"yarn create react-app my-app --template statex-typescript\n"))),Object(c.b)(i.a,{value:"Javascript",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash",metastring:"{1}","{1}":!0}),"yarn create react-app my-app --template statex\n")))),Object(c.b)("h5",{id:"todomvc-app-built-with-create-react-app--statex"},"TodoMVC App built with create-react-app & StateX"),Object(c.b)("p",null,"Checkout ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex-todomvc"}),"https://github.com/CloudIOInc/statex-todomvc")),Object(c.b)("p",null,Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://codesandbox.io/s/github/CloudIOInc/statex-todomvc/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark"}),Object(c.b)("img",Object(n.a)({parentName:"a"},{src:"https://codesandbox.io/static/img/play-codesandbox.svg",alt:"Edit CloudIOInc/statex-todomvc"})))))}b.isMDXComponent=!0},172:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return d}));var n=a(0),r=a.n(n);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=p(a),m=n,d=u["".concat(o,".").concat(m)]||u[m]||b[m]||c;return a?r.a.createElement(d,i(i({ref:t},s),{},{components:a})):r.a.createElement(d,i({ref:t},s))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=a.length,o=new Array(c);o[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var s=2;s<c;s++)o[s]=a[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"},178:function(e,t,a){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var c=typeof n;if("string"===c||"number"===c)e.push(n);else if(Array.isArray(n)&&n.length){var o=r.apply(null,n);o&&e.push(o)}else if("object"===c)for(var i in n)a.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},191:function(e,t,a){"use strict";var n=a(0),r=Object(n.createContext)({tabGroupChoices:{},setTabGroupChoices:function(){}});t.a=r},215:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("div",null,e.children)}},217:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(191);var o=function(){return Object(n.useContext)(c.a)},i=a(178),l=a.n(i),s=a(130),p=a.n(s);const u=37,b=39;t.a=function(e){const{block:t,children:a,defaultValue:c,values:i,groupId:s}=e,{tabGroupChoices:m,setTabGroupChoices:d}=o(),[f,O]=Object(n.useState)(c);if(null!=s){const e=m[s];null!=e&&e!==f&&O(e)}const v=e=>{O(e),null!=s&&d(s,e)},y=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:l()("tabs",{"tabs--block":t})},i.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:"0","aria-selected":f===e,className:l()("tabs__item",p.a.tabItem,{"tabs__item--active":f===e}),key:e,ref:e=>y.push(e),onKeyDown:e=>((e,t,a)=>{switch(a.keyCode){case b:((e,t)=>{const a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()})(e,t);break;case u:((e,t)=>{const a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()})(e,t)}})(y,e.target,e),onFocus:()=>v(e),onClick:()=>v(e)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(a).filter(e=>e.props.value===f)[0]))}}}]);