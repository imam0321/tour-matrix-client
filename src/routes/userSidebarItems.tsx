import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const BookingHistory = lazy(() => import("@/pages/User/BookingHistory"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: BookingHistory,
      },
    ],
  },
];
