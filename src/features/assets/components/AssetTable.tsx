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
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <div className="text-6xl mb-4">🧯</div>
        <p className="text-gray-600">No assets found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Ref #
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Visual Insp.
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Official Insp.
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className={`hover:bg-gray-50 transition-colors ${getRowBackgroundColor(asset.status)}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {asset.referenceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {asset.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {getLocationName(asset.locationId)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {asset.class}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(asset.visualInspectionNext)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
