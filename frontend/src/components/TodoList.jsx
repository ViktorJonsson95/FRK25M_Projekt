import React from 'react'
import { useEffect, useState } from 'react'
import TodoItem from './TodoItem.jsx';
//TODO importera todoItems
import { getTodos } from "../services/getTodo.js";
import { updateTodo } from '../services/updateTodo.js';
import { deleteTodo } from '../services/deleteTodos.js';

const TodoList = ({ refresh, setRefresh }) => {

    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

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
    }, [refresh]);

    // Funktion som tar emot ett id och används för att ta bort en todo från vår state.
    const onDelete = async (id) => {
        try {
            const response = await deleteTodo(id)
            console.log(response)
            setRefresh(prev => !prev)
        } catch (error) {
            console.log("Delete failed", error)
        }
    }

    const onToggle = async (id, currentCompleted) => {
        try {
            // Skapa nytt värde (motsatsen till nuvarande)
            const newCompleted = !currentCompleted;

            // Uppdatera backend
            await updateTodo(id, { completed: newCompleted });

            // Trigga ny fetch
            setRefresh(prev => !prev);

        } catch (error) {
            console.log("Toggle failed", error);
        }
    };

    const startEdit = (id, title) => {
        setEditingId(id);
        setEditedTitle(title);
    };

    // Funktion som uppdaterar titeln på en todo
    const handleEdit = async (id) => {
        if (!editedTitle.trim()) return;

        // Skickar PUT-request till backend för att uppdatera todon i databasen.
        try {
            await updateTodo(id, { title: editedTitle });

            // Uppdaterar frontend-state så att UI ändras direkt.
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>  //Går igenom listan och om vi hittar rätt todo-id, uppdateras titeln.
                    todo.id === id ? { ...todo, title: editedTitle } : todo
                )
            );

            setEditingId(null);
            setEditedTitle("");
        } catch (error) {
            console.log("Edit failed", error);
        }
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Laddar...</p>;

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEditClick={startEdit}
                    OnSave={handleEdit}
                    editingId={editingId}
                    editedTitle={editedTitle}
                    setEditedTitle={setEditedTitle}
                />
            ))}
        </ul>
    );
}

export default TodoList;