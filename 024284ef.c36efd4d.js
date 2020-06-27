(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{52:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var o=n(2),a=n(6),i=(n(0),n(93)),r={title:"Atoms"},s={id:"basic-tutorial/atoms",isDocsHomePage:!1,title:"Atoms",description:"Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item.",source:"@site/docs/basic-tutorial/atoms.md",permalink:"/statex/docs/basic-tutorial/atoms",editUrl:"https://github.com/CloudIOInc/statex/edit/master/website/docs/basic-tutorial/atoms.md",sidebar:"someSidebar",previous:{title:"Intro",permalink:"/statex/docs/basic-tutorial/intro"},next:{title:"Selectors",permalink:"/statex/docs/basic-tutorial/selectors"}},l=[{value:"Demo",id:"demo",children:[]}],c={rightToc:l};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item."),Object(i.b)("p",null,"We'll call our list atom ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom")," and create it using the ",Object(i.b)("inlineCode",{parentName:"p"},"atom()")," function:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-javascript"}),"const todoListAtom = atom({\n  path: ['todo', 'list'],\n  defaultValue: [],\n});\n")),Object(i.b)("p",null,"We give our atom a unique ",Object(i.b)("inlineCode",{parentName:"p"},"path")," and set the ",Object(i.b)("inlineCode",{parentName:"p"},"defaultValue")," to an empty array. To read the contents of this atom, we can use the ",Object(i.b)("inlineCode",{parentName:"p"},"useStateXValue()")," hook in our ",Object(i.b)("inlineCode",{parentName:"p"},"TodoList")," component:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"const ToDoList = memo(() => {\n  return (\n    <>\n      {/* <TodoListStats /> */}\n      {/* <TodoListFilters /> */}\n      <TodoItemCreator />\n      <TodoList />\n      <JSONPreview />\n    </>\n  );\n});\n")),Object(i.b)("p",null,"The commented-out components will be implemented in the sections that follow."),Object(i.b)("p",null,"To create new todo items, we need to access a setter function that will update\nthe contents of the ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom"),". We can use the ",Object(i.b)("inlineCode",{parentName:"p"},"useStateXValueSetter()"),"\nhook to get a setter function in our ",Object(i.b)("inlineCode",{parentName:"p"},"TodoItemCreator")," component:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"function TodoItemCreator() {\n  const [inputValue, setInputValue] = useState('');\n  const setTodoList = useStateXValueSetter(todoList);\n\n  const addItem = () => {\n    setTodoList((oldTodoList) => [\n      ...oldTodoList,\n      {\n        id: getId(),\n        text: inputValue,\n      },\n    ]);\n    setInputValue('');\n  };\n\n  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {\n    setInputValue(value);\n  };\n\n  return (\n    <div>\n      <input type=\"text\" value={inputValue} onChange={onChange} />\n      <button onClick={addItem}>Add</button>\n    </div>\n  );\n}\n\n// utility for creating unique Id\nlet id = 0;\nfunction getId() {\n  return id++;\n}\n")),Object(i.b)("p",null,"Notice we use the ",Object(i.b)("strong",{parentName:"p"},"updater")," form of the setter function so that we can create a new todo list based on the old todo list."),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"TodoItem")," component will display the value of the todo item while allowing you to change its text and delete the item. We use ",Object(i.b)("inlineCode",{parentName:"p"},"useStateX()")," to read ",Object(i.b)("inlineCode",{parentName:"p"},"todoListAtom"),' and to get a setter function that we use to update the item text, mark it as completed, and delete it. Note the use of placehoder in the path for index (":index") which is dynamically set to the id of the todo item on component initialization.'),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx"}),"function TodoItem({ id }: { id: number }) {\n  const [text, setText] = useStateX(['todo', 'list', ':index', 'text'], '', {\n    params: { index },\n  });\n  const [isComplete, setIsComplete] = useStateX(\n    ['todo', 'list', ':index', 'isComplete'],\n    false,\n    { params: { index } },\n  );\n\n  const deleteItem = useStateXValueRemover(['todo', 'list', ':index'], {\n    params: { index },\n  });\n\n  return (\n    <div>\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n      />\n      <input\n        value={isComplete}\n        type=\"checkbox\"\n        onChange={() => setIsComplete(!isComplete)}\n      />\n      <button onClick={deleteItem}>X</button>\n    </div>\n  );\n}\n")),Object(i.b)("p",null,"And with that we've got a fully functional todo list! In the next section we'll see how we can use selectors to take our list to the next level."),Object(i.b)("h2",{id:"demo"},"Demo"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),"const initialTodos = [\n  { id: 100, text: 'Learn Javascript', isComplete: true },\n  { id: 101, text: 'Learn React', isComplete: true },\n  { id: 102, text: \"Use CloudIO's StateX\" },\n  { id: 103, text: 'Launch Product' },\n];\n\nconst todoList = atom({\n  path: ['todo', 'list'],\n  defaultValue: initialTodos,\n});\n\nfunction ToDoList() {\n  return (\n    <>\n      {/* <TodoListStats />\n      <TodoListFilters /> */}\n      <TodoItemCreator />\n      <TodoList />\n      {/* <JSONPreview /> */}\n    </>\n  );\n}\n\nfunction TodoList() {\n  const todos = useStateXValue(todoList);\n\n  return (\n    <>\n      {todos.map((item, index) => (\n        <TodoItem index={index} key={item.id} />\n      ))}\n    </>\n  );\n}\n\nfunction TodoItemCreator() {\n  const [inputValue, setInputValue] = useState('');\n  const setTodoList = useStateXValueSetter(todoList);\n\n  const addItem = () => {\n    setTodoList((oldTodoList) => [\n      ...oldTodoList,\n      {\n        id: getId(),\n        text: inputValue,\n      },\n    ]);\n    setInputValue('');\n  };\n\n  const onChange = ({ target: { value } }) => {\n    setInputValue(value);\n  };\n\n  return (\n    <div>\n      <input type=\"text\" value={inputValue} onChange={onChange} />\n      <button onClick={addItem}>Add</button>\n    </div>\n  );\n}\n\nfunction TodoItem({ index }) {\n  const [text, setText] = useStateX(['todo', 'list', ':index', 'text'], '', {\n    params: { index },\n  });\n  const [isComplete, setIsComplete] = useStateX(\n    ['todo', 'list', ':index', 'isComplete'],\n    false,\n    { params: { index } },\n  );\n\n  const deleteItem = useStateXValueRemover(['todo', 'list', ':index'], {\n    params: { index },\n  });\n\n  return (\n    <div>\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n      />\n      <input\n        checked={isComplete}\n        type=\"checkbox\"\n        onChange={(e) => setIsComplete(e.target.checked)}\n      />\n      <button onClick={deleteItem}>X</button>\n    </div>\n  );\n}\n\nlet id = 104;\nfunction getId() {\n  return id++;\n}\n\nreturn <ToDoList />;\n")))}u.isMDXComponent=!0},93:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var o=n(0),a=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),u=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,r=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,b=d["".concat(r,".").concat(m)]||d[m]||p[m]||i;return n?a.a.createElement(b,s(s({ref:t},c),{},{components:n})):a.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,r[1]=s;for(var c=2;c<i;c++)r[c]=n[c];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);