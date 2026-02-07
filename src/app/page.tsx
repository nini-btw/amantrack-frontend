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
        {/* Total Assets */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="text-4xl">🧯</div>
          </div>
          <div className="mt-4">
            <Link
              href="/assets"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all →
            </Link>
          </div>
        </div>

        {/* Valid Assets */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.valid}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {stats.total > 0
                ? Math.round((stats.valid / stats.total) * 100)
                : 0}
              % of total
            </p>
          </div>
        </div>

        {/* Warning + Expired */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Needs Attention
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {(stats.byStatus.YELLOW || 0) + (stats.byStatus.RED || 0)}
              </p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {stats.byStatus.YELLOW || 0} warning, {stats.byStatus.RED || 0}{" "}
              expired
            </p>
          </div>
        </div>

        {/* Compliance Rate */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.compliancePercentage}%
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${stats.compliancePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link
          href="/assets/new"
          className="bg-linear-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg p-6 transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">➕</div>
            <div>
              <h3 className="text-xl font-bold">Add New Asset</h3>
              <p className="text-red-100 text-sm mt-1">
                Register new equipment
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/assets"
          className="bg-linear-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg p-6 transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">🔍</div>
            <div>
              <h3 className="text-xl font-bold">View Assets</h3>
              <p className="text-blue-100 text-sm mt-1">
                Browse and search all assets
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/statistics"
          className="bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-lg p-6 transition-all transform hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">📈</div>
            <div>
              <h3 className="text-xl font-bold">Statistics</h3>
              <p className="text-purple-100 text-sm mt-1">
                View detailed reports
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Attention */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Needs Attention
            </h3>
          </div>
          <div className="p-6">
            {needsAttention.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-5xl mb-2">✨</div>
                <p>All assets are in good standing!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {needsAttention.map((asset) => (
                  <Link
                    key={asset.id}
                    href={`/assets/${asset.id}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            asset.status === "RED"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {asset.referenceNumber}
                          </p>
                          <p className="text-sm text-gray-500">{asset.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {asset.daysRemaining > 0
                            ? `${asset.daysRemaining} days`
                            : `${Math.abs(asset.daysRemaining)} days overdue`}
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
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Assets
            </h3>
          </div>
          <div className="p-6">
            {recentAssets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-5xl mb-2">📦</div>
                <p>No assets yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAssets.map((asset) => (
                  <Link
                    key={asset.id}
                    href={`/assets/${asset.id}`}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🧯</div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {asset.referenceNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {asset.type} - {asset.class}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          asset.status === "GREEN"
                            ? "bg-green-100 text-green-800"
                            : asset.status === "YELLOW"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {asset.status === "GREEN"
                          ? "Valid"
                          : asset.status === "YELLOW"
                            ? "Warning"
                            : "Expired"}
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
