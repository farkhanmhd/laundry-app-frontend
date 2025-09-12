'use client';

import { IconSend } from '@tabler/icons-react';
import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapItems } from '@/lib/utils';
import { useRealtimeChat } from '../use-realtime-chat';

const ChatPage = () => {
  const { messages, sendMessage } = useRealtimeChat();
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="flex h-full flex-1 flex-col gap-3 rounded-lg p-3">
        <ScrollArea className="h-[calc(100%-48px)] flex-1">
          <ul className="flex flex-col gap-4">
            {messages && messages.length > 0 && (
              <MapItems
                of={messages}
                render={(msg, index) => (
                  <li
                    className="self-start rounded-lg bg-secondary px-4 py-2"
                    key={`msg-${msg.time}-${index}`}
                  >
                    {msg.message}
                  </li>
                )}
              />
            )}
          </ul>
        </ScrollArea>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            value={newMessage}
          />
          <Button type="submit">
            <IconSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
