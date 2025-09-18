import type { Chat } from './chat-item';
import ChatList from './chat-list';
import { type ChatUser, getChatList, getChatUsers } from './data';

const ChatPage = async () => {
  // fetch current session and chats here
  const chats = (await getChatList()) as Chat[];
  const chatUsers = (await getChatUsers()) as ChatUser[];
  return (
    <aside className="min-w-md max-w-lg border-r">
      <ChatList chatUsers={chatUsers} initialChats={chats} />
    </aside>
  );
};

export default ChatPage;
