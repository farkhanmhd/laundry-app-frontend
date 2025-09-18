'use client';

import { IconSend } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { type FormEvent, Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authClient } from '@/lib/auth-client';
import { MapItems } from '@/lib/utils';
import { useRealtimeChat } from '../use-realtime-chat';

const ChatMessages = () => {
  const params = useParams();
  const { replace } = useRouter();
  const { messages, sendMessage } = useRealtimeChat(params.id as string);
  const [newMessage, setNewMessage] = useState<string>('');
  const { data } = authClient.useSession();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replace('/chat');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [replace]);

  const userId = data?.user.id;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <>
      <ScrollArea className="h-[calc(100%-48px)]">
        <ul className="flex h-full flex-col justify-end gap-4">
          {messages && messages.length > 0 && (
            <MapItems
              of={messages}
              render={(msg, index) => (
                <Fragment key={`msg-${msg.createdAt}-${index}`}>
                  {msg.authorId === userId ? (
                    <li className="self-end rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                      {msg.content}
                    </li>
                  ) : (
                    <li className="self-start rounded-lg bg-secondary px-4 py-2">
                      {msg.content}
                    </li>
                  )}
                </Fragment>
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
    </>
  );
};

export default ChatMessages;
