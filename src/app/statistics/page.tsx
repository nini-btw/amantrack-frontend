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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">📊</span>
            Statistics & Reports
          </h1>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            ← Back to Menu
          </Link>
        </div>

        {/* Charts */}
        <StatisticsCharts statistics={statistics} />
      </div>
    </div>
  );
}
