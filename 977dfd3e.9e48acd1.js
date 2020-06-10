(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{156:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(9),l=(n(0),n(170)),o={title:"Resolveable",sidebar_label:"useStateXValueResolveable()"},s={id:"api-reference/core/useStateXValueResolveable",title:"Resolveable",description:"useStateXValueResolveable",source:"@site/docs/api-reference/core/useStateXValueResolveable.md",permalink:"/statex/docs/api-reference/core/useStateXValueResolveable",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useStateXValueResolveable.md",sidebar_label:"useStateXValueResolveable()",sidebar:"someSidebar",previous:{title:"useStateXCallback()",permalink:"/statex/docs/api-reference/core/useStateXCallback"}},i=[{value:"useStateXValueResolveable",id:"usestatexvalueresolveable",children:[]},{value:"SelectorOptions",id:"selectoroptions",children:[]},{value:"Demo",id:"demo",children:[]}],c={rightToc:i};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(l.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"usestatexvalueresolveable"},"useStateXValueResolveable"),Object(l.b)("p",null,"This hook is intended to be used for reading the value of asynchronous ",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"selector"}),"selectors"),". This hook will implicitly subscribe the component to the given state."),Object(l.b)("p",null,"Unlike ",Object(l.b)("a",Object(r.a)({parentName:"p"},{href:"useStateXValue"}),"useStateXValue()"),", this hook will not throw a Promise when reading from a pending asynchronous selector (for the purpose of working alongside Suspense). Instead, this hook returns a Resolveable, which is an object with the following interface:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"status"),": indicates the status of the selector. Possible values are ",Object(l.b)("inlineCode",{parentName:"li"},"resolved"),", ",Object(l.b)("inlineCode",{parentName:"li"},"error"),", ",Object(l.b)("inlineCode",{parentName:"li"},"pending"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"value"),": The value represented by this ",Object(l.b)("inlineCode",{parentName:"li"},"Resolveable"),". If the state is ",Object(l.b)("inlineCode",{parentName:"li"},"resolved"),", it is the actual value."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"isDefault"),": This will be set to true during the first render. i.e. the resolveable is resolved with the selector's default value during the first render"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"error"),": if there is an error, this will contain the error object that was thrown."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"promise"),": The ",Object(l.b)("inlineCode",{parentName:"li"},"Promise")," that will resolve when the selector has resolved. If the selector is synchronous or has already resolved, it returns a ",Object(l.b)("inlineCode",{parentName:"li"},"Promise")," that resolves immediately.")),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useStateXValueResolveable(selector, options)"',title:'"useStateXValueResolveable(selector,','options)"':!0}),"function useStateXValueResolveable<T>(\n  selector: Selector<T>,\n  options?: StateXOptions<T>,\n): Resolvable<Readonly<T>>\n")),Object(l.b)("p",null,"For writable selectors"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useStateXResolveable(selector, options)"',title:'"useStateXResolveable(selector,','options)"':!0}),"function useStateXResolveable<T>(\n  selector: Selector<T>,\n  options?: StateXOptions<T>,\n): [Resolvable<Readonly<T>>, Dispatch<T>]\n")),Object(l.b)("h2",{id:"selectoroptions"},"SelectorOptions"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{}),"interface SelectorOptions<T> {\n  params?: Record<string, Key>;\n  shouldComponentUpdate?: (\n    value: Readonly<T>,\n    oldValue?: Readonly<T>,\n  ) => boolean;\n}\n")),Object(l.b)("p",null,"Use this hook when reading a value from an async selector"),Object(l.b)("h2",{id:"demo"},"Demo"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"function fetchUser(name) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve(`Hello ${name}!`);\n    }, 3000);\n  });\n}\n\nconst userSelector = selector({\n  path: ['promise', ':name'],\n  defaultValue: '',\n  get: ({ params }) => {\n    return fetchUser(params.name);\n  },\n});\n\nfunction Resolveable() {\n  const user = useStateXValueResolveable(userSelector, {\n    params: { name: 'World' }, // try your name\n  });\n  let value;\n  switch (user.status) {\n    case 'resolved':\n      value = user.value;\n      break;\n    case 'pending':\n      value = 'Resolving...';\n      break;\n    case 'error':\n      value = user.error.toString();\n      break;\n  }\n\n  return value;\n}\n\nreturn <Resolveable />;\n")))}u.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),u=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),b=u(n),d=r,m=b["".concat(o,".").concat(d)]||b[d]||p[d]||l;return n?a.a.createElement(m,s(s({ref:t},c),{},{components:n})):a.a.createElement(m,s({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<l;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);