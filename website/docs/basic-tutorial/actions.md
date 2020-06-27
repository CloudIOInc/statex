---
title: Selectors
---

A **selector** represents a piece of **derived state**. You can think of derived state as the output of passing state to a function that modifies the given state in some way.

Derived state is a powerful concept because it lets us build dynamic data that depends on other data. In the context of our todo list application, the following are considered derived state:

- **Filtered todo list**: derived from the complete todo list by creating a new list that has certain items filtered out based on some criteria (such as filtering out items that are already completed).
- **Todo list statistics**: derived from the complete todo list by calculating useful attributes of the list, such as the total number of items in the list, the number of completed items, and the percentage of items that are completed.

To implement a filtered todo list, we need to choose a set of filter criteria whose value can be saved in an atom. The filter options we'll use are: "Show All", "Show Completed", and "Show Uncompleted". The default value will be "Show All":

```javascript
const todoFilterAtom = atom({
  path: ['todo', 'filter'],
  defaultValue: 'Show All',
});
```

Using `todoFilterAtom` and `todoList`, we can build a `todoFilteredIds` selector which derives a filtered list:

```javascript
const todoFilteredIds = selector({
  path: ['todo', 'filteredIds'],
  defaultValue: [],
  get: ({ get }) => {
    const filter = get(todoFilterAtom);
    const all = get(todoList);
    let list = all;
    switch (filter) {
      case 'Show Completed':
        list = list.filter((item) => item.isComplete);
        break;
      case 'Show Uncompleted':
        list = list.filter((item) => !item.isComplete);
        break;
    }
    return list.map((todo) => all.indexOf(todo));
  },
});
```

The `todoFilteredIds` internally keeps track of two dependencies: `todoFilterAtom` and `todoList` so that it re-runs if either of those change.

> From a component's point of view, selectors can be read using the same hooks that are used to read atoms. However it's important to note that certain hooks only work with **writable state** (i.e `useStateX()`). All atoms are writable state, but only some selectors are considered writable state (selectors that have both a `get` and `set` property). See the [Core Concepts](../introduction/core-concepts) page for more information on this topic.

Displaying our filtered todoList is as simple as changing one line in the `TodoList` component:

```jsx
function TodoList() {
  // changed from todoList to todoFilteredIds
  const todoList = useStateXValue(todoFilteredIds);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
}
```

Note the UI is the same as the `todoFilterAtom` has a default of `"Show All"`. In order to change the filter, we need to implement the `TodoListFilters` component:

```jsx
function TodoListFilters() {
  const [filter, setFilter] = useStateX(todoFilterAtom);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
```

With a few lines of code we've managed to implement filtering! We'll use the same concepts to implement the `TodoListStats` component.

We want to display the following stats:

- Total number of todo items
- Total number of completed items
- Total number of uncompleted items
- Percentage of items completed

While we could create a selector for each of the stats, an easier approach would be to create one selector that returns an object containing the data we need. We'll call this selector `todoListStatsState`:

```javascript
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoFilteredIds);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
```

To read the value of `todoListStatsState`, we use `useStateXValue()` once again:

```jsx
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useStateXValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
```

To summarize, we've created a todo list app that meets all of our requirements:

- Add todo items
- Edit todo items
- Delete todo items
- Filter todo items
- Display useful stats

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

const todoFilterAtom = atom({
  path: ['todo', 'filter'],
  defaultValue: 'Show All',
});

const todoFilteredIds = selector({
  path: ['todo', 'filteredIds'],
  defaultValue: [],
  get: ({ get }) => {
    const filter = get(todoFilterAtom);
    const all = get(todoList);
    let list = all;
    switch (filter) {
      case 'Show Completed':
        list = list.filter((item) => item.isComplete);
        break;
      case 'Show Uncompleted':
        list = list.filter((item) => !item.isComplete);
        break;
    }
    return list.map((todo) => ({ id: todo.id, index: all.indexOf(todo) }));
  },
});

const todoListStatsState = selector({
  path: ['todo', 'stats'],
  defaultValue: {
    totalNum: 0,
    totalCompletedNum: 0,
    totalUncompletedNum: 0,
    percentCompleted: 0,
  },
  get: ({ get }) => {
    const list = get(todoList);
    const totalNum = list.length;
    const totalCompletedNum = list.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
  shouldComponentUpdate: (value, oldValue) => {
    return (
      !oldValue ||
      value.totalNum !== oldValue.totalNum ||
      value.totalCompletedNum !== oldValue.totalCompletedNum ||
      value.totalUncompletedNum !== oldValue.totalUncompletedNum ||
      value.percentCompleted !== oldValue.percentCompleted
    );
  },
});

const ToDoList = memo(() => {
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <TodoList />
      <JSONPreview />
    </>
  );
});

function JSONPreview() {
  const todoList = useStateXValue(['todo'], []);
  return <pre>{JSON.stringify(todoList, null, '  ')}</pre>;
}

function TodoList() {
  const filteredIds = useStateXValue(todoFilteredIds, {
    shouldComponentUpdate: (ids, oldIds) => {
      return JSON.stringify(ids) !== JSON.stringify(oldIds);
    },
  });

  return (
    <>
      {filteredIds.map((entry) => (
        <TodoItem index={entry.index} key={entry.id} />
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
  const [text, setText] = useStateX(['todo', 'list', ':index', 'text'], '', {
    params: { index },
  });
  const [isComplete, setIsComplete] = useStateX(
    ['todo', 'list', ':index', 'isComplete'],
    false,
    { params: { index } },
  );

  const deleteItem = useStateXValueRemover(['todo', 'list', ':index'], {
    params: { index },
  });

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        checked={isComplete}
        type="checkbox"
        onChange={(e) => setIsComplete(e.target.checked)}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function TodoListFilters() {
  const filter = useStateXForSelect(todoFilterAtom);

  return (
    <>
      Filter:
      <select {...filter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useStateXValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

let id = 104;
function getId() {
  return id++;
}

return <ToDoList />;
```
