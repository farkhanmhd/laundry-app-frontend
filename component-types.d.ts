import type { Icon } from '@tabler/icons-react';

export interface SidebarUserData {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon: Icon;
}

export interface ISidebarGroup {
  label: string;
  items: SidebarItem[];
}
