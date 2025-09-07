export default function TaskList({
  getFilteredTasks,
  handleCompleted,
  handleDelete,
  handleEdit,
}) {
  return (
    <>
      {getFilteredTasks().length > 0 && (
        <ul>
          {getFilteredTasks().map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task.id)}
              />
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>

              <button type="button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(task.id)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
