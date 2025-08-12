import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const Bookings = lazy(() => import("@/pages/User/Bookings"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
