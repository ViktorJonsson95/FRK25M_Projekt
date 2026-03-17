import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "./App.css"
import Login from "./components/Login";
import Weather from "./components/Weather";
import Clock from "./components/Clock";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
import { logoutUser } from "./services/logoutUser";

function App() {

  const [refresh, setRefresh] = useState(false); // används för att trigga en ny fetch av todos när något ändras
  const [user, setUser] = useState(null); // håller reda på om en användare är inloggad
  const [loading, setLoading] = useState(true); // används för att vänta tills Firebase har kollat login-status

  useEffect(() => {
    // starta en firebase listener som körs när auth-state ändras, t.ex vid logga ut eller in
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    // cleanup: stoppar Firebase-listenern om komponenten tas bort från sidan (unmountas)
    return unsubscribe;

  }, []);

  if (loading) return <p>Laddar...</p>;

  if (!user) return (
    <div>
      <Clock />
      <Weather></Weather>
      <Login />
    </div >
  );
  return (
    <>
      <div className="app">
        <Clock />
        <Weather></Weather>
        <div className="todo-container">
          <h1 className="app-title">Todo App</h1>
          <AddTodo setRefresh={setRefresh} />
          <TodoList refresh={refresh} setRefresh={setRefresh} />
          <button onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
