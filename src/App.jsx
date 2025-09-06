import { useState } from 'react';

import Categories from './components/Categories.jsx';
import { categories } from './utils/categories.js';
import { getCurrentDateFormatted } from './utils/dateConverter.js';

export default function App() {
  const initialTask = {
    title: '',
    description: '',
    dueDate: getCurrentDateFormatted(),
    priority: 'low',
    category: 'default',
  };

  const [newTask, setNewTask] = useState(initialTask);
  const [tasks, setTasks] = useState([]);
  const currentCategory = newTask.category;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTasks((prev) => [
      ...prev,
      { ...newTask, id: Date.now(), completed: false },
    ]);
  };

  return (
    <>
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

        <Categories {...{ handleChange, currentCategory, categories }} />

        <button type="submit">Add Task</button>
      </form>

      {tasks.length > 0 && console.log(tasks)}
    </>
  );
}
