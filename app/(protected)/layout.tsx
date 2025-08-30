import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import type { SidebarUserData } from '@/component-types';
import { authClient } from '@/lib/auth-client';

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const user: SidebarUserData = {
    name: session?.user.name as string,
    email: session?.user.email as string,
    avatar: session?.user.image as string,
    role: session?.user.role as string,
  };

  return <main className="h-dvh">{children}</main>;
}
