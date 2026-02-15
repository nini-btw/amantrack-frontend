"use client";

import { Link } from "@/routing";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: "blue" | "green" | "yellow" | "purple";
  href?: string;
  subtitle?: string;
  progress?: {
    value: number;
    label?: string;
  };
  breakdown?: Array<{
    label: string;
    value: number | string;
    color?: string;
  }>;
  badge?: {
    text: string;
    variant: "success" | "warning" | "info";
  };
}

const colorClasses = {
  blue: {
    border: "border-blue-600 dark:border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-600 dark:bg-blue-400",
    progressBg: "bg-blue-200 dark:bg-blue-900/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
  },
  green: {
    border: "border-green-500 dark:border-green-400",
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-600 dark:bg-green-400",
    progressBg: "bg-green-200 dark:bg-green-900/30",
    iconBg: "bg-green-100 dark:bg-green-900/20",
  },
  yellow: {
    border: "border-yellow-500 dark:border-yellow-400",
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-600 dark:bg-yellow-400",
    progressBg: "bg-yellow-200 dark:bg-yellow-900/30",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  purple: {
    border: "border-purple-500 dark:border-purple-400",
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500 dark:bg-purple-400",
    progressBg: "bg-purple-200 dark:bg-purple-900/30",
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  href,
  subtitle,
  progress,
  breakdown,
  badge,
}: StatCardProps) {
  const colors = colorClasses[color];

  const content = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide truncate">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] dark:text-[#E4E6EB] mt-1 sm:mt-2">
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 ml-2 sm:ml-4 transition-transform duration-300 ${href ? "group-hover:scale-110" : ""}`}
        >
          <Icon
            className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colors.text}`}
          />
        </div>
      </div>

      {/* Progress Bar */}
      {progress && (
        <div className="mt-3 sm:mt-4">
          <div
            className={`w-full ${colors.progressBg} rounded-full h-2 overflow-hidden`}
          >
            <div
              className={`${colors.bg} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress.value}%` }}
            />
          </div>
          {progress.label && (
            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                {progress.label}
              </span>
              <span className={`font-semibold ${colors.text}`}>
                {progress.value}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* Breakdown */}
      {breakdown && (
        <div className="mt-3 sm:mt-4 space-y-2">
          {breakdown.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                {item.label}
              </span>
              <span className={`font-semibold ${item.color || colors.text}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="mt-3 sm:mt-4">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              badge.variant === "success"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                : badge.variant === "warning"
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
            }`}
          >
            {badge.text}
          </span>
        </div>
      )}

      {/* Subtitle or Link */}
      {subtitle && !href && (
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          {subtitle}
        </p>
      )}

      {href && (
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            {subtitle}
          </span>
          <span
            className={`text-xs sm:text-sm ${colors.text} font-medium flex items-center gap-1 group-hover:gap-2 transition-all`}
          >
            View all
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6 border-l-4 ${colors.border} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6 border-l-4 ${colors.border} transition-all duration-300 hover:shadow-xl`}
    >
      {content}
    </div>
  );
}
