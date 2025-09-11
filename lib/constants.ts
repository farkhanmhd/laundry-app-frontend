import {
  IconCash,
  IconClock,
  IconDashboard,
  IconHeart,
  IconMessage,
  IconPackage,
  IconReportAnalytics,
  IconReportMoney,
  IconShoppingCart,
  IconTicket,
  IconTools,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import type { ISidebarGroup, SidebarItem } from '@/component-types';

export const adminNavData: ISidebarGroup[] = [
  {
    label: 'General',
    items: [
      {
        title: 'Dashboard',
        url: '#',
        icon: IconDashboard,
      },
      {
        title: 'Point of Sales',
        url: '#',
        icon: IconCash,
      },
    ],
  },
  {
    label: 'Operations',
    items: [
      {
        title: 'Orders',
        url: '#',
        icon: IconShoppingCart,
      },
      {
        title: 'Shifts',
        url: '#',
        icon: IconClock,
      },
      {
        title: 'Customers',
        url: '#',
        icon: IconUsers,
      },
    ],
  },
  {
    label: 'Reports',
    items: [
      {
        title: 'Sales Report',
        url: '#',
        icon: IconReportMoney,
      },
      {
        title: 'Profit Report',
        url: '#',
        icon: IconReportAnalytics,
      },
      {
        title: 'Loyalty Report',
        url: '#',
        icon: IconHeart,
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        title: 'Inventory',
        url: '/products',
        icon: IconPackage,
      },
      {
        title: 'Services',
        url: '#',
        icon: IconTools,
      },
      {
        title: 'Vouchers',
        url: '#',
        icon: IconTicket,
      },
      {
        title: 'Staff',
        url: '#',
        icon: IconUser,
      },
    ],
  },
];

export const staffNavData: ISidebarGroup[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Point of Sales',
        url: '#',
        icon: IconCash,
      },
      {
        title: 'Shift',
        url: '#',
        icon: IconClock,
      },
    ],
  },
  {
    label: 'View',
    items: [
      {
        title: 'Orders',
        url: '#',
        icon: IconShoppingCart,
      },
      {
        title: 'Customers',
        url: '#',
        icon: IconUsers,
      },
      {
        title: 'Inventory',
        url: '/products',
        icon: IconPackage,
      },
    ],
  },
];

export const staffSheetData: SidebarItem[] = [
  {
    title: 'Point of Sales',
    url: '/pos',
    icon: IconCash,
  },
  {
    title: 'Shifts',
    url: '#',
    icon: IconClock,
  },
  {
    title: 'Customers',
    url: '#',
    icon: IconUsers,
  },
  {
    title: 'Orders',
    url: '#',
    icon: IconShoppingCart,
  },
];

export const adminSheetData: SidebarItem[] = [
  {
    title: 'Report',
    url: '/dashboard',
    icon: IconDashboard,
  },
  ...staffSheetData,
  {
    title: 'Inventory',
    url: '/products',
    icon: IconPackage,
  },
  {
    title: 'Services',
    url: '/services',
    icon: IconTools,
  },
  {
    title: 'Vouchers',
    url: '/vouchers',
    icon: IconTicket,
  },
  {
    title: 'Staff',
    url: '/staff',
    icon: IconUser,
  },
  {
    title: 'Chat',
    url: '/chat',
    icon: IconMessage,
  },
];
