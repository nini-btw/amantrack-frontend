"use client";

import { BarChart2 } from "lucide-react";
import Link from "next/link";

export function StatisticsHeader() {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
          <BarChart2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-700 dark:text-purple-500 shrink-0" />
          <span className="leading-tight">Statistics & Charts</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Asset statistics, compliance rates, and trends
        </p>
      </div>

      <Link
        href="/"
        className="
          cursor-pointer
          inline-flex items-center justify-center gap-2
          px-4 sm:px-6 py-2.5 sm:py-3
          bg-white dark:bg-[#1B1F28]
          border-2 border-[#E5E7EB] dark:border-[#2D3340]
          hover:bg-gray-50 dark:hover:bg-[#2A2E37]
          hover:border-[#D1D5DB] dark:hover:border-[#3D4350]
          text-[#111827] dark:text-[#E4E6EB]
          font-medium text-sm sm:text-base
          rounded-lg
          transition-all duration-200
          w-full sm:w-auto
          active:scale-[0.98]
        "
      >
        <span className="text-lg leading-none">←</span>
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}
