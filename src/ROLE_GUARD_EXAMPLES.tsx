"use client";

import { RoleGuard, useRole } from "@/components/RoleGuard";
import { useSession } from "next-auth/react";

/**
 * EXAMPLE 1: Protecting entire sections with RoleGuard
 */
export function DashboardExample() {
  return (
    <div className="space-y-4">
      {/* Everyone can see this */}
      <div>
        <h1>Dashboard</h1>
      </div>

      {/* Only ADMIN can see this */}
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="bg-red-50 p-4 rounded">
          <h2>Admin Only Section</h2>
          <button>Delete All Data</button>
        </div>
      </RoleGuard>

      {/* MANAGER and above can see this */}
      <RoleGuard allowedRoles={["MANAGER"]}>
        <div className="bg-blue-50 p-4 rounded">
          <h2>Manager Section</h2>
          <button>Export Reports</button>
        </div>
      </RoleGuard>

      {/* INSPECTOR and above can see this */}
      <RoleGuard allowedRoles={["INSPECTOR"]}>
        <div className="bg-green-50 p-4 rounded">
          <h2>Inspector Section</h2>
          <button>Create Inspection</button>
        </div>
      </RoleGuard>
    </div>
  );
}

/**
 * EXAMPLE 2: Using useRole hook for conditional logic
 */
export function AssetActionsExample() {
  const { hasRole, isAdmin, isManager } = useRole();
  const { data: session } = useSession();

  return (
    <div className="flex gap-2">
      {/* Everyone can view */}
      <button>View Details</button>

      {/* Only inspectors and above can edit */}
      {hasRole("INSPECTOR") && <button>Edit Asset</button>}

      {/* Only managers and above can export */}
      {isManager() && <button>Export</button>}

      {/* Only admin can delete */}
      {isAdmin() && <button className="bg-red-600 text-white">Delete</button>}

      {/* Show user info */}
      <div className="ml-auto text-sm text-gray-600">
        Logged in as: {session?.user?.name} ({session?.user?.role})
      </div>
    </div>
  );
}

/**
 * EXAMPLE 3: Conditional rendering based on roles
 */
export function SidebarNavigationExample() {
  const { hasRole } = useRole();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", roles: ["VIEWER"] },
    { name: "Assets", href: "/assets", roles: ["VIEWER"] },
    { name: "Inspections", href: "/inspections", roles: ["INSPECTOR"] },
    { name: "Reports", href: "/reports", roles: ["MANAGER"] },
    { name: "Statistics", href: "/statistics", roles: ["MANAGER"] },
    { name: "Settings", href: "/settings", roles: ["ADMIN"] },
  ];

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const canAccess = hasRole(item.roles[0] as any);

        if (!canAccess) return null;

        return (
          <a
            key={item.name}
            href={item.href}
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
}

/**
 * EXAMPLE 4: Button with role-based disable
 */
export function CreateAssetButtonExample() {
  const { hasRole } = useRole();
  const canCreate = hasRole("INSPECTOR");

  return (
    <button
      disabled={!canCreate}
      className={`px-4 py-2 rounded ${
        canCreate
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      title={
        !canCreate ? "You need Inspector role or higher to create assets" : ""
      }
    >
      Create New Asset
    </button>
  );
}

/**
 * EXAMPLE 5: Show different content based on role
 */
export function WelcomeMessageExample() {
  const { data: session } = useSession();

  const roleMessages = {
    ADMIN: "You have full system access.",
    MANAGER: "You can manage assets and view reports.",
    INSPECTOR: "You can create inspections and manage assets.",
    VIEWER: "You have read-only access.",
  };

  const role = session?.user?.role || "VIEWER";

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">
        Welcome, {session?.user?.name}!
      </h2>
      <p className="text-gray-600">
        Role: <span className="font-semibold">{role}</span>
      </p>
      <p className="text-sm text-gray-500 mt-2">{roleMessages[role]}</p>
    </div>
  );
}
