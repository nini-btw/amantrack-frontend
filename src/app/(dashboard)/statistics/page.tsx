"use client";

import Link from "next/link";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { StatisticsCharts } from "@/features/statistics/components/StatisticsCharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { BarChart2 } from "lucide-react";
import { StatisticsHeader } from "@/components/dashboard/pagesHeaders/StatisticsHeader";

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
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117]  transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Header */}

        <StatisticsHeader />

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
