import { useEffect, useState } from 'react'
import TodoItem from './TodoItem.jsx';
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

                const sortedTodos = [...data].sort((a, b) => a.createdAt - b.createdAt);
                setTodos(sortedTodos);

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
            setRefresh(prev => !prev)
        } catch (error) {
            setError("Delete failed");
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
            setError("Toggle failed");
        }
    };

    const startEdit = (id, title) => {
        if (id === null) {
            setEditingId(null)
            setEditedTitle("");
            return
        }
        setEditingId(id);
        setEditedTitle(title);
    };

    // Funktion som uppdaterar titeln på en todo
    const handleEdit = async (id) => {
        if (!editedTitle.trim()) return;

        // Skickar PUT-request till backend för att uppdatera todon i databasen.
        try {
            await updateTodo(id, { title: editedTitle });

            setEditingId(null);
            setEditedTitle("");
            setRefresh(prev => !prev);
        } catch (error) {
            setError("Edit failed");
        }
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Laddar...</p>;

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onEditClick={startEdit}
                    onSave={handleEdit}
                    editingId={editingId}
                    editedTitle={editedTitle}
                    setEditedTitle={setEditedTitle}
                />
            ))}
        </ul>
    );
}

export default TodoList;