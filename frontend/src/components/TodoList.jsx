import React from 'react'
import { useEffect, useState } from 'react'
import TodoItem from './TodoItem.jsx';
//TODO importera todoItems
import { getTodos } from "../services/getTodo.js";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodos();
                console.log("Todos", data)
                setTodos(data);
            } catch (err) {
                setError("Could not load todos");
            } finally {
                setLoading(false);
            }
        }

        fetchTodos();
    }, []);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Laddar...</p>;

    return (
        <div>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                />
            ))}
        </div>
    );
}

export default TodoList