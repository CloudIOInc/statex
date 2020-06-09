---
title: Atoms
---

Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item.

We'll call our list atom `todoListAtom` and create it using the `atom()` function:

```javascript
const todoListAtom = atom({
  path: ['todo', 'list'],
  defaultValue: [],
});
```

We give our atom a unique `path` and set the `defaultValue` to an empty array. To read the contents of this atom, we can use the `useStateXValue()` hook in our `TodoList` component:

```jsx
const ToDoList = memo(() => {
  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />
      <TodoList />
      <JSONPreview />
    </>
  );
});
```

The commented-out components will be implemented in the sections that follow.

To create new todo items, we need to access a setter function that will update
the contents of the `todoListAtom`. We can use the `useStateXValueSetter()`
hook to get a setter function in our `TodoItemCreator` component:

```jsx
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useStateXValueSetter(todoList);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
```

Notice we use the **updater** form of the setter function so that we can create a new todo list based on the old todo list.

The `TodoItem` component will display the value of the todo item while allowing you to change its text and delete the item. We use `useStateX()` to read `todoListAtom` and to get a setter function that we use to update the item text, mark it as completed, and delete it:

```jsx
function TodoItem({ id }: { id: number }) {
  const text = useStateXForTextInput(['todo', 'list', ':id', 'text'], '', {
    params: { id },
  });
  const isComplete = useStateXForCheckbox(
    ['todo', 'list', ':id', 'isComplete'],
    false,
    { params: { id } },
  );

  const deleteItem = useStateXValueRemover(['todo', 'list', ':id'], {
    params: { id },
  });

  return (
    <div>
      <input {...text} />
      <input {...isComplete} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}
```

And with that we've got a fully functional todo list! In the next section we'll see how we can use selectors to take our list to the next level.

## Demo

```jsx live
const initialTodos = [
  { id: 100, text: 'Learn Javascript', isComplete: true },
  { id: 101, text: 'Learn React', isComplete: true },
  { id: 102, text: "Use CloudIO's StateX" },
  { id: 103, text: 'Launch Product' },
];

const todoList = atom({
  path: ['todo', 'list'],
  defaultValue: initialTodos,
});

function ToDoList() {
  return (
    <>
      {/* <TodoListStats />
      <TodoListFilters /> */}
      <TodoItemCreator />
      <TodoList />
      {/* <JSONPreview /> */}
    </>
  );
}

function TodoList() {
  const todos = useStateXValue(todoList);

  return (
    <>
      {todos.map((item, index) => (
        <TodoItem index={index} key={item.id} />
      ))}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useStateXValueSetter(todoList);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

function TodoItem({ index }) {
  const text = useStateXForTextInput(['todo', 'list', ':index', 'text'], '', {
    params: { index },
  });
  const isComplete = useStateXForCheckbox(
    ['todo', 'list', ':index', 'isComplete'],
    false,
    { params: { index } },
  );

  const deleteItem = useStateXValueRemover(['todo', 'list', ':index'], {
    params: { index },
  });

  return (
    <div>
      <input {...text} />
      <input {...isComplete} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

let id = 104;
function getId() {
  return id++;
}

return <ToDoList />;
```
