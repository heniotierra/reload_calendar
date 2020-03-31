import { format, startOfMonth, endOfMonth, getDay, getDate, getDaysInMonth } from 'date-fns'; 

export const formatYearMonth = (Y: number, M: number) => format(new Date(Y, M, 1, 0, 0, 0, 0), 'MMM yyyy');

export const formatDate = (Y: number, M: number, D: number) => format(new Date(Y, M, D, 0, 0, 0, 0), 'dd MMM yyyy');

export const getStartOfMonth = (Y: number, M: number) => getDay(startOfMonth(new Date(Y, M, 1, 0, 0, 0, 0)));

export const getEndOfMonth = (Y: number, M: number) => getDate(endOfMonth(new Date(Y, M, 1, 0, 0, 0, 0)));

export const getDayOfWeek = (Y: number, M: number, D: number) => getDay(new Date(Y, M, D, 0, 0, 0, 0));

export const getDaysInYearUntil = (Y: number, M: number, D: number) => {
  let totalDays = D;
  let {y, m} = { y: Y, m: 1 };
  let nextDate: Date;
  while(m < M) {
    nextDate = new Date(y, m, 1, 0, 0, 0, 0);
    totalDays += getDaysInMonth(nextDate);
    ++m;
  }
  return totalDays;
}
