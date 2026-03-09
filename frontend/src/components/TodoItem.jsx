import { deleteTodo  } from "../services/deleteTodos"

const TodoItem = ({ id, title, completed, onToggle, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(id); // Tar bort todo i backend / databasen
      onDelete(id); // Tar bort todo i frontend state via Todolist
    } catch (error) {
        console.log("Delete failed", error);
    }
  };

  return (
    <div> 
        {/* Checkbox */}
        <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggle(id)}
        />

        {/* ToDo Titel */}
        <span style={{ textDecoration: completed ? "line-through" : "none"}}>
            {title}
            </span>

        {/* Delete knapp */}
        <button onClick={handleDelete}>❌</button>
    </div>
  )
}

export default TodoItem;