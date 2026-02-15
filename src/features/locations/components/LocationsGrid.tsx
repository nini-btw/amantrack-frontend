"use client";

import { useTranslations } from "next-intl";
import { Location } from "@/types/location.types";
import { LocationCard } from "./LocationCard";

interface LocationsGridProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (locationId: string) => Promise<void>;
  assetCounts: Record<string, number>;
}

export function LocationsGrid({
  locations,
  onEdit,
  onDelete,
  assetCounts,
}: LocationsGridProps) {
  const t = useTranslations("dashboard.locations.grid.empty");

  if (locations.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="text-5xl sm:text-6xl lg:text-7xl mb-4">📍</div>
        <h3 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
          {t("title")}
        </h3>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto px-4">
          {t("description")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          assetCount={assetCounts[location.id] || 0}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
