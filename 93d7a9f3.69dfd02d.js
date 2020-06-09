(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{118:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return u})),n.d(t,"default",(function(){return s}));var r=n(2),a=n(6),o=(n(0),n(134)),c={title:"useStateXValueSetter()",sidebar_label:"useStateXValueSetter()"},i={id:"api-reference/core/useStateXValueSetter",title:"useStateXValueSetter()",description:"Returns a setter function for updating the value of writeable StateX state.",source:"@site/docs/api-reference/core/useStateXValueSetter.md",permalink:"/statex/docs/api-reference/core/useStateXValueSetter",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useStateXValueSetter.md",sidebar_label:"useStateXValueSetter()",sidebar:"someSidebar",previous:{title:"useStateXValue()",permalink:"/statex/docs/api-reference/core/useStateXValue"},next:{title:"useRemoveStateX()",permalink:"/statex/docs/api-reference/core/useRemoveStateX"}},u=[{value:"Example",id:"example",children:[]}],l={rightToc:u};function s(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Returns a setter function for updating the value of writeable StateX state."),Object(o.b)("hr",null),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"state"),": writeable state (a ",Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"path"}),Object(o.b)("inlineCode",{parentName:"a"},"path"))," or ",Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"atom"}),Object(o.b)("inlineCode",{parentName:"a"},"atom"))," or a ",Object(o.b)("em",{parentName:"li"},"writeable")," ",Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"selector"}),Object(o.b)("inlineCode",{parentName:"a"},"selector")),")")),Object(o.b)("p",null,"This is the recommended hook to use when a component intends to write to state without reading it. If a component used the ",Object(o.b)("inlineCode",{parentName:"p"},"useStateX()")," hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using ",Object(o.b)("inlineCode",{parentName:"p"},"useStateXValueSetter()")," allows a component to set the value without re-rendering when the value changes."),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"useWithStateX({ name: 'Hi there!' });\n\nconst setName = useStateXValueSetter(['name']);\nconst renderCounter = useRef(0);\nrenderCounter.current++;\nconst onChange = (e) => {\n  setName(e.target.value);\n};\n\nreturn (\n  <>\n    Type something... <input onChange={onChange} />\n    <br />\n    Render Count: {renderCounter.current}\n  </>\n);\n")))}s.isMDXComponent=!0},134:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(n),m=r,d=p["".concat(c,".").concat(m)]||p[m]||b[m]||o;return n?a.a.createElement(d,i(i({ref:t},l),{},{components:n})):a.a.createElement(d,i({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var l=2;l<o;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);