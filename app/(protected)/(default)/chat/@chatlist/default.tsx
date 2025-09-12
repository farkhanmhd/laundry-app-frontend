import type { Chat } from './chat-item';
import ChatList from './chat-list';

const ChatPage = () => {
  // fetch current session and chats here
  const chats: Chat[] = [];

  return (
    <aside className="min-w-md max-w-lg border-r">
      <ChatList chats={chats} />
    </aside>
  );
};

export default ChatPage;
