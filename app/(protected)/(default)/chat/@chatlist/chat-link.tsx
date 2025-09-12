import Link from 'next/link';
import { type Chat, ChatItem } from './chat-item';

type Props = {
  chat: Chat;
};

export function ChatLink({ chat }: Props) {
  return (
    <li>
      <Link
        className="flex h-full w-full justify-between p-3 duration-200 hover:bg-secondary/50"
        href={`/chats/${chat.id}`}
      >
        <ChatItem
          id={chat.id}
          lastMessage={chat.lastMessage}
          lastMessageTime={chat.lastMessageTime}
          recipientImage={chat.recipientImage}
          recipientName={chat.recipientName}
        />
      </Link>
    </li>
  );
}
