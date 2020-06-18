(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{150:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return u})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return l}));var r=n(2),a=n(9),o=(n(0),n(172)),c={title:"useStateXGetter()",sidebar_label:"useStateXGetter()"},u={id:"api-reference/core/useStateXGetter",title:"useStateXGetter()",description:"Returns a getter function for reading the value of StateX state.",source:"@site/docs/api-reference/core/useStateXGetter.md",permalink:"/statex/docs/api-reference/core/useStateXGetter",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useStateXGetter.md",sidebar_label:"useStateXGetter()",sidebar:"someSidebar",previous:{title:"useStateXValueSetter()",permalink:"/statex/docs/api-reference/core/useStateXValueSetter"},next:{title:"useRemoveStateX()",permalink:"/statex/docs/api-reference/core/useRemoveStateX"}},i=[{value:"Example",id:"example",children:[]}],s={rightToc:i};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Returns a getter function for reading the value of StateX state."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"(pathOrAtom: PathOrStateXOrSelector<T>, options?: Options) => Readonly<T>\n")),Object(o.b)("p",null,"Use this hook when a component intends to just read the state without subscribing to it. If a component used the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"useStateX"}),"useStateX()")," hook to get the setter, it would also subscribe to updates and re-render when the state changes. Using ",Object(o.b)("inlineCode",{parentName:"p"},"useStateXGetter()")," allows a component to read the value without re-rendering when the value changes."),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"useWithStateX({ name: 'Hi there!' });\n\nconst get = useStateXGetter();\n\nconst setName = useStateXValueSetter(['name']);\nconst renderCounter = useRef(0);\nrenderCounter.current++;\nconst onChange = (e) => {\n  setName(e.target.value);\n};\n\nconst name = get(['name']);\n\nreturn (\n  <>\n    Type something... <input onChange={onChange} />\n    <br />\n    Render Count: {renderCounter.current}\n    <br />\n    Name: {name}\n  </>\n);\n")))}l.isMDXComponent=!0},172:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),l=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=l(n),f=r,m=p["".concat(c,".").concat(f)]||p[f]||b[f]||o;return n?a.a.createElement(m,u(u({ref:t},s),{},{components:n})):a.a.createElement(m,u({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=f;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:r,c[1]=u;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);