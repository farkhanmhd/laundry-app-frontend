'use client';

import type { Table } from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Props<TData> = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  table: Table<TData>;
  className?: string;
};

const DataTableSearch = <TData,>({
  value,
  onChange,
  placeholder = 'Search all columns...',
  table,
  className,
}: Props<TData>) => {
  const handleTableSearchChange = (searchQuery: string) => {
    onChange(searchQuery);
    table.firstPage();
  };
  return (
    <Input
      className={cn('ml-0.5', className)}
      onChange={(e) => handleTableSearchChange(e.target.value)}
      placeholder={placeholder}
      value={value ?? ''}
    />
  );
};

export default DataTableSearch;
