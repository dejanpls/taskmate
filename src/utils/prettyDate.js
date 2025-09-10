import { getCurrentDateFormatted } from './dateConverter.js';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';

export function prettyDate(dueDate) {
  if (dueDate < getCurrentDateFormatted()) return 'Overdue';

  const date = parseISO(dueDate);

  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';

  return format(date, 'MMM do y');
}
