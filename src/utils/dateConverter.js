export const getCurrentDateFormatted = () => {
  return new Date().toISOString().split('T')[0];
};
