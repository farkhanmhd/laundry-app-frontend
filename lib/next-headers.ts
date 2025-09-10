import { headers } from 'next/headers';

export const getHeadersWithoutContentType = async () => {
  const nextHeaders = new Headers(await headers());
  nextHeaders.delete('content-type');
  return nextHeaders;
};
