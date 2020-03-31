import { format, startOfMonth, endOfMonth, getDay, getDate } from 'date-fns'; 

export const formatYearMonth = (Y: number, M: number) => format(new Date(Y, M, 1, 0, 0, 0, 0), 'MMM yyyy');

export const formatDate = (Y: number, M: number, D: number) => format(new Date(Y, M, D, 0, 0, 0, 0), 'dd MMM yyyy');

export const getStartOfMonth = (Y: number, M: number) => getDay(startOfMonth(new Date(Y, M, 1, 0, 0, 0, 0)));

export const getEndOfMonth = (Y: number, M: number) => getDate(endOfMonth(new Date(Y, M, 1, 0, 0, 0, 0)));

export const getDayOfWeek = (Y: number, M: number, D: number) => getDay(new Date(Y, M, D, 0, 0, 0, 0));
