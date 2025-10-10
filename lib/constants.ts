import {
  IconCash,
  IconClock,
  IconDashboard,
  IconHeart,
  IconPackage,
  IconReportAnalytics,
  IconReportMoney,
  IconShoppingCart,
  IconTicket,
  IconTools,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import type { SidebarItem } from "@/component-types";

export const staffNavData: SidebarItem[] = [
  {
    title: "Point of Sales",
    url: "/pos",
    icon: IconCash,
  },
  {
    title: "Shifts",
    url: "#",
    icon: IconClock,
  },
  {
    title: "Members",
    url: "/members",
    icon: IconUsers,
  },
  {
    title: "Orders",
    url: "#",
    icon: IconShoppingCart,
  },
];

export const adminNavData: SidebarItem[] = [
  {
    title: "Report",
    url: "/dashboard",
    icon: IconDashboard,
  },
  ...staffNavData,
  {
    title: "Inventory",
    url: "/products",
    icon: IconPackage,
  },
  {
    title: "Services",
    url: "/services",
    icon: IconTools,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: IconTicket,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: IconUser,
  },
  {
    title: "Sales Report",
    url: "#",
    icon: IconReportMoney,
  },
  {
    title: "Profit Report",
    url: "#",
    icon: IconReportAnalytics,
  },
  {
    title: "Loyalty Report",
    url: "#",
    icon: IconHeart,
  },
];
