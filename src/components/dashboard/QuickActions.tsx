"use client";

import Link from "next/link";
import { LucideIcon, Plus, Search, BarChart3 } from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: "red" | "blue" | "purple" | "green";
}

const colorClasses = {
  red: {
    gradient:
      "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800",
    textLight: "text-red-100",
  },
  blue: {
    gradient:
      "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800",
    textLight: "text-blue-100",
  },
  purple: {
    gradient:
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800",
    textLight: "text-purple-100",
  },
  green: {
    gradient:
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800",
    textLight: "text-green-100",
  },
};

const defaultActions: QuickAction[] = [
  {
    title: "Add New Asset",
    description: "Register new equipment",
    href: "/assets/new",
    icon: Plus,
    color: "red",
  },
  {
    title: "View Assets",
    description: "Browse and search all assets",
    href: "/assets",
    icon: Search,
    color: "blue",
  },
  {
    title: "Statistics",
    description: "View detailed reports",
    href: "/statistics",
    icon: BarChart3,
    color: "purple",
  },
];

interface QuickActionsProps {
  actions?: QuickAction[];
}

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {actions.map((action) => {
        const colors = colorClasses[action.color];
        const Icon = action.icon;

        return (
          <Link
            key={action.href}
            href={action.href}
            className={`group relative overflow-hidden bg-linear-to-br ${colors.gradient} text-white rounded-lg shadow-lg p-4 sm:p-5 lg:p-6 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl`}
          >
            <div className="relative z-10 flex items-start gap-3 sm:gap-4">
              <div
                className={`
    shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
    rounded-xl flex items-center justify-center
    ${
      action.color === "red" || action.color === "purple"
        ? "bg-white/25 group-hover:bg-white/35"
        : "bg-white/10 group-hover:bg-white/20"
    }
    transition-all duration-300 backdrop-blur-sm
  `}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1">
                  {action.title}
                </h3>
                <p className={`${colors.textLight} text-xs sm:text-sm`}>
                  {action.description}
                </p>
              </div>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            {/* Animated gradient effect */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          </Link>
        );
      })}
    </div>
  );
}
