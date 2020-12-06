import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Context from './context';
import TodoList from './Todo/TodoList';
import Loader from './Loader';
import Modal from './Modal/Modal';

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'));
      }, 5000);
    }),
);

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 3000);
      });
  }, []);

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

        <Modal></Modal>

        <React.Suspense
          fallback={
            <div>
              <p>Loading AddTodo...</p>
              <Loader />
            </div>
          }
        >
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && (
          <div>
            <p>Loading for TodoList...</p>
            <Loader />
          </div>
        )}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
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
