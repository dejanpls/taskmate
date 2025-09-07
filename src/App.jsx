import { useState } from 'react';

import { isEqual } from './utils/isEqual.js';
import { getCurrentDateFormatted } from './utils/dateConverter.js';

import Form from './components/Form.jsx';
import TaskList from './components/TaskList.jsx';

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
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState({});

  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['default']);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === editId ? { ...task, ...newTask } : task
        )
      );
      setEditId(null);
    } else {
      setTasks((prev) => [
        ...prev,
        { ...newTask, id: Date.now(), completed: false },
      ]);
    }

    setNewTask(initialTask);
  };

  const handleCompleted = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditId(taskToEdit.id);
    setNewTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
      priority: taskToEdit.priority,
      category: taskToEdit.category,
    });
    setEditTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      dueDate: taskToEdit.dueDate,
      priority: taskToEdit.priority,
      category: taskToEdit.category,
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTask({});
    setNewTask(initialTask);
  };

  const handleCategoryInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const alreadyExists = categories.some(
    (category) => category.toLowerCase() === newCategory.trim().toLowerCase()
  );

  const handleAddCategory = () => {
    setCategories((cats) => [...cats, newCategory]);
    setNewCategory('');
  };

  return (
    <>
      <Form
        {...{
          editId,
          tasksEqual: isEqual(newTask, editTask),
          handleCancel,
          handleSubmit,
          newTask,
          handleChange,
        }}
        categoryData={{
          showCategoryInput,
          setShowCategoryInput,
          currentCategory: newTask.category,
          categories,
        }}
        categoryInputData={{
          handleCategoryInputChange,
          newCategory,
          handleAddCategory,
          alreadyExists,
        }}
      />

      <TaskList
        {...{
          tasks,
          handleCompleted,
          handleDelete,
          handleEdit,
        }}
      />
    </>
  );
}
