import App from "@/App";
import { lazy } from "react";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types/auth.type";
const Verify = lazy(() => import("@/pages/Verify"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ReviewSection = lazy(
  () => import("@/components/modules/Home/ReviewSection")
);
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout")
);
const ToursPage = lazy(() => import("@/pages/ToursPage"));
const TourDetailsPage = lazy(() => import("@/pages/TourDetailsPage"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));
const Success = lazy(() => import("@/pages/Payment/Success"));
const Fail = lazy(() => import("@/pages/Payment/Fail"));
const Cancel = lazy(() => import("@/pages/Payment/Cancel"));
const ForgetPasswordPage = lazy(() => import("@/pages/ForgetPasswordPage"));
const ResetPassword = lazy(
  () => import("@/components/modules/Authentication/ResetPassword")
);

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        path: "/",
        index: true,
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: ReviewSection,
        path: "/reviews",
      },
      {
        Component: ToursPage,
        path: "/tours",
      },
      {
        Component: TourDetailsPage,
        path: "/tours/:id",
      },
      {
        Component: withAuth(BookingPage),
        path: "/booking/:id",
      },
      {
        Component: Success,
        path: "/payment/success",
      },
      {
        Component: Fail,
        path: "/payment/fail",
      },
      {
        Component: Cancel,
        path: "/payment/cancel",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: ForgetPasswordPage,
    path: "/forget-password",
  },
  {
    Component: ResetPassword,
    path: "/reset-password",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: NotFoundPage,
    path: "*",
  },
]);
