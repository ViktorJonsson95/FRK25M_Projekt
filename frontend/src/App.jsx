import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false)
  return (
    <>
      <h1>Todo App</h1>
      <AddTodo setRefresh={setRefresh} />
      <TodoList refresh={refresh} setRefresh={setRefresh} />
    </>
  );
}

export default App;
