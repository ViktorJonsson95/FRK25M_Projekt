import { useState } from "react";
import { addTodo } from "../services/addTodo";

const AddTodo = ({ setRefresh }) => {
    const [title, setTitle] = useState(""); //Sparar texten som user skriver i inputfältet.

    const handleSubmit = async (e) => {
        e.preventDefault(); // Sidan laddas inte om vid re-load. Behåller våra todos.

        if (!title.trim()) return;

        const newTodo = {
            title: title.trim(),
            completed: false,
            createdAt: Date.now()
        };

        await addTodo(newTodo); // Anropar addTodo i service-filen där en POST-request skickas till backend med den nya todon

        setTitle(""); // reset input, gör inputrutan tom efter varje ny todo.
        setRefresh(prev => !prev);
    }

    return (
        <form onSubmit={handleSubmit}
            className="add-todo-form">
            <label className="add-todo-label">
                <input
                    type="text"
                    value={title} // min todo, som skrivs i min input.
                    placeholder="Add todo..."
                    onChange={(e) => setTitle(e.target.value)}//Uppdaterar state varje gång user skriver något.
                    className="add-todo-input"
                />
            </label>

            <button type="submit" className="add-todo-button">
                Add
            </button>
        </form>
    );
}

export default AddTodo;