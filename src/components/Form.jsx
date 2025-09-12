import '../styles/form.css';

import Categories from './Categories.jsx';
import { getCurrentDateFormatted } from '../utils/dateConverter.js';

export default function Form({
  editId,
  tasksEqual,
  handleCancel,
  handleSubmit,
  newTask,
  handleChange,
  categoryData,
  categoryInputData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        <input
          placeholder={'e.g. Practice Spanish'}
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

      <div className="optionsContainer">
        <div className="dueDate">
          <label htmlFor="dueDate">Due date:</label>
          <input
            value={newTask.dueDate}
            onChange={handleChange}
            type="date"
            name="dueDate"
            id="dueDate"
          />
        </div>

        <div className="priority">
          <label htmlFor="priority">Priority:</label>
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
        </div>
      </div>
      <Categories {...{ handleChange, ...categoryData, categoryInputData }} />

      <div className="buttonContainer">
        <button
          disabled={
            categoryData.showCategoryInput ||
            !newTask.title ||
            newTask.dueDate < getCurrentDateFormatted() ||
            (editId && tasksEqual)
          }
          type="submit"
        >
          {editId ? 'Save' : 'Add Task'}
        </button>

        {editId && (
          <button onClick={handleCancel} type="button">
            {tasksEqual ? 'Cancel' : 'Discard'}
          </button>
        )}
      </div>
    </form>
  );
}
