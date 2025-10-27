import type { User } from "better-auth";

export interface SessionUser extends User {
  username?: string | null | undefined;
  displayUsername?: string | null | undefined;
  role: "superadmin" | "admin" | "user";
  banned: boolean;
  bannedReason: string | null;
  banExpires: Date | null;
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
  icon: IconSvgObject;
}

export interface ISidebarGroup {
  label: string;
  items: SidebarItem[];
}
