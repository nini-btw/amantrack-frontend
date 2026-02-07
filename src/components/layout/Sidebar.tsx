"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Assets", href: "/assets", icon: "🧯" },
  { name: "Locations", href: "/locations", icon: "📍" },
  { name: "Statistics", href: "/statistics", icon: "📈" },
  { name: "Reports", href: "/reports", icon: "📄" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Logo/Header */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 bg-gray-950">
        <h1 className="text-2xl font-bold">
          <span className="text-red-500">Aman</span>
          <span className="text-white">Track</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
            👤
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">HSE Manager</p>
            <p className="text-xs text-gray-400">Organization 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
