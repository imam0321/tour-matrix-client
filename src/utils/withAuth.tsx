import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types/auth.type";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (!isLoading && !data?.email) {
      return <Navigate to="/login" />;
    }

    if (!isLoading && requiredRole && requiredRole !== data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
