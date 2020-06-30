(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{213:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(425),l=a(0),r=a(163);function o(){var e=Object(r.a)().isDarkTheme;return Object(l.useMemo)((function(){return Object(n.a)({palette:{type:e?"dark":"light",primary:{light:"rgba(239, 103, 13, 0.65)",main:"#ef670d",dark:"#ef670d",contrastText:"#fff"},secondary:{light:"rgba(239, 103, 13, 0.65)",main:"#ef670d",dark:"#ef670d",contrastText:"#fff"}},overrides:{MuiButton:{root:{textTransform:"none"}},MuiTab:{root:{textTransform:"none"}}}})}),[e])}},95:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return X})),a.d(t,"metadata",(function(){return V})),a.d(t,"rightToc",(function(){return L})),a.d(t,"default",(function(){return I}));var n=a(2),l=a(6),r=a(0),o=a.n(r),c=a(97),s=a(114),u=a(475),i=a(471),m=a(469),h=a(472),p=a(477),d=a(480),b=a(470),f=(a(221),a(144),["form","person","lastName"]),g=Object(s.atom)({path:["form","person","firstName"],defaultValue:"",updater:function(e){var t=e.value,a=e.oldValue,n=e.get,l=e.set,r=n(f);return(null==r?void 0:r.toUpperCase())===(null==a?void 0:a.toUpperCase())&&l(f,t.toLowerCase()),t.toUpperCase()}}),j=Object(s.selector)({path:["form","person","fullName"],defaultValue:"",get:function(e){var t=e.get,a=t(g),n=t(f);return a&&n?a+" "+n:""}}),N=Object(s.selector)({path:["form","person","fullNameCount"],defaultValue:0,get:function(e){var t=(0,e.get)(j);return new Promise((function(e){setTimeout((function(){return e(t.length)}),1e3)}))}});function O(){var e=Object(s.useStateXValue)(j);return e?o.a.createElement(o.a.Fragment,null,"Full Name: ",e):o.a.createElement(o.a.Fragment,null,"Type your first name!")}function v(){var e=Object(s.useStateXValue)(N);return 0===e?o.a.createElement(o.a.Fragment,null,"..."):o.a.createElement(o.a.Fragment,null,e," chars!")}function x(e){var t=e.path,a=e.label,l=e.autoFocus,r=Object(s.useStateXForTextInput)(t,"");return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,Object(n.a)({},r,{autoFocus:l,label:a,helperText:"@ path ["+t.join(".")+"]",fullWidth:!0})))}function w(){var e=Object(s.useStateXSetter)();return o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{variant:"contained",onClick:function(){e(g,""),e(f,"")}},"Clear"))}function C(){var e=Object(r.useState)("firstName"),t=e[0],a=e[1];return o.a.createElement("div",null,o.a.createElement(d.a,{value:t,onChange:function(e,t){return a(t)},row:!0},o.a.createElement(b.a,{value:"firstName",control:o.a.createElement(p.a,null),label:"First Name"}),o.a.createElement(b.a,{value:"lastName",control:o.a.createElement(p.a,null),label:"Last Name"})),o.a.createElement(x,{label:t,path:["form","person",t]}))}function S(){var e=Object(s.useStateXValue)(["form"],{});return o.a.createElement("pre",null,JSON.stringify(e,null,"  "))}function F(){return o.a.createElement(h.a,{container:!0,spacing:3},o.a.createElement(h.a,{item:!0,xs:6},o.a.createElement(x,{autoFocus:!0,label:"First Name",path:g.path})),o.a.createElement(h.a,{item:!0,xs:6},o.a.createElement(x,{label:"Last Name",path:f})),o.a.createElement(h.a,{item:!0,xs:12},o.a.createElement(C,null)),o.a.createElement(h.a,{item:!0,xs:12},o.a.createElement(O,null)),o.a.createElement(h.a,{item:!0,xs:12},o.a.createElement(r.Suspense,{fallback:o.a.createElement(i.a,null,"Loading count...")},o.a.createElement(v,null))),o.a.createElement(h.a,{item:!0,xs:12},o.a.createElement(w,null)),o.a.createElement(h.a,{item:!0,xs:12},o.a.createElement(S,null)))}var E=a(8),y=a(468),T=a(213);function k(){var e=Object(T.a)();return E.a.canUseDOM?o.a.createElement(s.StateXProvider,null,o.a.createElement(y.a,{theme:e},o.a.createElement(F,null))):null}var X={id:"form",title:"Form"},V={id:"examples/form",isDocsHomePage:!1,title:"Form",description:"This section assumes you have installed StateX and React. See the Getting Started page for how to get started with StateX and React from scratch.",source:"@site/docs/examples/form.md",permalink:"/statex/docs/examples/form",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/examples/form.md",sidebar:"someSidebar",previous:{title:"Selectors",permalink:"/statex/docs/basic-tutorial/actions"},next:{title:"Performance",permalink:"/statex/docs/examples/performance"}},L=[{value:"Demo",id:"demo",children:[]},{value:"Code Walkthrough",id:"code-walkthrough",children:[{value:"First Name Field",id:"first-name-field",children:[]},{value:"Dynamic Field",id:"dynamic-field",children:[]},{value:"Full Name Selector",id:"full-name-selector",children:[]},{value:"Full Name Character Count Async Selector",id:"full-name-character-count-async-selector",children:[]},{value:"Clear Button",id:"clear-button",children:[]},{value:"State JSON",id:"state-json",children:[]}]}],D={rightToc:L};function I(e){var t=e.components,a=Object(l.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},D,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"This section assumes you have installed StateX and React. See the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:".."}),"Getting Started")," page for how to get started with StateX and React from scratch."),Object(c.b)("p",null,"In this example, we'll cover atoms, selectors, and the hooks exposed by the StateX API. We'll also cover some advanced options used with atoms."),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"Try entering your first name and watch all other fields, last name, full name, full name count (async), full JSON view auto populate with what you enter and scoll below for the code walkthrough on how this form is built. Click ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#demo"}),"Demo")," to scroll the below demo in to full view.")),Object(c.b)("h3",{id:"demo"},"Demo"),Object(c.b)(k,{mdxType:"App"}),Object(c.b)("p",null,Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/CloudIOInc/statex/blob/master/website/src/components/form/App.tsx"}),"View this code on github")),Object(c.b)("h2",{id:"code-walkthrough"},"Code Walkthrough"),Object(c.b)("h3",{id:"first-name-field"},"First Name Field"),Object(c.b)("p",null,"Note that the text typed in the first name gets transformed to uppercase and at the same time get's copied to last name in lowercase. This is achived by using the ",Object(c.b)("inlineCode",{parentName:"p"},"updater")," option of ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"../api-reference/core/atom"}),"atom"),"."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"const firstName = atom({\n  path: ['form', 'person', 'firstName'],\n  defaultValue: '',\n  updater: ({ value, oldValue, get, set }) => {\n    const name = get(lastName);\n    if (name?.toUpperCase() === oldValue?.toUpperCase()) {\n      // highlight-next-line\n      set(lastName, value.toLowerCase());\n    }\n    // highlight-next-line\n    return value.toUpperCase();\n  },\n});\n")),Object(c.b)("h3",{id:"dynamic-field"},"Dynamic Field"),Object(c.b)("p",null,"The path can be dynamically changed as shown below where it's swtiched between firstName & lastName."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function DynamicField() {\n  // highlight-next-line\n  const [field, setField] = useState('firstName');\n  return (\n    <div>\n      <RadioGroup value={field} onChange={(e, value) => setField(value)} row>\n        <FormControlLabel\n          value=\"firstName\"\n          control={<Radio />}\n          label=\"First Name\"\n        />\n        <FormControlLabel\n          value=\"lastName\"\n          control={<Radio />}\n          label=\"Last Name\"\n        />\n      </RadioGroup>\n      // highlight-next-line\n      <TextInput label={field} path={['form', 'person', field]} />\n    </div>\n  );\n}\n\nfunction TextInput({ path, label, autoFocus }: Props) {\n  // highlight-next-line\n  const [text, setText] = useStateX(path, '');\n\n  return (\n    <>\n      <TextField\n        // highlight-next-line\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        autoFocus={autoFocus}\n        label={label}\n        style={{ margin: 8 }}\n        placeholder={label}\n        helperText={`@ path [${path.join('.')}]`}\n        fullWidth\n        margin=\"normal\"\n        InputLabelProps={{\n          shrink: true,\n        }}\n      />\n    </>\n  );\n}\n")),Object(c.b)("h3",{id:"full-name-selector"},"Full Name Selector"),Object(c.b)("p",null,"Full Name is derived using a selector. Note that we access firstName & lastName using the get function that is passed as an option to the ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"../api-reference/core/selector"}),"selector"),"'s get function."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"const fullName = selector({\n  path: ['form', 'person', 'fullName'],\n  defaultValue: '',\n  get: ({ get }) => {\n    // highlight-next-line\n    const fn = get(firstName);\n    const ln = get(lastName);\n    if (fn && ln) {\n      return `${fn} ${ln}`;\n    }\n    return '';\n  },\n});\n")),Object(c.b)("h3",{id:"full-name-character-count-async-selector"},"Full Name Character Count Async Selector"),Object(c.b)("p",null,"Full Name Character Count is derived asyncronusly using a selector that returns a Promise. Note that we access fullName, which is another ",Object(c.b)("inlineCode",{parentName:"p"},"selector"),"."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"const fullNameCount = selector({\n  path: ['form', 'person', 'fullNameCount'],\n  defaultValue: 0,\n  get: ({ get }) => {\n    const fn = get(fullName);\n    // return fn.length;\n    // highlight-next-line\n    return new Promise((resolve) => {\n      setTimeout(() => resolve(fn.length), 1000);\n    });\n  },\n});\n\nfunction FullNameCount() {\n  const count = useStateXValue(fullNameCount);\n  if (count === 0) {\n    return <>...</>;\n  }\n  return <>{count} chars!</>;\n}\n")),Object(c.b)("h3",{id:"clear-button"},"Clear Button"),Object(c.b)("p",null,"Use ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"../api-reference/core/useStateXValueSetter"}),"useStateXValueSetter")," hook to just perform a state update without subscribing to it's value."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function Clear() {\n  // highlight-next-line\n  const setFirstName = useStateXValueSetter(firstName);\n  const setLastName = useStateXValueSetter(lastName);\n\n  function clear() {\n    setFirstName('');\n    setLastName('');\n  }\n\n  return (\n    <>\n      <Button variant=\"contained\" onClick={clear}>\n        Clear\n      </Button>\n    </>\n  );\n}\n")),Object(c.b)("h3",{id:"state-json"},"State JSON"),Object(c.b)("p",null,"And finally, we can access the complete state by using the parent path e.g. ","['form']"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"function ShowState() {\n  // highlight-next-line\n  const json = useStateXValue(['form'], {});\n  return (\n    <Card variant=\"outlined\" color=\"black\">\n      <CardContent>\n        <pre>{JSON.stringify(json, null, '  ')}</pre>\n      </CardContent>\n    </Card>\n  );\n}\n")))}I.isMDXComponent=!0}}]);