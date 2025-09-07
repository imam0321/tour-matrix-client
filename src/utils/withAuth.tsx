import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types/auth.type";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const location = useLocation();

    if (isLoading) {
      return <div className="flex justify-center mt-20">Loading...</div>;
    }
    
    if (!isLoading && !data?.email) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!isLoading && requiredRole && requiredRole !== data?.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
