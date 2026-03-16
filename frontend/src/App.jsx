import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useState } from "react";
import "./App.css"

function App() {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
    <div className="app">
      <div className="todo-container">
      <h1 className="app-title">Todo App</h1>
      <AddTodo setRefresh={setRefresh} />
      <TodoList refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>  
    </>
  );
}

export default App;
