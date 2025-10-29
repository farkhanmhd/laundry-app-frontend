import type { ReactNode } from "react";
import type { SessionUser } from "@/component-types";
import ProtectedLayout from "@/components/protected-layout";
import { getSession } from "@/lib/auth";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getSession();
  return (
    <ProtectedLayout user={session!.user as SessionUser}>
      {children}
    </ProtectedLayout>
  );
}
