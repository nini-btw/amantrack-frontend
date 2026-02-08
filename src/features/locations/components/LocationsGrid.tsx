import { MapPin } from "lucide-react";
import { Location } from "@/types/location.types";
import { LocationCard } from "./LocationCard";

interface LocationsGridProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
  assetCounts?: Record<string, number>;
}

export function LocationsGrid({
  locations,
  onEdit,
  onDelete,
  assetCounts = {},
}: LocationsGridProps) {
  if (locations.length === 0) {
    return <EmptyLocationsState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          onEdit={onEdit}
          onDelete={onDelete}
          assetCount={assetCounts[location.id] || 0} // <-- show count
        />
      ))}
    </div>
  );
}

function EmptyLocationsState() {
  return (
    <div
      className="
        bg-white dark:bg-[#1B1F28]
        border border-[#E5E7EB] dark:border-[#2D3340]
        rounded-xl shadow-lg dark:shadow-none
        p-16 text-center
      "
    >
      <MapPin className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />

      <h3 className="text-2xl font-bold text-[#111827] dark:text-[#E4E6EB] mb-2">
        No locations yet
      </h3>

      <p className="text-[#6B7280] dark:text-[#9CA3AF]">
        Locations will appear here once added.
      </p>
    </div>
  );
}
