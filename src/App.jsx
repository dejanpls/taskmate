import { useState, useEffect } from 'react';

import { isEqual } from './utils/isEqual.js';
import { getTaskValues } from './utils/getTaskValues.js';
import { initialTask } from './utils/initialTask.js';

import { FILTERS } from './utils/filters.js';
import { SORTS } from './utils/sorts.js';
import { loadObject } from './utils/loadData.js';

import Form from './components/Form.jsx';
import TaskList from './components/TaskList.jsx';
import Tabs from './components/Tabs';
import SortDropdown from './components/SortDropdown.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';

export default function App() {
  const [newTask, setNewTask] = useState(initialTask);
  const [tasks, setTasks] = useState(loadObject('tasks', []));
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState({});

  const [newCategory, setNewCategory] = useState('');

  const [categories, setCategories] = useState(
    loadObject('categories', ['default'])
  );

  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem('filter');
    return savedFilter ? savedFilter : 'all';
  });

  const [sort, setSort] = useState(() => {
    const savedSort = localStorage.getItem('sort');
    return savedSort ? savedSort : 'newestFirst';
  });

  const [selectedCategories, setSelectedCategories] = useState(
    loadObject('selectedCategories', categories)
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem(
      'selectedCategories',
      JSON.stringify(selectedCategories)
    );
    localStorage.setItem('filter', filter);
    localStorage.setItem('sort', sort);
  }, [tasks, categories, selectedCategories, filter, sort]);

  const [showFilter, setShowFilter] = useState(false);

  const handleCategoriesChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getProcessedTasks = () => {
    const visibleTasks = tasks.filter((task) =>
      selectedCategories.includes(task.category)
    );
    const filtered = FILTERS[filter](visibleTasks);
    return SORTS[sort](filtered);
  };

  const handleFilter = (e) => setFilter(e.target.value);
  const handleSort = (e) => setSort(e.target.value);

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
      setNewTask(initialTask);
    } else {
      setTasks((prev) => [
        ...prev,
        { ...newTask, id: Date.now(), completed: false },
      ]);
      setNewTask((prev) => ({ ...prev, title: '', description: '' }));
    }
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
    const taskValues = getTaskValues(taskToEdit);

    setNewTask(taskValues);
    setEditTask(taskValues);
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

      <SortDropdown {...{ sort, handleSort }} />

      <TaskList
        {...{
          getProcessedTasks,
          handleCompleted,
          handleDelete,
          handleEdit,
          editId,
        }}
      />

      <Tabs {...{ setShowFilter, handleFilter }} />

      {showFilter && (
        <CategoryFilter
          {...{ handleCategoriesChange, selectedCategories, categories }}
        />
      )}
    </>
  );
}
