"use client";

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
  const needsAttentionCount =
    (statistics.byStatus.YELLOW || 0) + (statistics.byStatus.RED || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {/* Total Assets */}
      <StatCard
        title="Total Assets"
        value={statistics.total}
        icon={Archive}
        color="blue"
        href="/assets"
        subtitle={`${statistics.valid} valid`}
        progress={{
          value:
            statistics.total > 0
              ? Math.round((statistics.valid / statistics.total) * 100)
              : 0,
        }}
      />

      {/* Valid Assets */}
      <StatCard
        title="Valid"
        value={statistics.valid}
        icon={CheckCircle2}
        color="green"
        subtitle={`${statistics.total > 0 ? Math.round((statistics.valid / statistics.total) * 100) : 0}% of total`}
        badge={{
          text: "Good",
          variant: "success",
        }}
      />

      {/* Needs Attention */}
      <StatCard
        title="Needs Attention"
        value={needsAttentionCount}
        icon={AlertTriangle}
        color="yellow"
        breakdown={[
          {
            label: "Warning",
            value: statistics.byStatus.YELLOW || 0,
            color: "text-yellow-600 dark:text-yellow-400",
          },
          {
            label: "Expired",
            value: statistics.byStatus.RED || 0,
            color: "text-red-600 dark:text-red-400",
          },
        ]}
      />

      {/* Compliance */}
      <StatCard
        title="Compliance"
        value={`${statistics.compliancePercentage}%`}
        icon={PieChart}
        color="purple"
        progress={{
          value: statistics.compliancePercentage,
          label:
            statistics.compliancePercentage >= 90
              ? "Excellent"
              : statistics.compliancePercentage >= 70
                ? "Good"
                : "Needs Work",
        }}
      />
    </div>
  );
}
