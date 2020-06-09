(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{102:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a(2),r=a(6),o=(a(0),a(134)),l={title:"useStateXValue()",sidebar_label:"useStateXValue()"},c={id:"api-reference/core/useStateXValue",title:"useStateXValue()",description:"Returns the value of the given Path, StateX or Selector state.",source:"@site/docs/api-reference/core/useStateXValue.md",permalink:"/statex/docs/api-reference/core/useStateXValue",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useStateXValue.md",sidebar_label:"useStateXValue()",sidebar:"someSidebar",previous:{title:"useStateX()",permalink:"/statex/docs/api-reference/core/useStateX"},next:{title:"useStateXValueSetter()",permalink:"/statex/docs/api-reference/core/useStateXValueSetter"}},i=[{value:"Default Value Demo",id:"default-value-demo",children:[]},{value:"Demo",id:"demo",children:[]}],u={rightToc:i};function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Returns the value of the given Path, StateX or Selector state."),Object(o.b)("p",null,"This hook will implicitly subscribe the component to the given state."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"state"),": a ",Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"path"}),Object(o.b)("inlineCode",{parentName:"a"},"path"))," or ",Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"atom"}),Object(o.b)("inlineCode",{parentName:"a"},"atom"))," or ",Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"selector"}),Object(o.b)("inlineCode",{parentName:"a"},"selector")))),Object(o.b)("p",null,"This is the recommended hook to use when a component intends to read state without writing to it. atoms are writeable state while selectors may be either read-only or writeable. See ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"selector"}),Object(o.b)("inlineCode",{parentName:"a"},"selector()"))," for more info."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"The parameter options used in ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"useStateX"}),Object(o.b)("inlineCode",{parentName:"a"},"useStateX()"))," are applicable for ",Object(o.b)("inlineCode",{parentName:"p"},"useStateXValue()")," as well.")),Object(o.b)("h2",{id:"default-value-demo"},"Default Value Demo"),Object(o.b)("p",null,"If the state at a specific node is not set, it will be updated with the default value as shown below."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"live open",live:!0,open:!0}),"useWithStateX({});\n\nconst value = useStateXValue(['count'], 5);\n\nreturn value;\n")),Object(o.b)("h2",{id:"demo"},"Demo"),Object(o.b)("p",null,"If the state exists, then the default value will be ignored. The default value also helps in inferring the state type."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"live open",live:!0,open:!0}),"useWithStateX({ count: 10 });\n\nconst value = useStateXValue(['count'], 5);\n\nreturn value;\n")))}s.isMDXComponent=!0},134:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return f}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var u=r.a.createContext({}),s=function(e){var t=r.a.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=s(e.components);return r.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(a),m=n,f=p["".concat(l,".").concat(m)]||p[m]||b[m]||o;return a?r.a.createElement(f,c(c({ref:t},u),{},{components:a})):r.a.createElement(f,c({ref:t},u))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,l=new Array(o);l[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:n,l[1]=c;for(var u=2;u<o;u++)l[u]=a[u];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);