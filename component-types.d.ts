import type { IconSvgElement } from "@hugeicons/react";
import type { User } from "better-auth";

export interface SessionUser extends User {
  username?: string | null | undefined;
  displayUsername?: string | null | undefined;
  role: string;
}

export interface SidebarUserData {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: IconSvgElement;
}

export interface ISidebarGroup {
  label: string;
  items: SidebarItem[];
}
