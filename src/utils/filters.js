export const FILTERS = {
  all: (tasks) => tasks,
  active: (tasks) => tasks.filter((task) => !task.completed),
  done: (tasks) => tasks.filter((task) => task.completed),
};
