const PRIORITIES = { low: 0, medium: 1, high: 2 };

export const SORTS = {
  newestFirst: (tasks) => tasks.sort((a, b) => b.id - a.id),
  oldestFirst: (tasks) => tasks.sort((a, b) => a.id - b.id),
  dueDateAsc: (tasks) =>
    tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
  dueDateDesc: (tasks) =>
    tasks.sort((a, b) => b.dueDate.localeCompare(a.dueDate)),
  titleAsc: (tasks) => tasks.sort((a, b) => a.title.localeCompare(b.title)),
  titleDesc: (tasks) => tasks.sort((a, b) => b.title.localeCompare(a.title)),
  priorityLowHigh: (tasks) =>
    tasks.sort((a, b) => PRIORITIES[a.priority] - PRIORITIES[b.priority]),
  priorityHighLow: (tasks) =>
    tasks.sort((a, b) => PRIORITIES[b.priority] - PRIORITIES[a.priority]),
};
