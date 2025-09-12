import { clsx, type ClassValue } from 'clsx';
import { Children, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  differenceInDays,
  format,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
};

interface MapItemsProps<T> {
  of: T[]; // Array of items to map
  render: (item: T, index: number) => ReactNode; // Render function
}

export const MapItems = <T>({ of, render }: MapItemsProps<T>): ReactNode[] => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export const delay = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const chatDateFormat = (dateString: string) => {
  if(!dateString) {
    return ''
  }

  // date string example: '2025-04-21T14:10:52.612Z'
  const date = parseISO(dateString);
  const now = new Date();

  // todo. convert date string to desire format
  // if its today, show the current time,
  if (isToday(date)) {
    return format(date, 'p');
  }

  // if its yesterday, print yesterday,
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  // if its within a week print the day of the week,
  if (differenceInDays(now, date) < 7) {
    return format(date, 'EEEE');
  }

  // if its more than 7 day earlier, show date in dd/mm/yy format
  return format(date, 'dd/MM/yy');
};
