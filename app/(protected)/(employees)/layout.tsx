import type { ReactNode } from "react";
import type { SessionUser } from "@/component-types";
import ProtectedLayout from "@/components/protected-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSession } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getSession();
  return (
    <ProtectedLayout user={session!.user as SessionUser}>
      <ScrollArea className="h-full p-4 lg:p-6 [&>div>div]:h-full">
        {children}
      </ScrollArea>
    </ProtectedLayout>
  );
}
