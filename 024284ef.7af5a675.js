(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{129:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return b}));var o=n(0),a=n.n(o);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,o,a=function(t,e){if(null==t)return{};var n,o,a={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var u=a.a.createContext({}),c=function(t){var e=a.a.useContext(u),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},d=function(t){var e=c(t.components);return a.a.createElement(u.Provider,{value:e},t.children)},p={inlineCode:"code",wrapper:function(t){var e=t.children;return a.a.createElement(a.a.Fragment,{},e)}},m=a.a.forwardRef((function(t,e){var n=t.components,o=t.mdxType,i=t.originalType,r=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),d=c(n),m=o,b=d["".concat(r,".").concat(m)]||d[m]||p[m]||i;return n?a.a.createElement(b,s(s({ref:e},u),{},{components:n})):a.a.createElement(b,s({ref:e},u))}));function b(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s.mdxType="string"==typeof t?t:o,r[1]=s;for(var u=2;u<i;u++)r[u]=n[u];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},99:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return r})),n.d(e,"metadata",(function(){return s})),n.d(e,"rightToc",(function(){return l})),n.d(e,"default",(function(){return c}));var o=n(2),a=n(6),i=(n(0),n(129)),r={title:"Atoms"},s={id:"basic-tutorial/atoms",title:"Atoms",description:"Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item.",source:"@site/docs/basic-tutorial/atoms.md",permalink:"/statex/docs/basic-tutorial/atoms",editUrl:"https://github.com/CloudIOInc/statex/website/docs/basic-tutorial/atoms.md",sidebar:"someSidebar",previous:{title:"Intro",permalink:"/statex/docs/basic-tutorial/intro"},next:{title:"Selectors",permalink:"/statex/docs/basic-tutorial/selectors"}},l=[{value:"Demo",id:"demo",children:[]}],u={rightToc:l};function c(t){var e=t.components,n=Object(a.a)(t,["components"]);return Object(i.b)("wrapper",Object(o.a)({},u,n,{components:e,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item."),Object(i.b)("p",null,"We'll call our list atom ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom")," and create it using the ",Object(i.b)("inlineCode",{parentName:"p"},"atom()")," function:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"const todoListAtom = atom({\n  path: ['todo', 'list'],\n  defaultValue: [],\n});\n")),Object(i.b)("p",null,"We give our atom a unique ",Object(i.b)("inlineCode",{parentName:"p"},"path")," and set the ",Object(i.b)("inlineCode",{parentName:"p"},"defaultValue")," to an empty array. To read the contents of this atom, we can use the ",Object(i.b)("inlineCode",{parentName:"p"},"useStateXValue()")," hook in our ",Object(i.b)("inlineCode",{parentName:"p"},"TodoList")," component:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const ToDoList = memo(() => {\n  return (\n    <div style={{ padding: 40 }}>\n      {/* <TodoListStats /> */}\n      {/* <TodoListFilters /> */}\n      <TodoItemCreator />\n      <TodoList />\n      <JSONPreview />\n    </div>\n  );\n});\n")),Object(i.b)("p",null,"The commented-out components will be implemented in the sections that follow."),Object(i.b)("p",null,"To create new todo items, we need to access a setter function that will update\nthe contents of the ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom"),". We can use the ",Object(i.b)("inlineCode",{parentName:"p"},"useStateXValueSetter()"),"\nhook to get a setter function in our ",Object(i.b)("inlineCode",{parentName:"p"},"TodoItemCreator")," component:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"function TodoItemCreator() {\n  const [inputValue, setInputValue] = useState('');\n  const setTodoList = useStateXValueSetter(todoList);\n\n  const addItem = () => {\n    setTodoList((oldTodoList) => [\n      ...oldTodoList,\n      {\n        id: getId(),\n        text: inputValue,\n      },\n    ]);\n    setInputValue('');\n  };\n\n  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {\n    setInputValue(value);\n  };\n\n  return (\n    <div>\n      <input type='text' value={inputValue} onChange={onChange} />\n      <button onClick={addItem}>Add</button>\n    </div>\n  );\n}\n\n// utility for creating unique Id\nlet id = 0;\nfunction getId() {\n  return id++;\n}\n")),Object(i.b)("p",null,"Notice we use the ",Object(i.b)("strong",{parentName:"p"},"updater")," form of the setter function so that we can create a new todo list based on the old todo list."),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"TodoItem")," component will display the value of the todo item while allowing you to change its text and delete the item. We use ",Object(i.b)("inlineCode",{parentName:"p"},"useStateX()")," to read ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom")," and to get a setter function that we use to update the item text, mark it as completed, and delete it:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"function TodoItem({ id }: { id: number }) {\n  const text = useStateXForTextInput(['todo', 'list', ':id', 'text'], '', {\n    params: { id },\n  });\n  const isComplete = useStateXForCheckbox(\n    ['todo', 'list', ':id', 'isComplete'],\n    false,\n    { params: { id } },\n  );\n\n  const deleteItem = useStateXValueRemover(['todo', 'list', ':id'], {\n    params: { id },\n  });\n\n  return (\n    <div>\n      <input {...text} />\n      <input {...isComplete} />\n      <button onClick={deleteItem}>X</button>\n    </div>\n  );\n}\n")),Object(i.b)("p",null,"And with that we've got a fully functional todo list! In the next section we'll see how we can use selectors to take our list to the next level."),Object(i.b)("h2",{id:"demo"},"Demo"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const initialTodos = [\n  { id: 1, text: 'Path' },\n  { id: 2, text: 'StateX' },\n  { id: 3, text: 'Selector' },\n  { id: 4, text: 'Hooks' },\n];\n\nconst todoList = atom({\n  path: ['todo', 'list'],\n  defaultValue: initialTodos,\n});\n\nfunction ToDoList() {\n  return (\n    <div style={{ padding: 40 }}>\n      {/* <TodoListStats />\n      <TodoListFilters /> */}\n      <TodoItemCreator />\n      <TodoList />\n      {/* <JSONPreview /> */}\n    </div>\n  );\n}\n\nfunction TodoList() {\n  const todos = useStateXValue(todoList);\n\n  return (\n    <>\n      {todos.map((item, index) => (\n        <TodoItem index={index} key={item.id} />\n      ))}\n    </>\n  );\n}\n\nfunction TodoItemCreator() {\n  const [inputValue, setInputValue] = useState('');\n  const setTodoList = useStateXValueSetter(todoList);\n\n  const addItem = () => {\n    setTodoList((oldTodoList) => [\n      ...oldTodoList,\n      {\n        id: getId(),\n        text: inputValue,\n      },\n    ]);\n    setInputValue('');\n  };\n\n  const onChange = ({ target: { value } }) => {\n    setInputValue(value);\n  };\n\n  return (\n    <div>\n      <input type='text' value={inputValue} onChange={onChange} />\n      <button onClick={addItem}>Add</button>\n    </div>\n  );\n}\n\nfunction TodoItem({ index }) {\n  const text = useStateXForTextInput(['todo', 'list', ':index', 'text'], '', {\n    params: { index },\n  });\n  const isComplete = useStateXForCheckbox(\n    ['todo', 'list', ':index', 'isComplete'],\n    false,\n    { params: { index } },\n  );\n\n  const deleteItem = useStateXValueRemover(['todo', 'list', ':index'], {\n    params: { index },\n  });\n\n  return (\n    <div>\n      <input {...text} />\n      <input {...isComplete} />\n      <button onClick={deleteItem}>X</button>\n    </div>\n  );\n}\n\nlet id = initialTodos.length + 1;\nfunction getId() {\n  return id++;\n}\n\nreturn <ToDoList />;\n")))}c.isMDXComponent=!0}}]);