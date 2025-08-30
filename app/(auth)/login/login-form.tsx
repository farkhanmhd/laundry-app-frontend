'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

type LoginInputSchema = {
  username: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [loginData, setLoginData] = useState<LoginInputSchema>({
    username: '',
    password: '',
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const { push } = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof LoginInputSchema
  ) => {
    setLoginData((prevState: LoginInputSchema) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const { error } = await authClient.signIn.username(loginData);

    if (error) {
      toast.error(error.statusText, {
        description: error.message,
      });
    } else {
      toast.success('Login Success');
      push('/dashboard');
    }
    setIsPending(false);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your Username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  autoComplete="off"
                  className="text-sm"
                  disabled={isPending}
                  id="username"
                  name="username"
                  onChange={(e) => handleInputChange(e, 'username')}
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  className="text-sm"
                  disabled={isPending}
                  id="password"
                  name="password"
                  onChange={(e) => handleInputChange(e, 'password')}
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button className="w-full" disabled={isPending} type="submit">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
