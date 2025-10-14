import { headers } from "next/headers";
import type { ReactNode } from "react";
import ProtectedLayout from "@/components/protected-layout";
import { authClient } from "@/lib/auth-client";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  return <ProtectedLayout user={session!.user}>{children}</ProtectedLayout>;
}
