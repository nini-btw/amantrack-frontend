"use client";

import { useState } from "react";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";
import { useAssets } from "@/features/assets/hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { AssetTable } from "@/features/assets/components/AssetTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ComplianceStatus } from "@/types/asset.types";
import { Search, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { AssetsHeader } from "@/components/dashboard/pagesHeaders/AssetsHeader";

export default function AssetsListPage() {
  const t = useTranslations("dashboard.assets.list");

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

  // 1. Loading State
  if (isLoading) {
    return <LoadingSpinner message={t("loading")} />;
  }

  // 2. Error State
  if (assetsError) {
    return <ErrorMessage message={t("error")} onRetry={() => refetch()} />;
  }

  // 3. Filter Logic
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

  const counts = {
    total: assets.length,
    green: assets.filter((a) => a.status === "GREEN").length,
    yellow: assets.filter((a) => a.status === "YELLOW").length,
    red: assets.filter((a) => a.status === "RED").length,
  };

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <AssetsHeader />

        {/* Filters and Search Bar */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] p-6 rounded-lg shadow-lg dark:shadow-none mb-6 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#6B7280] dark:text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] text-[#111827] dark:text-[#E4E6EB] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#111827]"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "ALL" as const,
                  label: t("filters.all"),
                  count: counts.total,
                  color: "blue",
                },
                {
                  key: "GREEN" as const,
                  label: t("filters.valid"),
                  count: counts.green,
                  color: "green",
                  icon: CheckCircle,
                },
                {
                  key: "YELLOW" as const,
                  label: t("filters.warning"),
                  count: counts.yellow,
                  color: "yellow",
                  icon: AlertTriangle,
                },
                {
                  key: "RED" as const,
                  label: t("filters.expired"),
                  count: counts.red,
                  color: "red",
                  icon: XCircle,
                },
              ].map((btn) => {
                const isActive = filter === btn.key;
                const colors: Record<
                  string,
                  { active: string; inactive: string }
                > = {
                  blue: {
                    active: "bg-blue-600 text-white",
                    inactive: "bg-gray-100 dark:bg-[#2A2E37] text-[#6B7280]",
                  },
                  green: {
                    active: "bg-green-600 text-white",
                    inactive:
                      "bg-green-100 dark:bg-green-900/20 text-green-700",
                  },
                  yellow: {
                    active: "bg-yellow-600 text-white",
                    inactive:
                      "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700",
                  },
                  red: {
                    active: "bg-red-600 text-white",
                    inactive: "bg-red-100 dark:bg-red-900/20 text-red-700",
                  },
                };

                return (
                  <button
                    key={btn.key}
                    onClick={() => setFilter(btn.key)}
                    className={`flex-1 min-w-30 flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg font-semibold transition-all cursor-pointer ${
                      isActive
                        ? colors[btn.color].active + " shadow-md"
                        : colors[btn.color].inactive
                    }`}
                  >
                    {btn.icon && <btn.icon className="w-4 h-4 shrink-0" />}
                    {btn.label} ({btn.count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chips */}
          {(filter !== "ALL" || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-[#E5E7EB] dark:border-[#2D3340]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#6B7280]">
                  {t("activeFilters")}
                </span>

                {filter !== "ALL" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {t("statusLabel")} {filter}
                    <button onClick={() => setFilter("ALL")}>✕</button>
                  </span>
                )}

                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {t("searchLabel")} "{searchTerm}"
                    <button onClick={() => setSearchTerm("")}>✕</button>
                  </span>
                )}

                <button
                  onClick={() => {
                    setFilter("ALL");
                    setSearchTerm("");
                  }}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {t("clearAll")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredAssets.length !== assets.length && (
          <div className="mb-4 px-2">
            <p className="text-sm text-[#6B7280]">
              {t("showingResults", {
                count: filteredAssets.length,
                total: assets.length,
                item: filteredAssets.length === 1 ? t("asset") : t("assets"),
              })}
            </p>
          </div>
        )}

        {/* Empty States */}
        {filteredAssets.length === 0 && assets.length > 0 && (
          <div className="bg-white dark:bg-[#1B1F28] rounded-lg p-12 text-center border border-[#E5E7EB] dark:border-[#2D3340]">
            <Search className="w-14 h-14 mx-auto text-[#9CA3AF] mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t("emptyStates.noResults.title")}
            </h3>
            <p className="text-[#6B7280] mb-6">
              {t("emptyStates.noResults.description")}
            </p>
            <button
              onClick={() => {
                setFilter("ALL");
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
            >
              {t("emptyStates.noResults.button")}
            </button>
          </div>
        )}

        {assets.length === 0 && (
          <div className="bg-white dark:bg-[#1B1F28] rounded-lg p-16 text-center border border-[#E5E7EB] dark:border-[#2D3340]">
            <div className="text-7xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-2">
              {t("emptyStates.noAssets.title")}
            </h3>
            <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
              {t("emptyStates.noAssets.description")}
            </p>
            <Link
              href="/assets/new"
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg active:scale-[0.98] transition-all"
            >
              + {t("emptyStates.noAssets.button")}
            </Link>
          </div>
        )}

        {/* Table View */}
        {filteredAssets.length > 0 && (
          <AssetTable assets={filteredAssets} locations={locations} />
        )}
      </div>
    </div>
  );
}
