"use client";

import { Asset } from "@/types/asset.types";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, getRowBackgroundColor } from "@/lib/utils";
import Link from "next/link";

interface AssetTableProps {
  assets: Asset[];
  locations: Array<{ id: string; name: string }>;
}

export function AssetTable({ assets, locations }: AssetTableProps) {
  const getLocationName = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location?.name || locationId;
  };

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-[#1B1F28] rounded-lg border border-gray-200 dark:border-[#2D3340]">
        <div className="text-6xl mb-4">🧯</div>
        <p className="text-gray-600 dark:text-[#E4E6EB]">No assets found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-[#1B1F28] rounded-lg shadow dark:shadow-none border border-gray-200 dark:border-[#2D3340]">
      <table className="min-w-full">
        <thead className="bg-gray-100 dark:bg-[#2D3340] border-b border-gray-200 dark:border-[#3B3F50]">
          <tr>
            {[
              "Ref #",
              "Type",
              "Location",
              "Class",
              "Visual Insp.",
              "Official Insp.",
              "Status",
              "Actions",
            ].map((th) => (
              <th
                key={th}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-[#E4E6EB] uppercase tracking-wider"
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-[#3B3F50]">
          {assets.map((asset) => {
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-[#E4E6EB]">
                  {asset.referenceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                  {asset.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                  {getLocationName(asset.locationId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                  {asset.class}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                  {formatDate(asset.visualInspectionNext)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-[#E4E6EB]">
                  {formatDate(asset.officialInspectionNext)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge
                    status={asset.status}
                    daysRemaining={asset.daysRemaining}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/assets/${asset.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
