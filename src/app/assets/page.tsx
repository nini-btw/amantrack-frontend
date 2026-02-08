"use client";

import { useState } from "react";
import Link from "next/link";
import { useAssets } from "@/features/assets/hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { AssetTable } from "@/features/assets/components/AssetTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ComplianceStatus } from "@/types/asset.types";

export default function AssetsListPage() {
  const {
    data: assets = [],
    isLoading: loadingAssets,
    error: assetsError,
    refetch,
  } = useAssets();
  const { data: locations = [], isLoading: loadingLocations } = useLocations();
  const [filter, setFilter] = useState<"ALL" | ComplianceStatus>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = loadingAssets || loadingLocations;

  // ENHANCED LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-150 gap-4">
            {/* Branded Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🧯</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-1">
                Loading Assets
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] animate-pulse">
                Fetching asset data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assetsError) {
    return (
      <ErrorMessage
        message="Failed to load assets. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  // Filter assets
  let filteredAssets = assets;

  if (filter !== "ALL") {
    filteredAssets = filteredAssets.filter((asset) => asset.status === filter);
  }

  if (searchTerm) {
    filteredAssets = filteredAssets.filter(
      (asset) =>
        asset.referenceNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  // Count by status
  const counts = {
    total: assets.length,
    green: assets.filter((a) => a.status === "GREEN").length,
    yellow: assets.filter((a) => a.status === "YELLOW").length,
    red: assets.filter((a) => a.status === "RED").length,
  };

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-3">
              <span className="text-4xl">🧯</span>
              Asset Management
            </h1>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Currently managing: Fire Extinguishers
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/assets/new"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              New Asset
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] hover:bg-gray-50 dark:hover:bg-[#2A2E37] text-[#111827] dark:text-[#E4E6EB] font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] p-6 rounded-lg shadow-lg dark:shadow-none mb-6 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#6B7280] dark:text-[#9CA3AF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by reference number or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] text-[#111827] dark:text-[#E4E6EB] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#E4E6EB]"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("ALL")}
                className={`cursor-pointer px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filter === "ALL"
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-[#2A2E37] text-[#6B7280] dark:text-[#9CA3AF] hover:bg-gray-200 dark:hover:bg-[#3D4350]"
                }`}
              >
                All ({counts.total})
              </button>

              <button
                onClick={() => setFilter("GREEN")}
                className={`px-4 cursor-pointer py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filter === "GREEN"
                    ? "bg-green-600 dark:bg-green-500 text-white shadow-md"
                    : "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">✓</span>
                  Valid ({counts.green})
                </span>
              </button>

              <button
                onClick={() => setFilter("YELLOW")}
                className={`px-4 cursor-pointer py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filter === "YELLOW"
                    ? "bg-yellow-600 dark:bg-yellow-500 text-white shadow-md"
                    : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">⚠</span>
                  Warning ({counts.yellow})
                </span>
              </button>

              <button
                onClick={() => setFilter("RED")}
                className={`px-4 cursor-pointer py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filter === "RED"
                    ? "bg-red-600 dark:bg-red-500 text-white shadow-md"
                    : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">✕</span>
                  Expired ({counts.red})
                </span>
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filter !== "ALL" || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-[#2D3340]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  Active filters:
                </span>

                {filter !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm font-medium">
                    Status: {filter}
                    <button
                      onClick={() => setFilter("ALL")}
                      className="hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      ✕
                    </button>
                  </span>
                )}

                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm font-medium">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      ✕
                    </button>
                  </span>
                )}

                <button
                  onClick={() => {
                    setFilter("ALL");
                    setSearchTerm("");
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredAssets.length !== assets.length && (
          <div className="mb-4 px-2">
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              Showing {filteredAssets.length} of {assets.length} asset
              {assets.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* EMPTY STATE - No Results */}
        {filteredAssets.length === 0 && assets.length > 0 && (
          <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
              No assets found
            </h3>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setFilter("ALL");
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* EMPTY STATE - No Assets at All */}
        {assets.length === 0 && (
          <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-16 text-center">
            <div className="text-7xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-[#111827] dark:text-[#E4E6EB] mb-2">
              No assets yet
            </h3>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] mb-8 max-w-md mx-auto">
              Get started by adding your first fire extinguisher to begin
              tracking compliance and inspections
            </p>
            <Link
              href="/assets/new"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              <span className="text-xl">+</span>
              Add Your First Asset
            </Link>
          </div>
        )}

        {/* Assets Table */}
        {filteredAssets.length > 0 && (
          <AssetTable assets={filteredAssets} locations={locations} />
        )}
      </div>
    </div>
  );
}
