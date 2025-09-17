import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AddTourType = lazy(() => import("@/pages/Admin/AddTourType"));
const AddDivision = lazy(() => import("@/pages/Admin/AddDivision"));
const AddTour = lazy(() => import("@/pages/Admin/AddTour"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Profile",
        url: "/admin/me",
        component: ProfilePage,
      },
    ],
  },
  {
    title: "Tour Managements",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
