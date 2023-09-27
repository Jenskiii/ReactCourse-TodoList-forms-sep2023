import { useState } from "react";
import "./styles.css";
import { NewTodo } from "./NewTodo";

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState([]);
  // const [selected, setSelected] = useState();

  function addNewTodo(e) {
    // stops submitting url
    e.preventDefault()
    //  if field is empty nothing will happen
    if (newTodoName === "") return;

    setTodos((currentTodos) => {
      // adds new todo to todos  ...currentTodo copies it then add values to it
      return [
        ...currentTodos,
        { name: newTodoName, completed: false, id: crypto.randomUUID() },
      ];
    });
    // resets value after adding item
    setNewTodoName("");
  }

  // checks or un checks item
  function toggleTodo(todoId, completed) {
    setTodos((currentTodos) => {
      // loop trough id's
      return currentTodos.map((todo) => {
        //  if ids match change this todo to completed
        if (todo.id === todoId) return { ...todo, completed };
        // else do nothing
        return todo;
      });
    });
  }
  //  removes clicked id
  function deleteTodo(todoId) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId);
    });
  }

  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          // adds value to todoitem  {...todo} imports all the values
          return <NewTodo key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>;
        })}
      </ul>

{/* onSubmit  replaces the onClick event from the button
this is necessary for form*/}
      <form onSubmit={addNewTodo} id="new-todo-form">
        <label htmlFor="todo-input">New todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />

        {/* text area's work the same as inputs */}

        {/* how to select in forms */}
        {/* <select value={selected} onChange={()=> setSelected(e.target.value)}>
          <option value="1">1</option>
          <option selected value="2">2</option>
          <option value="3">3</option>
        </select> */}
        
        <button>Add Todo</button>
      </form>
    </>
  );
}

export default App;
