import { useState } from "react";
import { deleteTodo } from "../services/deleteTodos";

const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, onSave, editingId, editedTitle, setEditedTitle, }) => {

  return (
    <li>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, completed)}
      />

      {editingId === id ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(id);
        }}
        style={{ display: "inline" }}
      >
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
        />
      </form>
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