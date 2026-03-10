import { useState } from "react";
import { deleteTodo  } from "../services/deleteTodos";

const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, OnSave, editingId, editedTitle, setEditedTitle, }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(id); // Tar bort todo i backend / databasen
      onDelete(id); // Tar bort todo i frontend state via Todolist
    } catch (error) {
        console.log("Delete failed", error);
    }
  };
  
  return (
    <li>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      {editingId === id ? (
        <input 
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") OnSave(id);
          }}
          onBlur={() => OnSave(id)}
        />
      ) : (
        
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {title}
      </span>
      )}

      {/* Edit knapp */}
      <button onClick={() => onEditClick(id, title)}>✏️</button>

        {/* Delete knapp */}
        <button onClick={handleDelete}>❌</button>
    </li>

  )
}

export default TodoItem;