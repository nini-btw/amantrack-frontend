"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Home,
  Archive,
  MapPin,
  BarChart2,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import { SidebarFooter } from "./SidebarFooter";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  group: string;
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: <Home size={20} />,
    group: "Dashboard",
  },
  {
    name: "Assets",
    href: "/assets",
    icon: <Archive size={20} />,
    group: "Assets",
  },
  {
    name: "Locations",
    href: "/locations",
    icon: <MapPin size={20} />,
    group: "Assets",
  },
  {
    name: "Statistics",
    href: "/statistics",
    icon: <BarChart2 size={20} />,
    group: "Analytics",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <FileText size={20} />,
    group: "Analytics",
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isMobile: boolean;
  dragProgress: number;
  isDragging: boolean;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isMobile,
  dragProgress,
  isDragging,
}: SidebarProps) {
  const pathname = usePathname();
  const groups = Array.from(new Set(navigation.map((item) => item.group)));
  const [expandedGroups, setExpandedGroups] = useState<string[]>(groups);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  // Calculate sidebar position for drag animation
  const getSidebarTransform = () => {
    if (!isMobile) return "translateX(0)";
    if (isDragging) {
      return `translateX(${(dragProgress - 1) * 100}%)`;
    }
    return isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)";
  };

  // Calculate backdrop opacity
  const getBackdropOpacity = () => {
    if (!isMobile) return 0;
    if (isDragging) return dragProgress * 0.5;
    return isMobileMenuOpen ? 0.5 : 0;
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-black z-40 transition-opacity duration-300 md:hidden",
            isMobileMenuOpen || isDragging
              ? "pointer-events-auto"
              : "pointer-events-none",
          )}
          style={{ opacity: getBackdropOpacity() }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "rounded-br-lg flex h-screen flex-col bg-[#111827] dark:bg-[#1b1f28] text-white transition-all duration-300 relative overflow-x-hidden border-r border-gray-800 dark:border-[#2d3340]",
          // Desktop behavior
          !isMobile && (isCollapsed ? "w-20" : "w-64"),
          // Mobile behavior
          isMobile && "fixed inset-y-0 left-0 w-64 z-50",
        )}
        style={{
          transform: getSidebarTransform(),
          transition: isDragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          onClick={(e) => {
            if (!isMobile && !(e.target as HTMLElement).closest("a")) {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className={cn(
            "flex h-16 items-center border-b border-gray-800 dark:border-[#2d3340] bg-gray-950 dark:bg-[#0d1117] px-3",
            !isMobile && "justify-center cursor-pointer select-none",
            isMobile && "justify-between",
          )}
        >
          {isCollapsed && !isMobile ? (
            <Logo color="#fff" width={32} height={32} />
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Logo color="#fff" width={32} height={32} />
                <h1 className="text-2xl font-bold">
                  <span className="text-red-500">Aman</span>
                  <span className="text-white">Track</span>
                </h1>
              </div>

              {/* Close button for mobile */}
              {isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-800 dark:hover:bg-[#2a2e37] rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              )}
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="rounded-lg flex-1 overflow-y-auto px-1 py-4 space-y-2">
          {isCollapsed && !isMobile
            ? groups.map((group, gi) => {
                const groupItems = navigation.filter(
                  (item) => item.group === group,
                );
                return (
                  <div key={group}>
                    {groupItems.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => isMobile && setIsMobileMenuOpen(false)}
                          className={cn(
                            "relative flex items-center justify-center px-0 py-3 rounded-lg transition-colors group",
                            isActive
                              ? "bg-red-600 text-white"
                              : "text-gray-300 dark:text-[#9ca3af] hover:bg-gray-800 dark:hover:bg-[#2a2e37] hover:text-white",
                          )}
                        >
                          {item.icon}
                        </Link>
                      );
                    })}
                    {gi < groups.length - 1 && (
                      <div className="my-2 border-t border-gray-700 dark:border-[#2d3340]" />
                    )}
                  </div>
                );
              })
            : groups.map((group) => {
                const isExpanded = expandedGroups.includes(group);
                const groupItems = navigation.filter(
                  (item) => item.group === group,
                );
                return (
                  <div key={group}>
                    <button
                      onClick={() => toggleGroup(group)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 hover:bg-gray-800 dark:hover:bg-[#2a2e37] transition-colors",
                        isCollapsed && "justify-center",
                      )}
                    >
                      {group}
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    <div
                      className={cn(
                        "mt-1 space-y-1 overflow-hidden transition-all duration-300",
                        isExpanded ? "max-h-96" : "max-h-0",
                      )}
                    >
                      {groupItems.map((item) => {
                        const isActive =
                          pathname === item.href ||
                          pathname.startsWith(item.href + "/");
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() =>
                              isMobile && setIsMobileMenuOpen(false)
                            }
                            className={cn(
                              "relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors group",
                              isActive
                                ? "bg-red-600 text-white"
                                : "text-gray-300 dark:text-[#e4e6eb] hover:bg-gray-800 dark:hover:bg-[#2a2e37] hover:text-white",
                            )}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </nav>

        {/* Footer */}
        <SidebarFooter isCollapsed={isCollapsed && !isMobile} />
      </div>
    </>
  );
}
