'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { MapItems } from '@/lib/utils';
import { elysia } from '@/treaty';
import { type CreateChatBody, createChatAction } from './actions';
import type { Chat } from './chat-item';
import { ChatItem } from './chat-item';
import { ChatLink } from './chat-link';
import type { ChatUser } from './data';

type Props = {
  initialChats: Chat[];
  chatUsers: ChatUser[];
};

const ChatList = ({ initialChats, chatUsers }: Props) => {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { push } = useRouter();
  const { data: session } = authClient.useSession();
  const { execute, isPending } = useAction(createChatAction, {
    onSettled: ({ result }) => {
      if (
        result.data &&
        (result.data.status === 'created' || result.data.status === 'success')
      ) {
        push(`/chat/${result.data.data.id}`);
      }
    },
  });

  useEffect(() => {
    const newSocket = elysia.chat.list.subscribe();

    newSocket.on('message', (event) => {
      const newData = event.data;
      setChats((prevChats) => {
        const chatToUpdate = prevChats.find(
          (chat) => chat.chatId === newData.chatId
        );

        if (!chatToUpdate) {
          return prevChats;
        }

        const updatedChat: Chat = {
          ...chatToUpdate,
          lastMessage: newData.lastMessage,
          lastMessageTime: format(
            new Date(newData.lastMessageTime),
            'yyyy-MM-dd HH:mm:ss.SSSSSS'
          ),
        };

        const remainingChats = prevChats.filter(
          (chat) => chat.chatId !== newData.chatId
        );

        return [updatedChat, ...remainingChats];
      });
    });
  }, []);

  const renderChatList = () => {
    if (chats.length > 0) {
      return (
        <ul className="h-full w-full">
          <MapItems
            of={chats}
            render={(chat) => <ChatLink chat={chat} key={chat.chatId} />}
          />
        </ul>
      );
    }

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div>There are no chats</div>
        <Button onClick={() => inputRef.current?.focus()}>
          Start a new Chat
        </Button>
      </div>
    );
  };

  const handleCreateChat = (participantId: string) => {
    const data: CreateChatBody = {
      userId: session?.user.id as string,
      participantId,
    };

    execute(data);
  };

  const renderUserSearch = (query: string) => {
    const filteredUsers = chatUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    // add a server action for button. it will return a chat id then navigate to it using router.push
    return (
      <ul className="h-full w-full">
        <MapItems
          of={filteredUsers}
          render={(item) => (
            <li key={item.id}>
              <Button
                className="flex h-full w-full cursor-pointer justify-between rounded-none p-3 duration-200 hover:bg-secondary/50 dark:hover:bg-secondary/50"
                disabled={isPending}
                onClick={() => handleCreateChat(item.id)}
                variant="ghost"
              >
                <ChatItem
                  chatId={item.id}
                  key={item.id}
                  recipientName={item.name}
                />
              </Button>
            </li>
          )}
        />
      </ul>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <Input
          className="h-12 rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a user"
          ref={inputRef}
          type="text"
          value={search}
        />
      </div>
      {search.length > 0 ? renderUserSearch(search) : renderChatList()}
    </div>
  );
};

export default ChatList;
