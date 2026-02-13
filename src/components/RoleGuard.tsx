"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

type UserRole = "ADMIN" | "MANAGER" | "INSPECTOR" | "VIEWER";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

const roleHierarchy: Record<UserRole, number> = {
  ADMIN: 4,
  MANAGER: 3,
  INSPECTOR: 2,
  VIEWER: 1,
};

export function RoleGuard({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return fallback;
  }

  const userRole = session.user.role;
  const hasAccess = allowedRoles.some(
    (role) => roleHierarchy[userRole] >= roleHierarchy[role],
  );

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}

// Hook for checking permissions in components
export function useRole() {
  const { data: session } = useSession();

  const hasRole = (role: UserRole): boolean => {
    if (!session?.user) return false;
    const userRole = session.user.role;
    return roleHierarchy[userRole] >= roleHierarchy[role];
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!session?.user) return false;
    return roles.some((role) => hasRole(role));
  };

  const isAdmin = (): boolean => session?.user?.role === "ADMIN";
  const isManager = (): boolean => hasRole("MANAGER");
  const isInspector = (): boolean => hasRole("INSPECTOR");

  return {
    role: session?.user?.role,
    hasRole,
    hasAnyRole,
    isAdmin,
    isManager,
    isInspector,
  };
}
