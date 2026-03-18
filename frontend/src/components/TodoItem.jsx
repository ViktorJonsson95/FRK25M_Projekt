const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, onSave, editingId, editedTitle, setEditedTitle, }) => {
  return (
    <li className="todo-item">
      {editingId === id ? ( //if-sats, om editingId = true så visas form, false så visas div med span
        <form
          className="todo-edit-view"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(id);
          }}

        >
          <input
            className="todo-edit-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => { //Om man trycker escape så stängs edit
              if (e.key === "Escape") {
                setEditedTitle("");
                onEditClick(null);
              }
            }}
            autoFocus
          />
          <div className="todo-actions">
            <button type="submit" className="save-button">✔️</button>
            <button type="button" className="delete-button" onClick={() => onEditClick(null)}>
              ❌
            </button>
          </div>
        </form>
      ) : (
        <div className="todo-view">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id, completed)}
            className="todo-checkbox"
          />

          <span
            className="todo-text"
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {title}
          </span>

          {/* Edit knapp */}
          <button
            onClick={() => onEditClick(id, title)}
            className="edit-button"
          >
            ✏️
          </button>

          {/* Delete knapp */}
          <button
            onClick={() => onDelete(id)}
            className="delete-button"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  )
}

export default TodoItem;