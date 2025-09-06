import Categories from './components/Categories.jsx';

export default function App() {
  const categories = ['default', 'work', 'leisure'];

  return (
    <form>
      <label htmlFor="title">
        <input name="title" id="title" type="text" />
      </label>

      <label htmlFor="description">
        Description:
        <textarea name="description" id="description" />
      </label>

      <label htmlFor="due-date">
        Due date:
        <input type="date" name="due-date" id="due-date" />
      </label>

      <label htmlFor="priority">
        Priority:
        <select name="priority" id="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <Categories {...{ categories }} />

      <button type="submit">Add Task</button>
    </form>
  );
}
