import { getCurrentDateFormatted } from './dateConverter.js';

export const initialTask = {
  title: '',
  description: '',
  dueDate: getCurrentDateFormatted(),
  priority: 'low',
  category: 'default',
};
