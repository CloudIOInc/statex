(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{147:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return u})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return l}));var r=n(2),a=n(9),o=(n(0),n(169)),c={title:"useRemoveStateX()"},u={id:"api-reference/core/useRemoveStateX",title:"useRemoveStateX()",description:"Returns a function that will delete the value of the given state.",source:"@site/docs/api-reference/core/useRemoveStateX.md",permalink:"/statex/docs/api-reference/core/useRemoveStateX",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/useRemoveStateX.md",sidebar:"someSidebar",previous:{title:"useStateXGetter()",permalink:"/statex/docs/api-reference/core/useStateXGetter"},next:{title:"useStateXCallback()",permalink:"/statex/docs/api-reference/core/useStateXCallback"}},i=[{value:"Demo",id:"demo",children:[]}],s={rightToc:i};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Returns a function that will delete the value of the given state."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useRemoveStateX(atom)"',title:'"useRemoveStateX(atom)"'}),"function useRemoveStateX<T>(\n  atom: Atom<T>,\n  options?: StateXOptions<T>,\n): [Readonly<T>, () => Readonly<T>];\n")),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="useRemoveStateX(path)"',title:'"useRemoveStateX(path)"'}),"function useRemoveStateX<T>(\n  path: Path,\n  defaultValue: T,\n  options?: StateXOptions<T>,\n): [Readonly<T>, () => Readonly<T>];\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Use ",Object(o.b)("inlineCode",{parentName:"p"},"useStateXValueRemover()")," to just remove the state without reading it's value."),Object(o.b)("pre",{parentName:"blockquote"},Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx"}),"function useStateXValueRemover<T>(\n  pathOrAtom: Path | Atom<T>,\n  options?: Options,\n): () => Readonly<T>\n"))),Object(o.b)("h3",{id:"demo"},"Demo"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const users = useStateXValue(\n  ['userArray'],\n  ['User 1', 'User 2', 'User 3', 'User 4'],\n);\n\nconst [user, deleteUser] = useRemoveStateX(['userArray', ':index'], '', {\n  params: { index: users.length - 1 },\n});\n\nreturn <button onClick={deleteUser}>Delete {user}</button>;\n")))}l.isMDXComponent=!0},169:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),l=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=l(n),b=r,f=p["".concat(c,".").concat(b)]||p[b]||m[b]||o;return n?a.a.createElement(f,u(u({ref:t},s),{},{components:n})):a.a.createElement(f,u({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=b;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:r,c[1]=u;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);