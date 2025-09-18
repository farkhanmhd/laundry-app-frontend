import { headers } from 'next/headers';
import { elysia } from '@/treaty';

export const getChatList = async () => {
  const { data: response } = await elysia.chat.get({
    fetch: {
      headers: await headers(),
    },
  });

  const data = response?.data;
  return data;
};

export const getChatUsers = async () => {
  const { data: response } = await elysia.chat.user.get({
    fetch: {
      headers: await headers(),
    },
  });
  const data = response?.data;

  return data;
};

export type ChatUser = NonNullable<
  Awaited<ReturnType<typeof getChatUsers>>
>[number];
