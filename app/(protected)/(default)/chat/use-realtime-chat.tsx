'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { elysia } from '@/treaty';

type Socket = ReturnType<ReturnType<typeof elysia.chat>['subscribe']>;
type Message = NonNullable<Awaited<ReturnType<typeof getMessages>>>[number];

const getMessages = async (id: string) => {
  const { data: response } = await elysia.chat({ id }).get({
    fetch: {
      credentials: 'include',
    },
  });

  if (response) {
    return response.data;
  }
};

export const useRealtimeChat = (id: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = authClient.useSession();
  const authorId = session?.user.id as string;

  useEffect(() => {
    const newSocket = elysia.chat({ id }).subscribe();
    setSocket(newSocket);

    newSocket.on('open', async () => {
      const data = await getMessages(id);
      if (data) {
        setMessages(data);
      }
    });

    newSocket.on('message', (event) => {
      setMessages((prev) => [...prev, event.data]);
    });

    return () => {
      newSocket.close();
    };
  }, [id]);

  const sendMessage = (message: string) => {
    socket?.send({ message });
    setMessages((prev) => [
      ...prev,
      { content: message, authorId, id: '', createdAt: '' },
    ]);
  };

  return {
    messages,
    sendMessage,
  };
};
