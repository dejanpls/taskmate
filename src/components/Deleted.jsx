export default function Deleted({ deletedTasks }) {
  return (
    <>
      <ul>
        {deletedTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button type="button">Restore</button>
          </li>
        ))}
      </ul>
    </>
  );
}
