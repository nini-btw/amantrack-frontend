"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAsset, useDeleteAsset } from "@/features/assets/hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { InspectionForm } from "@/features/inspections/components/InspectionForm";
import { StatusBadge } from "@/components/StatusBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { formatDate } from "@/lib/utils";

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assetId = params.id as string;

  const { data: asset, isLoading, error, refetch } = useAsset(assetId);
  const { data: locations = [] } = useLocations();
  const deleteAsset = useDeleteAsset();

  const [showInspectionForm, setShowInspectionForm] = useState(false);

  if (isLoading) {
    return <LoadingSpinner message="Loading asset details..." />;
  }

  if (error || !asset) {
    return (
      <ErrorMessage
        message="Failed to load asset details. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const location = locations.find((loc) => loc.id === asset.locationId);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      await deleteAsset.mutateAsync(assetId);
      router.push("/assets");
    } catch (error) {
      alert("Failed to delete asset. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121519] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-[#E4E6EB] flex items-center gap-3">
            <span className="text-4xl">🧯</span>
            {asset.referenceNumber}
          </h1>
          <div className="flex gap-3">
            <Link
              href="/assets"
              className="px-4 py-2 bg-gray-200 dark:bg-[#2D3340] text-gray-700 dark:text-[#E4E6EB] rounded-lg hover:bg-gray-300 dark:hover:bg-[#3B3F4B] transition-colors"
            >
              ← Back to List
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleteAsset.isPending}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
            >
              {deleteAsset.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-8">
          <StatusBadge
            status={asset.status}
            daysRemaining={asset.daysRemaining}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Details */}
          <div className="bg-white dark:bg-[#1B1F28] border border-gray-200 dark:border-[#2D3340] p-6 rounded-lg shadow-sm dark:shadow-none">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-[#E4E6EB] mb-4">
              Asset Details
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-[#9CA3AF]">
                  Reference Number:
                </span>
                <p className="text-lg text-gray-900 dark:text-[#F3F4F6]">
                  {asset.referenceNumber}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-[#9CA3AF]">
                  Type:
                </span>
                <p className="text-lg text-gray-900 dark:text-[#F3F4F6]">
                  {asset.type}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-[#9CA3AF]">
                  Location:
                </span>
                <p className="text-lg text-gray-900 dark:text-[#F3F4F6]">
                  {location?.name || asset.locationId}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-[#9CA3AF]">
                  Class:
                </span>
                <p className="text-lg text-gray-900 dark:text-[#F3F4F6]">
                  {asset.class}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-[#9CA3AF]">
                  Weight:
                </span>
                <p className="text-lg text-gray-900 dark:text-[#F3F4F6]">
                  {asset.weightKg} kg
                </p>
              </div>
            </div>
          </div>

          {/* Inspection Details */}
          <div className="bg-white dark:bg-[#1B1F28] border border-gray-200 dark:border-[#2D3340] p-6 rounded-lg shadow-sm dark:shadow-none">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-[#E4E6EB] mb-4">
              Inspection Details
            </h2>
            <div className="space-y-4">
              {/* Visual Inspection */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Visual Inspection
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-100">
                  <p>Last: {formatDate(asset.visualInspectionDate)}</p>
                  <p>Next: {formatDate(asset.visualInspectionNext)}</p>
                </div>
              </div>

              {/* Official Inspection */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  Official Inspection
                </h3>
                <div className="text-sm text-purple-800 dark:text-purple-100">
                  <p>Last: {formatDate(asset.officialInspectionDate)}</p>
                  <p>Next: {formatDate(asset.officialInspectionNext)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Log Inspection */}
          <div className="lg:col-span-2">
            {!showInspectionForm ? (
              <button
                onClick={() => setShowInspectionForm(true)}
                className="w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                + Log Inspection
              </button>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-[#E4E6EB]">
                    Log New Inspection
                  </h2>
                  <button
                    onClick={() => setShowInspectionForm(false)}
                    className="text-gray-600 dark:text-[#9CA3AF] hover:text-gray-800 dark:hover:text-[#F3F4F6]"
                  >
                    ✕ Cancel
                  </button>
                </div>
                <InspectionForm
                  assetId={assetId}
                  onSuccess={() => {
                    setShowInspectionForm(false);
                    refetch();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
