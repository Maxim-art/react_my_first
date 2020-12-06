import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TodoList from './Todo/TodoList';
import AddTodo from './Todo/AddTodo';
import Context from './context';

function App() {
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      complited: false,
      title: 'my title1',
    },
    {
      id: 2,
      complited: false,
      title: 'my title2',
    },
    {
      id: 3,
      complited: false,
      title: 'my title3',
    },
  ]);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited;
        }
        return todo;
      }),
    );
    // console.log(id);
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title: title,
          id: Date.now(),
          complited: false,
        },
      ]),
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Приложение!</h1>

        <AddTodo onCreate={addTodo} />

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          <p>Empty</p>
        )}
      </div>
    </Context.Provider>

    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     {/* <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //   </header>
    //   <div>{element} aasadasdadadsasa</div>
    // </div>
  );
}

export default App;
