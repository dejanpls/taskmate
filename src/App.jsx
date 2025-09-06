import { useState } from 'react';

import { categories } from './utils/categories.js';
import Form from './components/Form.jsx';
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

    setNewTask(initialTask);
  };

  return (
    <>
      <Form
        {...{
          handleSubmit,
          newTask,
          handleChange,
        }}
        categoryData={{ currentCategory, categories }}
      />

      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" value={task.completed} />
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Due date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
