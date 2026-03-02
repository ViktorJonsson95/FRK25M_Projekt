import { useState } from "react";

function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState(""); //Sparar texten som user skriver i inputfältet.
    const [completed, setCompleted] = useState(false); // Min checkbox, Sparar om todo är klar (true/false).

    const handleSubmit = (e) => {
        e.preventDefault(); // Sidan laddas inte om vid re-load. Behåller våra todos.

        if (!title.trim()) return; // ingen tom todo

        const newTodo = {
            title: title.trim(),
            completed,
        };

        console.log("New todo:", newTodo);
        onAddTodo?.(newTodo); // Kör funktionen bara, OM den existerar.

        setTitle(""); // reset input
        setCompleted(false); // reset checkbox
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input 
                    type="text"
                    value={title} // min todo, som skrivs i min input.
                    onChange={(e) => setTitle(e.target.value)} //Uppdaterar state varje gång user skriver något.
                />
            </label>

            <label>
                Completed:
                <input
                    type="checkbox"
                    checked={completed} //Kollar om state är (true eller false).
                    onChange={(e) => setCompleted(e.target.checked)} //Uppdaterar state beroende om den är ikryssad eller ej.
                />
            </label>

            <button type="submit">
                Add Todo
            </button>
        </form>
    );
}

export default AddTodo;