'use client';

import { IconLogout2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { authClient } from '@/lib/auth-client';
import { AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { Button } from './ui/button';

const SignoutDialog = () => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-12 w-12 rounded-full" variant="destructive">
          <IconLogout2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your account. Any unsaved changes may be
            lost, and you'll need to sign back in to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={handleSignOut}
            variant="destructive"
          >
            Yes, sign out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignoutDialog;
