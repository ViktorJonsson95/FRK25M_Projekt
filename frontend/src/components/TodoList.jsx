import { useEffect, useState } from 'react'
import TodoItem from './TodoItem.jsx';
import { getTodos } from "../services/getTodo.js";
import { updateTodo } from '../services/updateTodo.js';
import { deleteTodo } from '../services/deleteTodos.js';

const TodoList = ({ refresh, setRefresh }) => {

    // State för data, loading och error
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // State för edit-läge
    const [editingId, setEditingId] = useState(null); // Håller reda på vilken todo som just nu redigeras
    const [editedTitle, setEditedTitle] = useState(""); // Sparar texten som användaren skriver vid redigering

    useEffect(() => { // Hämtar todos från backend via en GET-request när refresh ändras
        async function fetchTodos() {
            try {
                const data = await getTodos();

                // Sortera todos efter skapandedatum (äldst först)
                const sortedTodos = [...data].sort((a, b) => a.createdAt - b.createdAt);
                setTodos(sortedTodos);

            } catch (err) {
                setError("Could not load todos");
            } finally {
                setLoading(false); // stoppa loading oavsett resultat
            }
        }

        fetchTodos();
    }, [refresh]);

    // Funktion som tar emot ett id och används för att ta bort en todo från vår state.
    const onDelete = async (id) => {
        try {
            await deleteTodo(id)
            setRefresh(prev => !prev) // triggar ny fetch
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

    // startEdit används för att starta eller avsluta edit-läge.
    const startEdit = (id, title) => {
        if (id === null) { // Om id är null -> stäng edit-läge, t.ex man trycker cancel edit.
            setEditingId(null)
            setEditedTitle("");
            return
        }
        setEditingId(id); // sätter vilken todo som ska redigeras
        setEditedTitle(title); // fyller inputfätet med nuvarande titel
    };

    // handleEdit används för att spara ändringen av en todo
    const handleEdit = async (id) => {
        if (!editedTitle.trim()) return;


        try { // Skickar PUT-request till backend för att uppdatera titeln i databasen
            await updateTodo(id, { title: editedTitle });

            setEditingId(null); // Avslutar edit-läge
            setEditedTitle("");
            setRefresh(prev => !prev); // Triggar en ny hämtning av todos
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