import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const BookingHistory = lazy(() => import("@/pages/User/BookingHistory"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: BookingHistory,
      },
      {
        title: "Profile",
        url: "/user/me",
        component: ProfilePage,
      },
    ],
  },
];
