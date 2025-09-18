import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatDateFormat } from '@/lib/utils';

export type Chat = {
  chatId: string;
  recipientImage?: string;
  recipientName: string;
  lastMessage?: string;
  lastMessageTime?: string;
};

type Props<T> = {
  [K in keyof T]: T[K];
};

export function ChatItem({
  recipientName,
  recipientImage,
  lastMessage,
  lastMessageTime = '',
}: Props<Chat>) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar className="h-[60px] w-[60px] rounded-full">
          <AvatarImage src={recipientImage} />
          <AvatarFallback className="uppercase">
            {recipientName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div>{recipientName}</div>
          <div className="line-clamp-1 text-muted-foreground text-sm">
            {lastMessage}
          </div>
        </div>
      </div>
      <div className="p-3 text-muted-foreground text-xs">
        {chatDateFormat(lastMessageTime)}
      </div>
    </>
  );
}
