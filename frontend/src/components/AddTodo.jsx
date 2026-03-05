import { useState } from "react";

function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState(""); //Sparar texten som user skriver i inputfältet.

    const handleSubmit = (e) => {
        e.preventDefault(); // Sidan laddas inte om vid re-load. Behåller våra todos.

        if (!title.trim()) return; // ingen tom todo

        const newTodo = {
            title: title.trim(),
            completed: false,
        };

        console.log("New todo:", newTodo);
        onAddTodo(newTodo); // Kör funktionen

        setTitle(""); // reset input, gör inputrutan tom efter varje ny todo.
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                <input 
                    type="text"
                    value={title} // min todo, som skrivs i min input.
                    onChange={(e) => setTitle(e.target.value)} //Uppdaterar state varje gång user skriver något.
                />
            </label>

            <button type="submit"> 
                Add
            </button>
        </form>
    );
}

export default AddTodo;