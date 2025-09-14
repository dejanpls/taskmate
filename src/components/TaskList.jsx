import '../styles/taskList.css';
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
        <ul className="list">
          {getProcessedTasks().map((task) => (
            <li className="listItem" key={task.id}>
              <div className="primaryView">
                <label className="completed-control">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCompleted(task.id)}
                  />
                </label>
                <h2>{task.title}</h2>
              </div>
              <div className="secondaryView">
                <p>Due {prettyDate(task.dueDate)}</p>
                <p>{task.priority} priority</p>
                <p>{task.category}</p>
              </div>
              <p>{task.description}</p>

              <div className="buttonContainer">
                {task.description && (
                  <button type="button">View Description</button>
                )}

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
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Task List Empty</p>
      )}
    </>
  );
}
