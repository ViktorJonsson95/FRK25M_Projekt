const TodoItem = ({ id, title, completed, onToggle, onDelete, onEditClick, onSave, editingId, editedTitle, setEditedTitle, }) => {
  return (
    <li>
      {editingId === id ? ( //if-sats, om editingId = true så visas form, false så visas div med span
        <form className="todo-edit-view"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(id);
          }}
          style={{ display: "inline" }}
        >
          <input
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
          <button type="submit">✔️</button>
          <button type="button" onClick={() => onEditClick(null)}>
            ❌
          </button>
        </form>
      ) : (
        <div className="todo-view">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id, completed)}
          />
          <span style={{ textDecoration: completed ? "line-through" : "none" }}>
            {title}
          </span>
          {/* Edit knapp */}
          <button onClick={() => onEditClick(id, title)}>✏️</button>

          {/* Delete knapp */}
          <button onClick={() => onDelete(id)}>❌</button>
        </div>
      )}
    </li>
  )
}

export default TodoItem;