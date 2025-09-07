export function isEqual(a, b) {
  return (
    a.title === b.title &&
    a.description === b.description &&
    a.dueDate === b.dueDate &&
    a.priority === b.priority &&
    a.category === b.category
  );
}
