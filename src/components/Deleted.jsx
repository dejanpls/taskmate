import '../styles/deleted.css';

export default function Deleted({
  handleRestore,
  handleDeleteForever,
  deletedTasks,
}) {
  return (
    <div className="deletedContainer">
      <h2>Deleted Tasks</h2>
      {deletedTasks.length > 0 ? (
        <ul>
          {deletedTasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <div className="buttonContainer">
                <button
                  onClick={() => handleDeleteForever(task.id)}
                  type="button"
                  className="material-icons"
                >
                  delete_forever
                </button>
                <button
                  className="material-icons"
                  onClick={() => handleRestore(task)}
                  type="button"
                >
                  undo
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}
