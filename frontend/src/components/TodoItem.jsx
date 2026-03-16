import { useState } from "react";
import { deleteTodo } from "../services/deleteTodos";

const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, OnSave, editingId, editedTitle, setEditedTitle, }) => {

  return (
    <li className="todo-item">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, completed)}
        className="todo-checkbox"
      />

      {editingId === id ? (
        <input
          className="todo-edit-input"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") OnSave(id);
          }}
          onBlur={() => OnSave(id)}
        />
      ) : (
        <span
          className="todo-text"
          style={{ textDecoration: completed ? "line-through" : "none" }}>
          {title}
        </span>
      )}
      <div className="todo-actions">
        {/* Edit knapp */}
        <button onClick={() => onEditClick(id, title)}
          className="edit-button">✏️</button>

        {/* Delete knapp */}
        <button onClick={() => onDelete(id)} className="delete-button">❌</button>

      </div>
    </li>

  )
}

export default TodoItem;