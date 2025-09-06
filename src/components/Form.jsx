import Categories from './Categories.jsx';
import { getCurrentDateFormatted } from '../utils/dateConverter.js';

export default function Form({
  handleSubmit,
  newTask,
  handleChange,
  categoryData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        <input
          value={newTask.title}
          onChange={handleChange}
          name="title"
          id="title"
          type="text"
        />
      </label>

      <label htmlFor="description">
        Description:
        <textarea
          value={newTask.description}
          onChange={handleChange}
          name="description"
          id="description"
        />
      </label>

      <label htmlFor="dueDate">
        Due date:
        <input
          value={newTask.dueDate}
          onChange={handleChange}
          type="date"
          name="dueDate"
          id="dueDate"
        />
      </label>

      <label htmlFor="priority">
        Priority:
        <select
          value={newTask.priority}
          onChange={handleChange}
          name="priority"
          id="priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <Categories {...{ handleChange, ...categoryData }} />

      <button
        disabled={!newTask.title || newTask.dueDate < getCurrentDateFormatted()}
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}
