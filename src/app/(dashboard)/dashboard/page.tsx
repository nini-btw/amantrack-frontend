"use client";

import { useAssets } from "@/features/assets/hooks/useAssets";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StatsGrid } from "@/components/dashboard//StatesGrid";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AssetList } from "@/components/dashboard/AssetList";
import { AlertTriangle, Clock, Plus, Sparkles, Package } from "lucide-react";

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
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Cards */}
      <StatsGrid statistics={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Attention */}
        <AssetList
          title="Needs Attention"
          icon={AlertTriangle}
          assets={needsAttention}
          variant="attention"
          emptyState={{
            icon: "✓",
            title: "All Clear!",
            description: "All assets are in good standing",
          }}
        />

        {/* Recent Assets */}
        <AssetList
          title="Recent Assets"
          icon={Clock}
          assets={recentAssets}
          variant="recent"
          showViewAll
          emptyState={{
            icon: Package,
            title: "No Assets Yet",
            description: "Get started by adding your first fire extinguisher",
            action: {
              text: "Add First Asset",
              href: "/assets/new",
              icon: Plus,
            },
          }}
        />
      </div>
    </div>
  );
}
