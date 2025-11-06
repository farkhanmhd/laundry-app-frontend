import {
  CircleDollarSign,
  Database,
  DollarSign,
  HandPlatter,
  LayoutDashboard,
  Logs,
  ShoppingCart,
  Ticket,
  Timer,
  UserCircle,
  Users,
} from "lucide-react";
import type { SidebarItem } from "@/component-types";

export const adminNavData: SidebarItem[] = [
  {
    title: "Point of Sales",
    url: "/pos",
    icon: Logs,
  },
  {
    title: "Shifts",
    url: "#",
    icon: Timer,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
  },
];

export const superAdminNavData: SidebarItem[] = [
  {
    title: "Report",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  ...adminNavData,
  {
    title: "Inventory",
    url: "/products",
    icon: Database,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: Ticket,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: Users,
  },
  {
    title: "Sales Report",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Profit Report",
    url: "#",
    icon: CircleDollarSign,
  },
  {
    title: "Loyalty Report",
    url: "#",
    icon: UserCircle,
  },
];
