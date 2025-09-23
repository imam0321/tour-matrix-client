import { lazy } from "react";
import type { ISidebarItem } from "@/types";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AddTourType = lazy(() => import("@/pages/Admin/AddTourType"));
const AddDivision = lazy(() => import("@/pages/Admin/AddDivision"));
const AddTour = lazy(() => import("@/pages/Admin/AddTour"));
const AllTours = lazy(() => import("@/pages/Admin/AllTours"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Profile",
        url: "/admin/me",
        component: ProfilePage,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Managements",
    items: [
      {
        title: "All Tours",
        url: "/admin/all-tours",
        component: AllTours,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
    ],
  },
];
