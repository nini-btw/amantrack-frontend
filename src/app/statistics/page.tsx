"use client";

import Link from "next/link";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { StatisticsCharts } from "@/features/statistics/components/StatisticsCharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { BarChart2 } from "lucide-react";

export default function StatisticsPage() {
  const { data: statistics, isLoading, error, refetch } = useStatistics();

  if (isLoading) {
    return <LoadingSpinner message="Loading statistics..." />;
  }

  if (error || !statistics) {
    return (
      <ErrorMessage
        message="Failed to load statistics. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-3 sm:p-4 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
            <BarChart2 className="dark:text-purple-500 text-purple-700 w-8 h-8 sm:w-10 sm:h-10" />
            <span className="leading-tight">Statistics & Charts</span>
          </h1>

          <Link
            href="/"
            className="
              w-full sm:w-auto
              px-4 sm:px-5 lg:px-6 
              py-2.5 sm:py-3
              bg-white dark:bg-[#1B1F28]
              border-2 border-[#E5E7EB] dark:border-[#2D3340]
              text-[#111827] dark:text-[#E4E6EB]
              rounded-lg font-medium
              text-sm sm:text-base
              hover:bg-gray-50 dark:hover:bg-[#2A2E37]
              hover:border-[#D1D5DB] dark:hover:border-[#3D4350]
              transition-all duration-200
              flex items-center justify-center gap-2
              active:scale-95
            "
          >
            <span className="text-lg">←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Optional: Add a subtitle/description for better UX */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
            <span className="text-base sm:text-lg shrink-0">ℹ️</span>
            <span>
              View comprehensive analytics and insights about your asset
              management system. All charts are interactive - hover or tap for
              detailed information.
            </span>
          </p>
        </div>

        <StatisticsCharts statistics={statistics} />

        {/* Optional: Add footer info for mobile users */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#E5E7EB] dark:border-[#2D3340]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            <p>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
