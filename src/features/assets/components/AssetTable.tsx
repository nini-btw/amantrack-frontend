"use client";

import { useState } from "react";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";
import { Eye, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Asset } from "@/types/asset.types";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, getRowBackgroundColor } from "@/lib/utils";
import { useDeleteAsset } from "@/features/assets/hooks/useAssets";
import { useAssetTranslations } from "@/lib/translations";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface AssetTableProps {
  assets: Asset[];
  locations: Array<{ id: string; name: string }>;
}

type SortField =
  | "referenceNumber"
  | "type"
  | "locationId"
  | "class"
  | "visualInspectionNext"
  | "officialInspectionNext"
  | "status";
type SortDirection = "asc" | "desc" | null;

export function AssetTable({ assets, locations }: AssetTableProps) {
  const t = useTranslations("dashboard.assets");

  // Use centralized translation hook
  const { translateType, translateClass } = useAssetTranslations();

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);

  const deleteAsset = useDeleteAsset();

  const getLocationName = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location?.name || locationId;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeleteClick = (asset: Asset) => {
    setAssetToDelete(asset);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!assetToDelete) return;
    try {
      await deleteAsset.mutateAsync(assetToDelete.id);
      setDeleteDialogOpen(false);
      setAssetToDelete(null);
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAssetToDelete(null);
  };

  // Sort logic
  let sortedAssets = [...assets];
  if (sortField && sortDirection) {
    sortedAssets.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "locationId") {
        aValue = getLocationName(a.locationId);
        bValue = getLocationName(b.locationId);
      }

      if (
        sortField === "visualInspectionNext" ||
        sortField === "officialInspectionNext"
      ) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortField === "status") {
        const statusOrder = { RED: 0, YELLOW: 1, GREEN: 2 };
        aValue = statusOrder[aValue as keyof typeof statusOrder];
        bValue = statusOrder[bValue as keyof typeof statusOrder];
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-gray-600" />
      );
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    );
  };

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-[#1B1F28] rounded-lg border border-gray-200 dark:border-[#2D3340]">
        <div className="text-6xl mb-4">🧯</div>
        <p className="text-gray-600 dark:text-[#E4E6EB]">
          {t("table.noAssets")}
        </p>
      </div>
    );
  }

  const tableHeaders = [
    { label: t("table.headers.ref"), field: "referenceNumber" as SortField },
    { label: t("table.headers.type"), field: "type" as SortField },
    { label: t("table.headers.location"), field: "locationId" as SortField },
    { label: t("table.headers.class"), field: "class" as SortField },
    {
      label: t("table.headers.visual"),
      field: "visualInspectionNext" as SortField,
    },
    {
      label: t("table.headers.official"),
      field: "officialInspectionNext" as SortField,
    },
    { label: t("table.headers.status"), field: "status" as SortField },
  ];

  return (
    <>
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {sortedAssets.map((asset) => {
          const lightBg = getRowBackgroundColor(asset.status);
          const darkBg =
            asset.status === "RED"
              ? "dark:bg-red-900/20"
              : asset.status === "YELLOW"
                ? "dark:bg-yellow-900/20"
                : "";

          return (
            <div
              key={asset.id}
              className={`bg-white dark:bg-[#1B1F28] border-2 border-[#E5E7EB] dark:border-[#2D3340] rounded-lg p-4 ${lightBg} ${darkBg}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-[#111827] dark:text-[#E4E6EB]">
                  {asset.referenceNumber}
                </h3>
                <StatusBadge
                  status={asset.status}
                  daysRemaining={asset.daysRemaining}
                />
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                    {t("table.headers.type")}:
                  </span>
                  <span className="font-medium text-[#111827] dark:text-[#E4E6EB]">
                    {translateType(asset.type)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                    {t("table.headers.location")}:
                  </span>
                  <span className="font-medium text-[#111827] dark:text-[#E4E6EB]">
                    {getLocationName(asset.locationId)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                    {t("table.headers.class")}:
                  </span>
                  <span className="font-medium text-[#111827] dark:text-[#E4E6EB]">
                    {translateClass(asset.class)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                    {t("table.mobileLabels.visual")}
                  </span>
                  <span className="font-medium text-[#111827] dark:text-[#E4E6EB]">
                    {formatDate(asset.visualInspectionNext)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280] dark:text-[#9CA3AF]">
                    {t("table.mobileLabels.official")}
                  </span>
                  <span className="font-medium text-[#111827] dark:text-[#E4E6EB]">
                    {formatDate(asset.officialInspectionNext)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#2D3340]">
                <Link
                  href={`/assets/${asset.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  {t("table.mobileLabels.view")}
                </Link>
                <button
                  onClick={() => handleDeleteClick(asset)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-white dark:bg-[#1B1F28] rounded-lg border border-gray-200 dark:border-[#2D3340]">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-[#2D3340] border-b border-gray-200 dark:border-[#3B3F50]">
            <tr>
              {tableHeaders.map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-[#E4E6EB] uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3B3F50] transition-colors select-none"
                >
                  <div className="flex items-center gap-2">
                    {label}
                    <SortIcon field={field} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-[#E4E6EB] uppercase tracking-wider">
                {t("table.headers.actions")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-[#3B3F50]">
            {sortedAssets.map((asset) => {
              const lightBg = getRowBackgroundColor(asset.status);
              const darkBg =
                asset.status === "RED"
                  ? "dark:bg-red-900/20"
                  : asset.status === "YELLOW"
                    ? "dark:bg-yellow-900/20"
                    : "";

              return (
                <tr
                  key={asset.id}
                  className={`transition-colors hover:bg-gray-50 dark:hover:bg-[#2D3340] ${lightBg} ${darkBg}`}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-[#E4E6EB]">
                    {asset.referenceNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                    {translateType(asset.type)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                    {getLocationName(asset.locationId)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                    {translateClass(asset.class)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                    {formatDate(asset.visualInspectionNext)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                    {formatDate(asset.officialInspectionNext)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={asset.status}
                      daysRemaining={asset.daysRemaining}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/assets/${asset.id}`}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(asset)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title={t("deleteDialog.title")}
        description={`Are you sure you want to delete "${assetToDelete?.referenceNumber}"? This action cannot be undone.`}
        confirmText={t("deleteDialog.confirm")}
        cancelText={t("deleteDialog.cancel")}
        variant="danger"
        loading={deleteAsset.isPending}
      />
    </>
  );
}
