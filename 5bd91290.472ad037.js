(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{69:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(6),o=(n(0),n(97)),i={title:"selector(options)",sidebar_label:"selector()"},l={id:"api-reference/core/selector",isDocsHomePage:!1,title:"selector(options)",description:"Returns writeable or read-only StateX derived/calculated state at a given path, depending on the options passed to the function.",source:"@site/docs/api-reference/core/selector.md",permalink:"/statex/docs/api-reference/core/selector",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/api-reference/core/selector.md",sidebar_label:"selector()",sidebar:"someSidebar",previous:{title:"atom(options)",permalink:"/statex/docs/api-reference/core/atom"},next:{title:"action()",permalink:"/statex/docs/api-reference/core/action"}},s=[{value:"Demo",id:"demo",children:[]},{value:"Asynchronous Demo",id:"asynchronous-demo",children:[]}],c={rightToc:s};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Returns writeable or read-only StateX derived/calculated state at a given ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"path"}),"path"),", depending on the options passed to the function."),Object(o.b)("p",null,"Selectors represent ",Object(o.b)("strong",{parentName:"p"},"derived state"),". You can think of derived state as the output of passing state to a pure function that modifies the given state in some way."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"options")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"path"),": A unique json path for this selector. This path should be unique with respect to other atoms and selectors in the entire application. Path can have placeholders (bind variables) e.g. ","['employee', ':empId']")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},Object(o.b)("inlineCode",{parentName:"p"},"defaultValue"),": The initial value of the selector.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx",metastring:'title="shouldComponentUpdate?:"',title:'"shouldComponentUpdate?:"'}),"(value: Readonly<T>, oldValue?: Readonly<T>) => boolean;\n")),Object(o.b)("p",{parentName:"li"},"Similar to the react class component lifecyle method, if set, will be invoked before triggering a re-render of the component due to a change in the state. Return false to prevent re-rendering of the component subscribed to this atom."),Object(o.b)("blockquote",{parentName:"li"},Object(o.b)("p",{parentName:"blockquote"},"Returning false will also prevent the below functions updater & onChange from being invoked."))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx",metastring:'title="get: A function that is passed an object as the first parameter containing the following properties:"',title:'"get:',A:!0,function:!0,that:!0,is:!0,passed:!0,an:!0,object:!0,as:!0,the:!0,first:!0,parameter:!0,containing:!0,following:!0,'properties:"':!0}),"get: StateXGetter;\nset: StateXSetter;\ncall: StateXActionCaller;\nremove: StateXRemover;\nparams?: Record<string, Key>;\n")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"get")," All atoms/selectors passed to this function will be implicitly added to a list of ",Object(o.b)("strong",{parentName:"li"},"dependencies")," for the selector. If any of the selector's dependencies change, the selector will re-evaluate."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"set")," Can be used to set value of other paths/atoms/selectors."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"remove")," Can be used to remove value at other paths or atoms."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"call")," Can be used to invoke other actions."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"params?:")," Are the key/value pairs used to evaluate this selector's path with placeholders"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx",metastring:'title="set?: If this property is set, the selector will return **writeable** state. A function that is passed an object as the first parameter containing the following properties:"',title:'"set?:',If:!0,this:!0,property:!0,is:!0,"set,":!0,the:!0,selector:!0,will:!0,return:!0,"**writeable**":!0,"state.":!0,A:!0,function:!0,that:!0,passed:!0,an:!0,object:!0,as:!0,first:!0,parameter:!0,containing:!0,following:!0,'properties:"':!0}),"get: StateXGetter;\nset: StateXSetter;\ncall: StateXActionCaller;\nremove: StateXRemover;\nparams?: Record<string, Key>;\n")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"get")," a function used to retrieve values from other paths/atoms/selectors. This function will not subscribe the selector to the given atoms/selectors."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"set")," Can be used to set value of other paths/atoms/selectors."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"remove")," Can be used to remove value at other paths or atoms."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"call")," Can be used to invoke other actions."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"params?:")," Are the key/value pairs used to evaluate this selector's path with placeholders")))))),Object(o.b)("h3",{id:"demo"},"Demo"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const fahrenheit = atom({\n  path: ['fahrenheit'],\n  defaultValue: 32,\n});\n\nconst celcius = selector({\n  path: ['celcius'],\n  get: ({ get, set }) => {\n    const value = ((get(fahrenheit) - 32) * 5) / 9;\n    // uncomment the below line to store the derived state\n    // set(['celcius_value'], value);\n    return value;\n  },\n  set: ({ set, value }) => {\n    set(fahrenheit, (value * 9) / 5 + 32);\n  },\n});\n\nfunction TempCelcius() {\n  const [tempF, setTempF] = useStateX(fahrenheit);\n  const [tempC, setTempC] = useStateX(celcius);\n\n  const addTenCelcius = () => setTempC(tempC + 10);\n  const addTenFahrenheit = () => setTempF(tempF + 10);\n\n  return (\n    <div>\n      Temp (Celcius): {tempC}\n      <br />\n      Temp (Fahrenheit): {tempF}\n      <br />\n      <button onClick={addTenCelcius}>Add 10 Celcius</button>\n      <br />\n      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>\n    </div>\n  );\n}\n\nreturn <TempCelcius />;\n")),Object(o.b)("h3",{id:"asynchronous-demo"},"Asynchronous Demo"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"function asyncGet(fahrenheit) {\n  return new Promise((resolve) =>\n    setTimeout(() => resolve(((fahrenheit - 32) * 5) / 9), 3000),\n  );\n}\n\nconst fahrenheit = atom({\n  path: ['fahrenheit'],\n  defaultValue: 32,\n});\n\nconst celcius = selector({\n  path: ['celcius'],\n  get: ({ get }) => asyncGet(get(fahrenheit)),\n  set: ({ set, value }) => set(fahrenheit, (value * 9) / 5 + 32),\n});\n\nfunction Fahrenheit() {\n  const [tempF, setTempF] = useStateX(fahrenheit);\n  const addTenFahrenheit = () => setTempF(tempF + 10);\n\n  return (\n    <div>\n      Temp (Fahrenheit): {tempF}\n      <br />\n      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>\n    </div>\n  );\n}\n\nfunction Celcius() {\n  const [tempC, setTempC] = useStateX(celcius);\n  const addTenCelcius = () => setTempC(tempC + 10);\n\n  return (\n    <div>\n      Temp (Celcius): {tempC}\n      <br />\n      <button onClick={addTenCelcius}>Add 10 Celcius</button>\n    </div>\n  );\n}\n\nreturn (\n  <>\n    <Suspense fallback={'Calculating Fahrenheit...'}>\n      <Fahrenheit />\n    </Suspense>\n    <Suspense fallback={'Calculating Celcius...'}>\n      <Celcius />\n    </Suspense>\n  </>\n);\n")))}p.isMDXComponent=!0},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,d=u["".concat(i,".").concat(m)]||u[m]||b[m]||o;return n?r.a.createElement(d,l(l({ref:t},c),{},{components:n})):r.a.createElement(d,l({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);