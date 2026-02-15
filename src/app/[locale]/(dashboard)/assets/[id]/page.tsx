"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboard.assets.detail");
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

  const [editForm, setEditForm] = useState({
    type: "",
    locationId: "",
    class: "",
    weightKg: 0,
  });

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
    if (!isEditing) initializeEditForm();
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    initializeEditForm();
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
      alert(t("alerts.updateError"));
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAsset.mutateAsync(assetId);
      router.push("/assets");
    } catch (error) {
      alert(t("alerts.deleteError"));
    }
  };

  if (isLoading) return <LoadingSpinner message={t("loading")} />;

  if (error || !asset) {
    return <ErrorMessage message={t("error")} onRetry={() => refetch()} />;
  }

  const location = locations.find((loc) => loc.id === asset.locationId);

  const inputClass = `w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#0D1117] border-2 border-[#E5E7EB] dark:border-[#2D3340] text-[#111827] dark:text-[#E4E6EB] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all`;
  const labelClass =
    "text-sm font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-2 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40">
                <Package className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] break-all">
                  {asset.referenceNumber}
                </h1>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                  {t("title")}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 
    bg-blue-600 text-white rounded-lg font-medium transition-all duration-200
    hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md"
                  >
                    <Edit3 className="w-4 h-4" /> {t("edit")}
                  </button>

                  <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 
    bg-red-600 text-white rounded-lg font-medium transition-all duration-200
    hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md"
                  >
                    <Trash2 className="w-4 h-4" /> {t("delete")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveEdit}
                    disabled={updateAsset.isPending}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />{" "}
                    {updateAsset.isPending ? t("saving") : t("save")}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={updateAsset.isPending}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" /> {t("cancel")}
                  </button>
                </>
              )}
              <Link
                href="/assets"
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 
  bg-white dark:bg-[#1B1F28] 
  border-2 border-[#E5E7EB] dark:border-[#2D3340] 
  text-[#111827] dark:text-[#E4E6EB] 
  rounded-lg font-medium transition-colors
  hover:bg-gray-100 dark:hover:bg-[#232937]"
              >
                <ArrowLeft className="w-4 h-4" /> {t("back")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <StatusBadge
            status={asset.status}
            daysRemaining={asset.daysRemaining}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Asset Info Card */}
          <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg">
            <div className="px-5 py-4 border-b-2 border-[#E5E7EB] dark:border-[#2D3340] bg-gray-50 dark:bg-[#0F172A] rounded-t-lg">
              <h2 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <Package className="w-5 h-5" /> {t("fields.type")}
                {isEditing && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                    {t("editing")}
                  </span>
                )}
              </h2>
            </div>

            <div className="p-5 space-y-4">
              {!isEditing ? (
                <>
                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" /> {t("fields.id")}
                    </p>
                    <p className="font-mono text-[#111827] dark:text-[#E4E6EB]">
                      {asset.id}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" /> {t("fields.reference")}
                    </p>
                    <p className="text-[#111827] dark:text-[#E4E6EB]">
                      {asset.referenceNumber}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <Package className="w-4 h-4" /> {t("fields.type")}
                    </p>
                    <p className="text-[#111827] dark:text-[#E4E6EB]">
                      {asset.type}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <MapPin className="w-4 h-4" /> {t("fields.location")}
                    </p>
                    <p className="text-[#111827] dark:text-[#E4E6EB]">
                      {location?.name || asset.locationId}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <Tag className="w-4 h-4" /> {t("fields.class")}
                    </p>
                    <p className="text-[#111827] dark:text-[#E4E6EB]">
                      {asset.class}
                    </p>
                  </div>
                  <div>
                    <p className={labelClass}>
                      <Weight className="w-4 h-4" /> {t("fields.weight")}
                    </p>
                    <p className="text-[#111827] dark:text-[#E4E6EB]">
                      {asset.weightKg} {t("fields.weightUnit")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={labelClass}>
                      <Tag className="w-4 h-4" /> {t("fields.reference")}
                    </label>
                    <p className="text-[#6B7280]">
                      {asset.referenceNumber}{" "}
                      <span className="text-xs">
                        {t("fields.immutableNote")}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Package className="w-4 h-4" /> {t("fields.type")}
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
                      <MapPin className="w-4 h-4" /> {t("fields.location")}
                    </label>
                    <select
                      value={editForm.locationId}
                      onChange={(e) =>
                        setEditForm({ ...editForm, locationId: e.target.value })
                      }
                      className={inputClass}
                    >
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Class and Weight Inputs (Localize placeholders if needed) */}
                  <div>
                    <label className={labelClass}>
                      <Tag className="w-4 h-4" /> {t("fields.class")}
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
                      <Weight className="w-4 h-4" /> {t("fields.weight")} (
                      {t("fields.weightUnit")})
                    </label>
                    <input
                      type="number"
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

          {/* Inspections Summary Card */}
          <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg">
            <div className="px-5 py-4 border-b-2 border-[#E5E7EB] dark:border-[#2D3340] bg-gray-50 dark:bg-[#0F172A] rounded-t-lg">
              <h2 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
                <Calendar className="w-5 h-5" /> {t("inspections.title")}
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                {
                  label: t("inspections.visual"),
                  date: asset.visualInspectionDate,
                  next: asset.visualInspectionNext,
                  color: "blue",
                },
                {
                  label: t("inspections.official"),
                  date: asset.officialInspectionDate,
                  next: asset.officialInspectionNext,
                  color: "purple",
                },
              ].map((item) => (
                <div
                  key={item.color}
                  className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 border-2 border-${item.color}-200 dark:border-${item.color}-800 rounded-lg`}
                >
                  <h3
                    className={`font-semibold text-${item.color}-900 dark:text-${item.color}-200 mb-3 flex items-center gap-2`}
                  >
                    <Calendar className="w-4 h-4" /> {item.label}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t("inspections.last")}</span>
                      <span className="font-medium">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("inspections.next")}</span>
                      <span className="font-medium">
                        {formatDate(item.next)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log Inspection Button/Form */}
          <div className="lg:col-span-2">
            {!showInspectionForm ? (
              <button
                onClick={() => setShowInspectionForm(true)}
                disabled={isEditing}
                className="cursor-pointer w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md disabled:opacity-50"
              >
                {t("inspections.logButton")}
              </button>
            ) : (
              <div className="bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
                    {t("inspections.logTitle")}
                  </h2>
                  <button
                    onClick={() => setShowInspectionForm(false)}
                    className="cursor-pointer p-2 text-[#6B7280] hover:bg-gray-100 rounded-lg transition-colors"
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

      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        title={t("deleteDialog.title")}
        description={t("deleteDialog.description", {
          ref: asset.referenceNumber,
        })}
        confirmText={t("deleteDialog.confirm")}
        cancelText={t("cancel")}
        variant="danger"
        loading={deleteAsset.isPending}
      />
    </div>
  );
}
