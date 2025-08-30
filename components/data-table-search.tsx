'use client';

import type { Table } from '@tanstack/react-table';
import type { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';

type Props<TData> = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  table: Table<TData>;
};

const DataTableSearch = <TData,>({
  value,
  onChange,
  placeholder = 'Search all columns...',
  table,
}: Props<TData>) => {
  const handleTableSearchChange = (searchQuery: string) => {
    onChange(searchQuery);
    table.firstPage();
  };
  return (
    <Input
      className="ml-0.5 max-w-sm"
      onChange={(e) => handleTableSearchChange(e.target.value)}
      placeholder={placeholder}
      value={value ?? ''}
    />
  );
};

export default DataTableSearch;
