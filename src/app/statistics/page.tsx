"use client";

import Link from "next/link";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { StatisticsCharts } from "@/features/statistics/components/StatisticsCharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

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
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-3">
            <span className="text-4xl">📊</span>
            Statistics & Reports
          </h1>

          <Link
            href="/"
            className="
              px-6 py-3 bg-white dark:bg-[#1B1F28]
              border-2 border-[#E5E7EB] dark:border-[#2D3340]
              text-[#111827] dark:text-[#E4E6EB]
              rounded-lg font-medium
              hover:bg-gray-50 dark:hover:bg-[#2A2E37]
              transition-all
            "
          >
            ← Back
          </Link>
        </div>

        <StatisticsCharts statistics={statistics} />
      </div>
    </div>
  );
}
