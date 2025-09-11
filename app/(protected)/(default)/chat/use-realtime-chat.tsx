'use client';

import { useEffect, useState } from 'react';
import { elysia } from '@/treaty';

interface Message {
  author: string;
  message: string;
  time: number;
}

type Socket = ReturnType<typeof elysia.chat.subscribe> | undefined;

const getMessages = async () => {
  const { data: response } = await elysia.chat.get();

  if (response) {
    return response.data;
  }
};

export const useRealtimeChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = elysia.chat.subscribe();
    setSocket(newSocket);

    newSocket.on('open', async () => {
      const data = await getMessages();
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
  }, []);

  const sendMessage = (message: string) => {
    socket?.send({ message });
    setMessages((prev) => [
      ...prev,
      { message, author: 'me', time: Date.now() },
    ]);
  };

  return {
    messages,
    sendMessage,
  };
};
