export const loadObject = (obj, fallback) => {
  const saved = localStorage.getItem(obj);
  return saved ? JSON.parse(saved) : fallback;
};

export const loadString = (str, fallback) => {
  const saved = localStorage.getItem(str);
  return saved ? saved : fallback;
};
