'use client';

import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { push } = useRouter();

  const handleSignOut = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          push('/login');
        },
      },
    });
    setIsPending(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg grayscale">
          <AvatarImage alt={user.name} src={user.avatar} />
          <AvatarFallback className="rounded-lg uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-xl" variant="ghost">
              <IconLogout />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of your account. Any unsaved changes may
                be lost, and you'll need to sign back in to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  disabled={isPending}
                  onClick={handleSignOut}
                  variant="destructive"
                >
                  Yes, sign out
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
