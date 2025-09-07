export default function TaskList({
  tasks,
  handleCompleted,
  handleDelete,
  handleEdit,
}) {
  return (
    <>
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                value={task.completed}
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
