import App from "@/App";
import Verify from "@/pages/Verify";
import { lazy } from "react";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types/auth.type";
import HomePage from "@/pages/HomePage";
import ReviewSection from "@/components/modules/Home/ReviewSection";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage";
import ResetPassword from "@/components/modules/Authentication/ResetPassword";
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout")
);
const ToursPage = lazy(() => import("@/pages/ToursPage"));
const TourDetailsPage = lazy(() => import("@/pages/TourDetailsPage"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const Success = lazy(() => import("@/pages/Payment/Success"));
const Fail = lazy(() => import("@/pages/Payment/Fail"));
const Cancel = lazy(() => import("@/pages/Payment/Cancel"));

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
]);
