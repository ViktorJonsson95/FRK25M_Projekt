import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Weather from "./components/Weather";

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
      <Weather></Weather>
      <Login />
    </div >
  );
  return (
    <>

      <h1>Todo App</h1>
      <AddTodo setRefresh={setRefresh} />
      <TodoList refresh={refresh} setRefresh={setRefresh} />
      <button onClick={logoutUser}>
        Logout
      </button>
    </>
  );
}

export default App;
