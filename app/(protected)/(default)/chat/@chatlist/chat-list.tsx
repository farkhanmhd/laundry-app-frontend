'use client';

import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapItems } from '@/lib/utils';
import { type CreateChatBody, createChatAction } from './actions';
import type { Chat } from './chat-item';
import { ChatItem } from './chat-item';
import { ChatLink } from './chat-link';

type Props = {
  chats: Chat[];
};

const ChatList = ({ chats }: Props) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { push } = useRouter();
  const { execute, isPending } = useAction(createChatAction, {
    onSettled: ({ result }) => {
      if (result.data && result.data.status === 'created') {
        push(`/chat/${result.data.data.id}`);
      }
    },
  });

  const users = [
    {
      id: 'R1jIRThnURRMUWbGOQjD9NDMF5ydwsMU',
      name: 'staff',
    },
    {
      id: 'Or5AUBKlCrBGc9v5U57O6SPCK7XmoMR1',
      name: 'admin',
    },
  ];

  const renderChatList = () => {
    if (chats.length > 0) {
      return (
        <ul className="h-full w-full">
          <MapItems
            of={chats}
            render={(chat) => <ChatLink chat={chat} key={chat.id} />}
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

  const handleCreateChat = () => {
    const data: CreateChatBody = {
      userId: users[1].id,
      participantId: users[0].id,
    };

    execute(data);
  };

  const renderUserSearch = (query: string) => {
    const filteredUsers = users.filter((user) =>
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
                onClick={handleCreateChat}
                variant="ghost"
              >
                <ChatItem
                  id={item.id}
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
