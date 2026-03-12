import { useState } from "react";
import { deleteTodo } from "../services/deleteTodos";

const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, OnSave, editingId, editedTitle, setEditedTitle, }) => {

  return (
    <li>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, completed)}
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
      <button onClick={() => onDelete(id)}>❌</button>
    </li>

  )
}

export default TodoItem;