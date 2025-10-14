import {
  Analytics01Icon,
  AnalyticsUpIcon,
  Cash02Icon,
  Clock02Icon,
  DatabaseIcon,
  DollarSquareIcon,
  FavouriteSquareIcon,
  ServingFoodIcon,
  ShoppingCart02Icon,
  Ticket01Icon,
  UserAccountIcon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import type { SidebarItem } from "@/component-types";

export const staffNavData: SidebarItem[] = [
  {
    title: "Point of Sales",
    url: "/pos",
    icon: Cash02Icon,
  },
  {
    title: "Shifts",
    url: "#",
    icon: Clock02Icon,
  },
  {
    title: "Members",
    url: "/members",
    icon: UserGroup02Icon,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart02Icon,
  },
];

export const adminNavData: SidebarItem[] = [
  {
    title: "Report",
    url: "/dashboard",
    icon: Analytics01Icon,
  },
  ...staffNavData,
  {
    title: "Inventory",
    url: "/products",
    icon: DatabaseIcon,
  },
  {
    title: "Services",
    url: "/services",
    icon: ServingFoodIcon,
  },
  {
    title: "Vouchers",
    url: "/vouchers",
    icon: Ticket01Icon,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: UserAccountIcon,
  },
  {
    title: "Sales Report",
    url: "#",
    icon: DollarSquareIcon,
  },
  {
    title: "Profit Report",
    url: "#",
    icon: AnalyticsUpIcon,
  },
  {
    title: "Loyalty Report",
    url: "#",
    icon: FavouriteSquareIcon,
  },
];
