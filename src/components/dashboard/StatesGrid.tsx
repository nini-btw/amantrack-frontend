"use client";

import { useTranslations } from "next-intl";
import { StatCard } from "./StateCard";
import { Archive, CheckCircle2, AlertTriangle, PieChart } from "lucide-react";

interface Statistics {
  total: number;
  valid: number;
  expired: number;
  byStatus: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  compliancePercentage: number;
}

interface StatsGridProps {
  statistics: Statistics;
}

export function StatsGrid({ statistics }: StatsGridProps) {
  const t = useTranslations("dashboard.dashboard.stats");

  const needsAttentionCount =
    (statistics.byStatus.YELLOW || 0) + (statistics.byStatus.RED || 0);

  const validPercentage =
    statistics.total > 0
      ? Math.round((statistics.valid / statistics.total) * 100)
      : 0;

  // Logic for Compliance Label
  const getComplianceLabel = (percentage: number) => {
    if (percentage >= 90) return t("compliance.status.excellent");
    if (percentage >= 70) return t("compliance.status.good");
    return t("compliance.status.needsWork");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {/* Total Assets */}
      <StatCard
        title={t("totalAssets.title")}
        value={statistics.total}
        icon={Archive}
        color="blue"
        href="/assets"
        subtitle={t("totalAssets.subtitle", { count: statistics.valid })}
        progress={{
          value: validPercentage,
        }}
      />

      {/* Valid Assets */}
      <StatCard
        title={t("validAssets.title")}
        value={statistics.valid}
        icon={CheckCircle2}
        color="green"
        subtitle={t("validAssets.subtitle", { percentage: validPercentage })}
        badge={{
          text: t("validAssets.badge"),
          variant: "success",
        }}
      />

      {/* Needs Attention */}
      <StatCard
        title={t("needsAttention.title")}
        value={needsAttentionCount}
        icon={AlertTriangle}
        color="yellow"
        breakdown={[
          {
            label: t("needsAttention.warning"),
            value: statistics.byStatus.YELLOW || 0,
            color: "text-yellow-600 dark:text-yellow-400",
          },
          {
            label: t("needsAttention.expired"),
            value: statistics.byStatus.RED || 0,
            color: "text-red-600 dark:text-red-400",
          },
        ]}
      />

      {/* Compliance */}
      <StatCard
        title={t("compliance.title")}
        value={`${statistics.compliancePercentage}%`}
        icon={PieChart}
        color="purple"
        progress={{
          value: statistics.compliancePercentage,
          label: getComplianceLabel(statistics.compliancePercentage),
        }}
      />
    </div>
  );
}
