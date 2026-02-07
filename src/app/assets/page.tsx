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

  if (isLoading) {
    return <LoadingSpinner message="Loading assets..." />;
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">🧯</span>
            Fire Extinguishers
          </h1>
          <div className="flex gap-3">
            <Link
              href="/assets/new"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Asset
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by reference or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "ALL"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All ({counts.total})
              </button>
              <button
                onClick={() => setFilter("GREEN")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "GREEN"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                Valid ({counts.green})
              </button>
              <button
                onClick={() => setFilter("YELLOW")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "YELLOW"
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
              >
                Warning ({counts.yellow})
              </button>
              <button
                onClick={() => setFilter("RED")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "RED"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }`}
              >
                Expired ({counts.red})
              </button>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <AssetTable assets={filteredAssets} locations={locations} />
      </div>
    </div>
  );
}
