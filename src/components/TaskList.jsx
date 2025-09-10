import { prettyDate } from '../utils/prettyDate.js';

export default function TaskList({
  getProcessedTasks,
  handleCompleted,
  handleDelete,
  handleEdit,
  editId,
}) {
  return (
    <>
      {getProcessedTasks().length > 0 ? (
        <ul>
          {getProcessedTasks().map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task.id)}
              />
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{prettyDate(task.dueDate)}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>

              <button
                disabled={task.id === editId}
                type="button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              <button
                disabled={editId}
                type="button"
                onClick={() => handleEdit(task.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Task List Empty</p>
      )}
    </>
  );
}
