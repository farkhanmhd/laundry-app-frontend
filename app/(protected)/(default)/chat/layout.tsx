import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  chatlist: ReactNode;
}

const ChatLayout = ({ children, chatlist }: Props) => {
  return (
    <div className="flex h-[calc(100dvh-80px)]">
      {chatlist}
      {children}
    </div>
  );
};

export default ChatLayout;
