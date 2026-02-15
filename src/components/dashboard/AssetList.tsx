"use client";

import { Link } from "@/routing";
import { useTranslations } from "next-intl";
import {
  LucideIcon,
  AlertTriangle,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Asset {
  id: string;
  referenceNumber: string;
  type: string;
  class?: string;
  status: "GREEN" | "YELLOW" | "RED";
  daysRemaining?: number;
}

interface AssetListProps {
  title: string;
  icon: LucideIcon;
  assets: Asset[];
  emptyState: {
    icon: string | LucideIcon;
    title: string;
    description: string;
    action?: {
      text: string;
      href: string;
      icon?: LucideIcon;
    };
  };
  variant?: "recent" | "attention";
  showViewAll?: boolean;
}

export function AssetList({
  title,
  icon: Icon,
  assets,
  emptyState,
  variant = "recent",
  showViewAll = false,
}: AssetListProps) {
  const t = useTranslations("dashboard.dashboard.assetList");
  const EmptyIcon = emptyState.icon;
  const ActionIcon = emptyState.action?.icon;

  // Status configuration moved inside to use translation hook
  const statusConfig = {
    GREEN: {
      label: t("status.valid"),
      icon: CheckCircle,
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      dot: "bg-green-500",
    },
    YELLOW: {
      label: t("status.warning"),
      icon: AlertTriangle,
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      text: "text-yellow-700 dark:text-yellow-400",
      border: "border-yellow-200 dark:border-yellow-800",
      dot: "bg-yellow-500",
    },
    RED: {
      label: t("status.expired"),
      icon: XCircle,
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      dot: "bg-red-500",
    },
  };

  return (
    <div className="bg-white dark:bg-[#1b1f28] rounded-lg shadow-lg dark:shadow-none transition-colors h-full flex flex-col">
      {/* Header */}
      <div className="rounded-t-lg bg-linear-to-r from-gray-50 to-gray-100 dark:from-[#0F172A] dark:to-[#1E293B] px-4 sm:px-6 py-3 sm:py-4 shadow-sm dark:shadow-black/40">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <span className="truncate">{title}</span>
          </h3>

          {assets.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3">
              {variant === "attention" && (
                <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 shrink-0">
                  {assets.length}
                </span>
              )}
              {showViewAll && (
                <Link
                  href="/assets"
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium whitespace-nowrap"
                >
                  {t("viewAll")}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1">
        {assets.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-3">
              {typeof EmptyIcon === "string" ? (
                EmptyIcon
              ) : (
                <EmptyIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 dark:text-gray-600" />
              )}
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
              {emptyState.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4 max-w-md mx-auto px-4">
              {emptyState.description}
            </p>
            {emptyState.action && (
              <Link
                href={emptyState.action.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                {ActionIcon && <ActionIcon className="w-4 h-4" />}
                {emptyState.action.text}
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {assets.map((asset) => {
              const config = statusConfig[asset.status];

              return (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.id}`}
                  className="group block p-3 sm:p-4 rounded-lg border-2 border-[#E5E7EB] dark:border-[#2D3340] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 bg-white dark:bg-[#0D1117]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {variant === "attention" && (
                        <div
                          className={`w-3 h-3 rounded-full shrink-0 ${config.dot}`}
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base text-[#111827] dark:text-[#E4E6EB] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {asset.referenceNumber}
                        </p>
                        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] truncate">
                          {asset.type}
                          {asset.class && ` - ${asset.class}`}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {variant === "attention" &&
                      asset.daysRemaining !== undefined ? (
                        <div className="text-right">
                          <p
                            className={`text-xs sm:text-sm font-bold ${
                              asset.status === "RED"
                                ? "text-red-600 dark:text-red-400"
                                : "text-yellow-600 dark:text-yellow-400"
                            }`}
                          >
                            {asset.daysRemaining > 0
                              ? t("time.daysLeft", {
                                  count: asset.daysRemaining,
                                })
                              : t("time.daysOverdue", {
                                  count: Math.abs(asset.daysRemaining),
                                })}
                          </p>
                          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                            {config.label}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border-2 ${config.bg} ${config.text} ${config.border} whitespace-nowrap`}
                        >
                          {config.label}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
