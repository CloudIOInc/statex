(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{164:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var a=n(2),r=n(9),o=(n(0),n(170)),c={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started"},i={id:"introduction/getting-started",title:"Getting Started",description:"Create React App",source:"@site/docs/introduction/getting-started.md",permalink:"/statex/docs/introduction/getting-started",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/introduction/getting-started.md",sidebar_label:"Getting Started",sidebar:"someSidebar",next:{title:"Core Concepts",permalink:"/statex/docs/introduction/core-concepts"}},l=[{value:"Create React App",id:"create-react-app",children:[]},{value:"Installation",id:"installation",children:[]},{value:"Provider",id:"provider",children:[]},{value:"Atom",id:"atom",children:[]},{value:"Selector",id:"selector",children:[]},{value:"Demo",id:"demo",children:[]}],s={rightToc:l};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"create-react-app"},"Create React App"),Object(o.b)("p",null,"StateX is a state management library for React, so you need to have React installed and running to use StateX. The easiest and recommended way for bootstrapping a React application is to use ",Object(o.b)("a",{href:"https://github.com/facebook/create-react-app#creating-an-app",target:"_blank"},"Create React App")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"npx create-react-app my-statex\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"npx")," is a package runner tool that comes with npm 5.2+ and higher.")),Object(o.b)("p",null,"For more ways to install Create React App, see the ",Object(o.b)("a",{href:"https://github.com/facebook/create-react-app#creating-an-app",target:"_blank"},"official documentation"),"."),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)("p",null,"The StateX package lives in ",Object(o.b)("a",{href:"https://www.npmjs.com/get-npm",target:"_blank"},"npm"),". To install the latest stable version, run the following command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"npm install @cloudio/statex\n")),Object(o.b)("p",null,"Or if you're using ",Object(o.b)("a",{href:"https://classic.yarnpkg.com/en/docs/install/",target:"_blank"},"yarn"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-shell"}),"yarn add @cloudio/statex\n")),Object(o.b)("h2",{id:"provider"},"Provider"),Object(o.b)("p",null,"Components that use atom state need ",Object(o.b)("strong",{parentName:"p"},"StateXProvider")," to appear somewhere in the parent tree. A good place to put this is in your root component:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"import React from 'react';\nimport { StateXProvider } from '@cloudio/statex';\n\nfunction App() {\n  return (\n    // highlight-next-line\n    <StateXProvider>\n      <CharacterCounter />\n      // highlight-next-line\n    </StateXProvider>\n  );\n}\n")),Object(o.b)("p",null,"We'll implement the ",Object(o.b)("inlineCode",{parentName:"p"},"CharacterCounter")," component in the following section."),Object(o.b)("h2",{id:"atom"},"Atom"),Object(o.b)("p",null,"An ",Object(o.b)("strong",{parentName:"p"},"atom")," represents a node in the global ",Object(o.b)("strong",{parentName:"p"},"state")," tree. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly ",Object(o.b)("strong",{parentName:"p"},"subscribed")," to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-javascript"}),"const textAtom = atom({\n  // unique path in the state tree\n  path: ['mystate', 'text'],\n  defaultValue: '', // initial value\n});\n")),Object(o.b)("p",null,"Components that need to read from ",Object(o.b)("em",{parentName:"p"},"and")," write to an atom should use ",Object(o.b)("inlineCode",{parentName:"p"},"useStateX()")," as shown below:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"function CharacterCounter() {\n  return (\n    <div>\n      <TextInput />\n      <CharacterCount />\n    </div>\n  );\n}\n\nfunction TextInput() {\n  const [text, setText] = useStateX(textAtom);\n\n  const onChange = (event) => {\n    setText(event.target.value);\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={onChange} />\n      <br />\n      Echo: {text}\n    </div>\n  );\n}\n")),Object(o.b)("h2",{id:"selector"},"Selector"),Object(o.b)("p",null,"A ",Object(o.b)("strong",{parentName:"p"},"selector")," represents a piece of ",Object(o.b)("strong",{parentName:"p"},"derived atom"),". Derived atom is a ",Object(o.b)("strong",{parentName:"p"},"transformation")," of one or more atoms. You can think of derived atom as the output of passing atom to a pure function that modifies the given atom in some way:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"const charCountSelector = selector({\n  path: ['mystate', 'charCount'], // unique path\n  get: ({ get }) => {\n    const text = get(textAtom);\n\n    return text.length;\n  },\n});\n")),Object(o.b)("p",null,"We can use the ",Object(o.b)("inlineCode",{parentName:"p"},"useStateXValue()")," hook to read the value of ",Object(o.b)("inlineCode",{parentName:"p"},"charCountSelector"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"function CharacterCount() {\n  const count = useStateXValue(charCountSelector);\n\n  return <>Character Count: {count}</>;\n}\n")),Object(o.b)("p",null,"We can use also use just the path, without having to define an atom, to read or write the state at any node in the tree. Below, is an example where we read the root JSON object at the root atom which has a nested atom 'mystate' which intern has 'text' & 'charCount'"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"function JSONPayload() {\n  const json = useStateXValue(['mystate'], {});\n\n  return <pre>{JSON.stringify(json, null, '  ')}</pre>;\n}\n")),Object(o.b)("h2",{id:"demo"},"Demo"),Object(o.b)("p",null,"Below is the finished product:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const textAtom = atom({\n  path: ['mystate', 'text'],\n  defaultValue: '',\n});\n\nconst charCountSelector = selector({\n  path: ['mystate', 'charCount'],\n  defaultValue: 0,\n  get: ({ get }) => {\n    const text = get(textAtom);\n\n    return text.length;\n  },\n});\n\nfunction CharacterCounter() {\n  return (\n    <>\n      <TextInput />\n      <CharacterCount />\n      <JSONPayload />\n    </>\n  );\n}\n\nfunction CharacterCount() {\n  const count = useStateXValue(charCountSelector);\n\n  return <>Character Count: {count}</>;\n}\n\nfunction JSONPayload() {\n  const json = useStateXValue([], {});\n\n  return (\n    <>\n      <pre>{JSON.stringify(json, null, '  ')}</pre>\n    </>\n  );\n}\n\nfunction TextInput() {\n  const [text, setText] = useStateX(textAtom);\n\n  const onChange = (event) => {\n    setText(event.target.value);\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={onChange} />\n      <br />\n      Echo: {text}\n    </div>\n  );\n}\n\nreturn <CharacterCounter />;\n")))}u.isMDXComponent=!0},170:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),u=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,d=p["".concat(c,".").concat(m)]||p[m]||b[m]||o;return n?r.a.createElement(d,i(i({ref:t},s),{},{components:n})):r.a.createElement(d,i({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var s=2;s<o;s++)c[s]=n[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);