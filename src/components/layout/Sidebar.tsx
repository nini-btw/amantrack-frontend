"use client";

import { Link } from "@/routing";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Home,
  Archive,
  MapPin,
  BarChart2,
  FileText,
  ChevronUp,
} from "lucide-react";
import Logo from "@/components/Logo";
import { SidebarFooter } from "./SidebarFooter";

interface NavItem {
  nameKey: string;
  href: string;
  icon: React.ReactNode;
  groupKey: string;
}

const navigation: NavItem[] = [
  {
    nameKey: "dashboard",
    href: "/dashboard",
    icon: <Home size={20} />,
    groupKey: "dashboard",
  },
  {
    nameKey: "assets",
    href: "/assets",
    icon: <Archive size={20} />,
    groupKey: "assets",
  },
  {
    nameKey: "locations",
    href: "/locations",
    icon: <MapPin size={20} />,
    groupKey: "assets",
  },
  {
    nameKey: "statistics",
    href: "/statistics",
    icon: <BarChart2 size={20} />,
    groupKey: "analytics",
  },
  {
    nameKey: "reports",
    href: "/reports",
    icon: <FileText size={20} />,
    groupKey: "analytics",
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
  const t = useTranslations("dashboard.sidebar");
  const pathname = usePathname();

  /**
   * Normalize pathname for i18n
   * Removes locale prefix (e.g., /en/dashboard -> /dashboard)
   * This ensures isActive logic works across all languages
   */
  const normalizedPathname =
    pathname.replace(/^\/(?:[a-z]{2})(?=\/|$)/, "") || "/";

  const groupKeys = Array.from(
    new Set(navigation.map((item) => item.groupKey)),
  );
  const [expandedGroups, setExpandedGroups] = useState<string[]>(groupKeys);

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupKey)
        ? prev.filter((g) => g !== groupKey)
        : [...prev, groupKey],
    );
  };

  const getSidebarTransform = () => {
    if (!isMobile) return "translateX(0)";
    if (isDragging) return `translateX(${(dragProgress - 1) * 100}%)`;
    return isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)";
  };

  const getBackdropOpacity = () => {
    if (!isMobile) return 0;
    if (isDragging) return dragProgress * 0.5;
    return isMobileMenuOpen ? 0.5 : 0;
  };

  return (
    <>
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-black z-40 transition-opacity duration-300 md:hidden",
            isMobileMenuOpen || isDragging
              ? "pointer-events-auto"
              : "pointer-events-none opacity-0",
          )}
          style={{
            opacity: isDragging || isMobileMenuOpen ? getBackdropOpacity() : 0,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex h-screen flex-col bg-[#111827] dark:bg-[#1b1f28] text-white relative overflow-x-hidden border-r border-gray-800 dark:border-[#2d3340]",
          !isMobile && "transition-all duration-300 ease-in-out",
          !isMobile && (isCollapsed ? "w-20" : "w-64"),
          isMobile && "fixed inset-y-0 left-0 w-64 z-50",
        )}
        style={
          isMobile
            ? {
                transform: getSidebarTransform(),
                transition: isDragging
                  ? "none"
                  : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }
            : undefined
        }
      >
        {/* Header */}
        <div
          onClick={(e) => {
            if (!isMobile && !(e.target as HTMLElement).closest("a")) {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className={cn(
            "flex h-16 items-center border-b border-gray-800 dark:border-[#2d3340] bg-gray-950 dark:bg-[#0d1117] px-3 transition-all duration-300 ease-in-out justify-center",
            !isMobile &&
              "cursor-pointer select-none hover:bg-gray-900 dark:hover:bg-[#161b22]",
          )}
        >
          {isCollapsed && !isMobile ? (
            <div className="flex items-center justify-center">
              <Logo color="#fff" width={32} height={32} />
            </div>
          ) : (
            <div dir="ltr" className="flex items-center justify-center gap-2">
              <Logo color="#fff" width={32} height={32} />
              <h1 className="text-2xl font-bold whitespace-nowrap">
                <span className="text-red-500">Aman</span>
                <span className="text-white">Track</span>
              </h1>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-1 py-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
          {isCollapsed && !isMobile
            ? groupKeys.map((groupKey, gi) => {
                const groupItems = navigation.filter(
                  (item) => item.groupKey === groupKey,
                );
                return (
                  <div key={groupKey} className="space-y-1">
                    {groupItems.map((item) => {
                      const isActive =
                        normalizedPathname === item.href ||
                        normalizedPathname.startsWith(item.href + "/");
                      return (
                        <Link
                          key={item.nameKey}
                          href={item.href}
                          onClick={() => isMobile && setIsMobileMenuOpen(false)}
                          className={cn(
                            "relative flex items-center justify-center px-0 py-3 rounded-lg transition-all duration-200 group",
                            isActive
                              ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                              : "text-gray-300 dark:text-[#9ca3af] hover:bg-gray-800 dark:hover:bg-[#2a2e37] hover:text-white",
                          )}
                          title={t(`links.${item.nameKey}`)}
                        >
                          <div className="group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                        </Link>
                      );
                    })}
                    {gi < groupKeys.length - 1 && (
                      <div className="my-2 border-t border-gray-700 dark:border-[#2d3340]" />
                    )}
                  </div>
                );
              })
            : groupKeys.map((groupKey) => {
                const isExpanded = expandedGroups.includes(groupKey);
                const groupItems = navigation.filter(
                  (item) => item.groupKey === groupKey,
                );
                return (
                  <div key={groupKey} className="space-y-1">
                    <button
                      onClick={() => toggleGroup(groupKey)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-4 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 hover:bg-gray-800 transition-all",
                        isCollapsed && "justify-center",
                      )}
                    >
                      <span>{t(`groups.${groupKey}`)}</span>
                      <ChevronUp
                        size={16}
                        className={cn(
                          "transition-transform",
                          !isExpanded && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "space-y-1 overflow-hidden transition-all duration-300",
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      {groupItems.map((item, index) => {
                        const isActive =
                          normalizedPathname === item.href ||
                          normalizedPathname.startsWith(item.href + "/");
                        return (
                          <Link
                            key={item.nameKey}
                            href={item.href}
                            onClick={() =>
                              isMobile && setIsMobileMenuOpen(false)
                            }
                            className={cn(
                              "relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all group",
                              isActive
                                ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]"
                                : "text-gray-300 dark:text-[#e4e6eb] hover:bg-gray-800 hover:pl-5",
                            )}
                            style={{
                              transitionDelay: isExpanded
                                ? `${index * 30}ms`
                                : "0ms",
                            }}
                          >
                            <div className="shrink-0 group-hover:scale-110 transition-transform">
                              {item.icon}
                            </div>
                            <span>{t(`links.${item.nameKey}`)}</span>
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-pulse" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </nav>

        <SidebarFooter isCollapsed={isCollapsed && !isMobile} />
      </div>
    </>
  );
}
