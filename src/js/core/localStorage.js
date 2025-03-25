import Tasks from './tasks.js';
import Task from './task.js';
import Category from './category.js';

export default class LocalStorage {
  static saveTasks() {
    const taskData = Tasks.list.map((task) => ({
      id: task.id, // Save ID
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      category: task.category,
    }));
    localStorage.setItem('tasks', JSON.stringify(taskData));
  }

  static loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

    return parsedTasks.map((taskData) => Task.fromData(taskData));
  }

  static saveCategories() {
    const categoryData = Category.list().map((category) => ({
      name: category.name,
      color: category.color,
    }));
    localStorage.setItem('categories', JSON.stringify(categoryData));
  }

  static loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    const parsedCategories = storedCategories ? JSON.parse(storedCategories) : [];

    return parsedCategories.map((categoryData) => categoryData);
  }
}
