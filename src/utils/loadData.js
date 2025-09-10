export const loadObject = (obj, fallback) => {
  const saved = localStorage.getItem(obj);
  return saved ? JSON.parse(saved) : fallback;
};
