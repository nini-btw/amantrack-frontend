"use client";

import Link from "next/link";
import { useAssets } from "@/features/assets/hooks/useAssets";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function DashboardPage() {
  const { data: assets = [], isLoading: loadingAssets } = useAssets();
  const { data: statistics, isLoading: loadingStats } = useStatistics();

  if (loadingAssets || loadingStats) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  const stats = statistics || {
    total: 0,
    valid: 0,
    expired: 0,
    byStatus: { GREEN: 0, YELLOW: 0, RED: 0 },
    compliancePercentage: 0,
  };

  // Recent assets (last 5)
  const recentAssets = assets.slice(0, 5);

  // Assets needing attention (expired or warning)
  const needsAttention = assets
    .filter((asset) => asset.status === "RED" || asset.status === "YELLOW")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/assets"
          className="group bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-6 border-l-4 border-blue-600 dark:border-blue-500 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide">
                Total Assets
              </p>
              <p className="text-4xl font-bold text-[#111827] dark:text-[#E4E6EB] mt-2">
                {stats.total}
              </p>
            </div>
            <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
              🧯
            </div>
          </div>

          {/* NEW: Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${stats.total > 0 ? (stats.valid / stats.total) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              {stats.valid} valid
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View all
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
        </Link>

        {/* Valid Assets - ENHANCED */}
        <div className="bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-6 border-l-4 border-green-500 dark:border-green-400 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide">
                Valid
              </p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                {stats.valid}
              </p>
            </div>
            <div className="text-5xl opacity-80">✅</div>
          </div>

          {/* NEW: Status indicator */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280] dark:text-[#9CA3AF]">
              {stats.total > 0
                ? Math.round((stats.valid / stats.total) * 100)
                : 0}
              % of total
            </span>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">Good</span>
            </div>
          </div>
        </div>

        {/* Needs Attention - ENHANCED */}
        <div className="bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-6 border-l-4 border-yellow-500 dark:border-yellow-400 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide">
                Needs Attention
              </p>
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                {(stats.byStatus.YELLOW || 0) + (stats.byStatus.RED || 0)}
              </p>
            </div>
            <div className="text-5xl opacity-80">
              {(stats.byStatus.YELLOW || 0) + (stats.byStatus.RED || 0) > 0
                ? "⚠️"
                : "✨"}
            </div>
          </div>

          {/* NEW: Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                Warning
              </span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {stats.byStatus.YELLOW || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                Expired
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                {stats.byStatus.RED || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Compliance - ENHANCED */}
        <div className="bg-white dark:bg-[#1B1F28] rounded-lg shadow-lg dark:shadow-none p-6 border-l-4 border-purple-500 dark:border-purple-400 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide">
                Compliance
              </p>
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {stats.compliancePercentage}%
              </p>
            </div>
            <div className="text-5xl opacity-80">📊</div>
          </div>

          {/* NEW: Enhanced progress bar with label */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-400">
                  {stats.compliancePercentage >= 90
                    ? "Excellent"
                    : stats.compliancePercentage >= 70
                      ? "Good"
                      : "Needs Work"}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-200 dark:bg-purple-900/30">
              <div
                style={{ width: `${stats.compliancePercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 dark:bg-purple-400 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - ENHANCED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Asset */}
        <Link
          href="/assets/new"
          className="group relative overflow-hidden bg-linear-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              ➕
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Add New Asset</h3>
              <p className="text-red-100 text-sm">Register new equipment</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        {/* View Assets */}
        <Link
          href="/assets"
          className="group relative overflow-hidden bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              🔍
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">View Assets</h3>
              <p className="text-blue-100 text-sm">
                Browse and search all assets
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        {/* Statistics */}
        <Link
          href="/statistics"
          className="group relative overflow-hidden bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              📈
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Statistics</h3>
              <p className="text-purple-100 text-sm">View detailed reports</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Attention */}
        <div className="bg-white dark:bg-[#1b1f28] rounded-lg shadow-lg dark:shadow-none transition-colors">
          {/* Section Header - ENHANCED */}
          <div
            className="rounded-t-lg bg-linear-to-r 
from-gray-50 to-gray-100 
dark:from-[#0F172A] dark:to-[#1E293B]
px-6 py-4 shadow-sm dark:shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Needs Attention
              </h3>

              {needsAttention.length > 0 && (
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold 
      bg-red-100 dark:bg-red-900/30 
      text-red-800 dark:text-red-400"
                >
                  {needsAttention.length}
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            {needsAttention.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">✨</div>
                <h4 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
                  All Clear!
                </h4>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  All assets are in good standing
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {needsAttention.map((asset) => (
                  <Link
                    key={asset.id}
                    href={`/assets/${asset.id}`}
                    className="group block p-4 rounded-lg border-2 border-[#E5E7EB] dark:border-[#2D3340] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 bg-white dark:bg-[#0D1117]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Animated status dot */}
                        <div
                          className={`w-3 h-3 rounded-full ${
                            asset.status === "RED"
                              ? "bg-red-500 animate-pulse"
                              : "bg-yellow-500"
                          }`}
                        />

                        <div>
                          <p className="font-semibold text-[#111827] dark:text-[#E4E6EB] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {asset.referenceNumber}
                          </p>
                          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                            {asset.type}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${
                            asset.status === "RED"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {asset.daysRemaining > 0
                            ? `${asset.daysRemaining} days left`
                            : `${Math.abs(asset.daysRemaining)} days overdue`}
                        </p>
                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                          {asset.status === "RED" ? "Expired" : "Warning"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Assets */}
        <div className="bg-white dark:bg-[#1b1f28] rounded-lg shadow-lg dark:shadow-none transition-colors">
          <div
            className="rounded-t-lg bg-linear-to-t 
from-gray-50 to-gray-100 
dark:from-[#0F172A] dark:to-[#1E293B]
px-6 py-4 shadow-sm dark:shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <span className="text-xl">🕐</span>
                Recent Assets
              </h3>

              {recentAssets.length > 0 && (
                <Link
                  href="/assets"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View all
                </Link>
              )}
            </div>
          </div>

          <div className="p-6">
            {recentAssets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">📦</div>
                <h4 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
                  No Assets Yet
                </h4>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4">
                  Get started by adding your first fire extinguisher
                </p>
                <Link
                  href="/assets/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  <span>➕</span>
                  Add First Asset
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAssets.map((asset) => (
                  <Link
                    key={asset.id}
                    href={`/assets/${asset.id}`}
                    className="group block p-4 rounded-lg border-2 border-[#E5E7EB] dark:border-[#2D3340] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 bg-white dark:bg-[#0D1117]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                          🧯
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827] dark:text-[#E4E6EB] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {asset.referenceNumber}
                          </p>
                          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                            {asset.type} - {asset.class}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Status Badge */}
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${
                          asset.status === "GREEN"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                            : asset.status === "YELLOW"
                              ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                        }`}
                      >
                        {asset.status === "GREEN" && "✓ Valid"}
                        {asset.status === "YELLOW" && "⚠ Warning"}
                        {asset.status === "RED" && "✕ Expired"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
