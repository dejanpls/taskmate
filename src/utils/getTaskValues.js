export function getTaskValues(task) {
  return {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    category: task.category,
  };
}
