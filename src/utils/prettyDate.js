import { format, parseISO, isToday, isTomorrow } from 'date-fns';

export function prettyDate(dueDate) {
  const date = parseISO(dueDate);

  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';

  return format(date, 'MMM do y');
}
