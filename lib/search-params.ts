import {
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(20),
};

const paginationUrlKeys = {
  pageIndex: 'page',
  pageSize: 'rows',
};

export function useTablePaginationSearchParams() {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
  });
}

export function useSearchQueryParams() {
  return useQueryState('search', parseAsString.withDefault(''));
}
