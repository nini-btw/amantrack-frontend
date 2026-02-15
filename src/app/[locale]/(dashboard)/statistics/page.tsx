"use client";

import { useTranslations, useFormatter } from "next-intl";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { StatisticsCharts } from "@/features/statistics/components/StatisticsCharts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { StatisticsHeader } from "@/components/dashboard/pagesHeaders/StatisticsHeader";

export default function StatisticsPage() {
  const t = useTranslations("dashboard.statistics");
  const format = useFormatter();
  const { data: statistics, isLoading, error, refetch } = useStatistics();

  if (isLoading) {
    return <LoadingSpinner message={t("loading")} />;
  }

  if (error || !statistics) {
    return <ErrorMessage message={t("error")} onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Header */}
        <StatisticsHeader />

        <StatisticsCharts statistics={statistics} />

        {/* Footer info with localized date */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#E5E7EB] dark:border-[#2D3340]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            <p>
              {t("footer.lastUpdated", {
                date: format.dateTime(new Date(), {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
