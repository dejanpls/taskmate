export default function Deleted({
  handleRestore,
  handleDeleteForever,
  deletedTasks,
}) {
  return (
    <>
      {deletedTasks.length > 0 ? (
        <ul>
          {deletedTasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <button
                onClick={() => handleDeleteForever(task.id)}
                type="button"
              >
                Delete Forever
              </button>
              <button onClick={() => handleRestore(task)} type="button">
                Restore
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
    </>
  );
}
