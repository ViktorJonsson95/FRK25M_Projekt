const TodoItem = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <li>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      {/* ToDo Titel */}
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {title}
      </span>

      {/* Delete knapp */}
      <button onClick={() => onDelete(id)}>❌</button>
    </li>
  )
}

export default TodoItem