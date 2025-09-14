import '../styles/taskList.css';
import { prettyDate } from '../utils/prettyDate.js';

export default function TaskList({
  getProcessedTasks,
  handleCompleted,
  handleDelete,
  handleEdit,
  editId,
  showDescription,
  setShowDescription,
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
              {showDescription && (
                <p>
                  {task.description
                    ? task.description
                    : 'No description provided'}
                </p>
              )}
              <div className="secondaryView">
                <div className="infoContainer">
                  <p
                    className={
                      ['Overdue', 'Today', 'Tomorrow'].includes(
                        prettyDate(task.dueDate)
                      )
                        ? prettyDate(task.dueDate).toLowerCase()
                        : 'default'
                    }
                  >
                    {prettyDate(task.dueDate)}
                  </p>
                  <p className={`priority-${task.priority}`}>
                    {task.priority} priority
                  </p>
                  <p>{task.category}</p>
                </div>

                <div className="buttonContainer">
                  {task.description && (
                    <button
                      onClick={() => setShowDescription((prev) => !prev)}
                      className="material-icons"
                      type="button"
                    >
                      info
                    </button>
                  )}

                  <button
                    className="material-icons"
                    disabled={task.id === editId}
                    type="button"
                    onClick={() => handleDelete(task.id)}
                  >
                    delete
                  </button>
                  <button
                    className="edit"
                    disabled={editId}
                    type="button"
                    onClick={() => handleEdit(task.id)}
                  >
                    Edit
                  </button>
                </div>
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
