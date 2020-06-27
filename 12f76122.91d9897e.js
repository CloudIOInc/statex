(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{54:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var a=n(2),o=n(6),r=(n(0),n(94)),c={title:"useStateX()",sidebar_label:"useStateX()"},i={id:"api-reference/core/useStateX",isDocsHomePage:!1,title:"useStateX()",description:"Returns a tuple similar to React.useState(). This hook will implicitly subscribe the component to the given atom. useStateX can be used with either path, atom or writable selector.",source:"@site/docs/api-reference/core/useStateX.md",permalink:"/statex/docs/api-reference/core/useStateX",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useStateX.md",sidebar_label:"useStateX()",sidebar:"someSidebar",previous:{title:"action()",permalink:"/statex/docs/api-reference/core/action"},next:{title:"useStateXValue()",permalink:"/statex/docs/api-reference/core/useStateXValue"}},s=[{value:"useStateX(path)",id:"usestatexpath",children:[]},{value:"useStateX(atom)",id:"usestatexatom",children:[]},{value:"useStateX(selector)",id:"usestatexselector",children:[]},{value:"StateXOptions",id:"statexoptions",children:[{value:"shouldComponentUpdate Demo",id:"shouldcomponentupdate-demo",children:[]}]}],u={rightToc:s};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Returns a tuple similar to React.useState(). This hook will implicitly subscribe the component to the given atom. useStateX can be used with either path, atom or writable selector."),Object(r.b)("h2",{id:"usestatexpath"},"useStateX(path)"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useStateX(path, options)"',title:'"useStateX(path,','options)"':!0}),"function useStateX<T>(\n  path: Path,\n  defaultValue: T,\n  options?: StateXOptions<T>,\n): [Readonly<T>, Dispatch<T>];\n")),Object(r.b)("h2",{id:"usestatexatom"},"useStateX(atom)"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useStateX(atom, options)"',title:'"useStateX(atom,','options)"':!0}),"function useStateX<T>(\n  atom: Atom<T>,\n  options?: StateXOptions<T>,\n): [Readonly<T>, Dispatch<T>];\n")),Object(r.b)("h2",{id:"usestatexselector"},"useStateX(selector)"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useStateX(selector, options)"',title:'"useStateX(selector,','options)"':!0}),"function useStateX<T>(\n  atom: Selector<T>,\n  options?: StateXOptions<T>,\n): [Readonly<T>, Dispatch<T>];\n")),Object(r.b)("h2",{id:"statexoptions"},"StateXOptions"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"interface StateXOptions<T> {\n  params?: Record<string, Key>;\n  shouldComponentUpdate?: (\n    value: Readonly<T>,\n    oldValue?: Readonly<T>,\n  ) => boolean;\n  onChange?: (props: {\n    value: Readonly<T>;\n    oldValue?: Readonly<T>;\n    get: StateXGetter;\n    set: StateXSetter;\n  }) => void;\n}\n")),Object(r.b)("p",null,"This is the recommended hook to use when a component intends to read and write state."),Object(r.b)("h3",{id:"shouldcomponentupdate-demo"},"shouldComponentUpdate Demo"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const countStateX = atom({\n  path: ['count'],\n  defaultValue: 1,\n});\n\nfunction Odd() {\n  const [count, setCount] = useStateX(countStateX, {\n    shouldComponentUpdate: (value, oldValue) => value % 2 !== 0,\n  });\n  const increment = () => setCount((count) => count + 1);\n\n  return (\n    <div>\n      Rendered when the count is an Odd number: {count}\n      <br />\n      <button onClick={increment}>Inrement</button>\n    </div>\n  );\n}\n\nfunction Even() {\n  const [count, setCount] = useStateX(countStateX, {\n    shouldComponentUpdate: (value, oldValue) => value % 2 === 0,\n  });\n  const increment = () => setCount((count) => count + 1);\n\n  return (\n    <div>\n      Rendered when the count is an Even number: {count}\n      <br />\n      <button onClick={increment}>Inrement</button>\n    </div>\n  );\n}\n\nreturn (\n  <>\n    <Odd />\n    <Even />\n  </>\n);\n")))}l.isMDXComponent=!0},94:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),l=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=a,b=p["".concat(c,".").concat(m)]||p[m]||d[m]||r;return n?o.a.createElement(b,i(i({ref:t},u),{},{components:n})):o.a.createElement(b,i({ref:t},u))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,c=new Array(r);c[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var u=2;u<r;u++)c[u]=n[u];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);