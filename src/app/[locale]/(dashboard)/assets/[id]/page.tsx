"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Edit3,
  Save,
  X,
  Calendar,
  MapPin,
  Package,
  Weight,
  Tag,
} from "lucide-react";
import {
  useAsset,
  useDeleteAsset,
  useUpdateAsset,
} from "@/features/assets/hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { InspectionForm } from "@/features/inspections/components/InspectionForm";
import { StatusBadge } from "@/components/StatusBadge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { formatDate } from "@/lib/utils";
import { ASSET_TYPES, ASSET_CLASSES } from "@/config/constants";

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assetId = params.id as string;

  const { data: asset, isLoading, error, refetch } = useAsset(assetId);
  const { data: locations = [] } = useLocations();
  const deleteAsset = useDeleteAsset();
  const updateAsset = useUpdateAsset();

  const [isEditing, setIsEditing] = useState(false);
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    type: "",
    locationId: "",
    class: "",
    weightKg: 0,
  });

  // Initialize form when asset loads or editing starts
  const initializeEditForm = () => {
    if (asset) {
      setEditForm({
        type: asset.type,
        locationId: asset.locationId,
        class: asset.class,
        weightKg: asset.weightKg,
      });
    }
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      initializeEditForm();
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    initializeEditForm(); // Reset form to original values
  };

  const handleSaveEdit = async () => {
    if (!asset) return;

    try {
      await updateAsset.mutateAsync({
        id: assetId,
        data: {
          type: editForm.type,
          locationId: editForm.locationId,
          class: editForm.class,
          weightKg: Number(editForm.weightKg),
        },
      });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Failed to update asset:", error);
      alert("Failed to update asset. Please try again.");
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAsset.mutateAsync(assetId);
      router.push("/assets");
    } catch (error) {
      console.error("Failed to delete asset:", error);
      alert("Failed to delete asset. Please try again.");
    }
  };

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

  const inputClass = `
    w-full px-4 py-2.5 rounded-lg
    bg-white dark:bg-[#0D1117]
    border-2 border-[#E5E7EB] dark:border-[#2D3340]
    text-[#111827] dark:text-[#E4E6EB]
    placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280]
    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
    transition-all duration-200
  `;

  const labelClass =
    "text-sm font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-2 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Title Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40">
                <Package className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>

              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] break-all">
                  {asset.referenceNumber}
                </h1>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                  Asset Details
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={handleDeleteClick}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveEdit}
                    disabled={updateAsset.isPending}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {updateAsset.isPending ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    disabled={updateAsset.isPending}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}

              <Link
                href="/assets"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] text-[#111827] dark:text-[#E4E6EB] rounded-lg hover:bg-gray-50 dark:hover:bg-[#2A2E37] transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <StatusBadge
            status={asset.status}
            daysRemaining={asset.daysRemaining}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Asset Details Section */}
          <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="px-5 py-4 border-b-2 border-[#E5E7EB] dark:border-[#2D3340] bg-linear-to-r from-gray-50 to-gray-100 dark:from-[#0F172A] dark:to-[#1E293B] rounded-t-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <Package className="w-5 h-5" />
                Asset Details
                {isEditing && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full font-medium">
                    Editing
                  </span>
                )}
              </h2>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {!isEditing ? (
                <>
                  {/* View Mode */}
                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" />
                      Asset ID
                    </p>
                    <p className="text-sm sm:text-base font-mono text-[#111827] dark:text-[#E4E6EB] break-all">
                      {asset.id}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" />
                      Reference Number
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#E4E6EB]">
                      {asset.referenceNumber}
                    </p>
                  </div>

                  <div>
                    <p className={labelClass}>
                      <Package className="w-4 h-4" />
                      Type
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#E4E6EB]">
                      {asset.type}
                    </p>
                  </div>

                  <div>
                    <p className={labelClass}>
                      <MapPin className="w-4 h-4" />
                      Location
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#E4E6EB]">
                      {location?.name || asset.locationId}
                    </p>
                  </div>

                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" />
                      Class
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#E4E6EB]">
                      {asset.class}
                    </p>
                  </div>

                  <div>
                    <p className={labelClass}>
                      <Weight className="w-4 h-4" />
                      Weight
                    </p>
                    <p className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#E4E6EB]">
                      {asset.weightKg} kg
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Mode */}
                  <div>
                    <label className={labelClass}>
                      <Tag className="w-4 h-4" />
                      Reference Number
                    </label>
                    <p className="text-base sm:text-lg font-medium text-[#6B7280] dark:text-[#9CA3AF] px-4 py-2.5">
                      {asset.referenceNumber}
                      <span className="ml-2 text-xs">(Cannot be changed)</span>
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Package className="w-4 h-4" />
                      Type *
                    </label>
                    <select
                      value={editForm.type}
                      onChange={(e) =>
                        setEditForm({ ...editForm, type: e.target.value })
                      }
                      className={inputClass}
                    >
                      {ASSET_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <MapPin className="w-4 h-4" />
                      Location *
                    </label>
                    <select
                      value={editForm.locationId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, locationId: e.target.value })
                      }
                      className={inputClass}
                    >
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Tag className="w-4 h-4" />
                      Class *
                    </label>
                    <select
                      value={editForm.class}
                      onChange={(e) =>
                        setEditForm({ ...editForm, class: e.target.value })
                      }
                      className={inputClass}
                    >
                      {ASSET_CLASSES.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Weight className="w-4 h-4" />
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={editForm.weightKg}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          weightKg: Number(e.target.value),
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Inspection Details Section (Read-Only) */}
          <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none transition-colors">
            <div className="px-5 py-4 border-b-2 border-[#E5E7EB] dark:border-[#2D3340] bg-linear-to-r from-gray-50 to-gray-100 dark:from-[#0F172A] dark:to-[#1E293B] rounded-t-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Inspection Details
              </h2>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Visual Inspection */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Visual Inspection
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-800 dark:text-blue-100">
                      Last Inspection:
                    </span>
                    <span className="font-medium text-blue-900 dark:text-blue-50">
                      {formatDate(asset.visualInspectionDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800 dark:text-blue-100">
                      Next Due:
                    </span>
                    <span className="font-medium text-blue-900 dark:text-blue-50">
                      {formatDate(asset.visualInspectionNext)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Inspection */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg">
                <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Official Inspection
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-800 dark:text-purple-100">
                      Last Inspection:
                    </span>
                    <span className="font-medium text-purple-900 dark:text-purple-50">
                      {formatDate(asset.officialInspectionDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-800 dark:text-purple-100">
                      Next Due:
                    </span>
                    <span className="font-medium text-purple-900 dark:text-purple-50">
                      {formatDate(asset.officialInspectionNext)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Log Inspection Section */}
          <div className="lg:col-span-2">
            {!showInspectionForm ? (
              <button
                onClick={() => setShowInspectionForm(true)}
                disabled={isEditing}
                className="cursor-pointer w-full px-6 py-4 bg-green-600 dark:bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + Log New Inspection
              </button>
            ) : (
              <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB]">
                    Log New Inspection
                  </h2>
                  <button
                    onClick={() => setShowInspectionForm(false)}
                    className="p-2 text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#2D3340] rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        title="Delete Asset"
        description={`Are you sure you want to delete "${asset.referenceNumber}"? This action cannot be undone and will also delete all associated inspection records.`}
        confirmText="Delete Permanently"
        cancelText="Cancel"
        variant="danger"
        loading={deleteAsset.isPending}
      />
    </div>
  );
}
