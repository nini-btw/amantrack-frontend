import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Location } from "@/types/location.types";

interface LocationCardProps {
  location: Location;
  assetCount?: number; // NEW: number of assets in this location
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
}

export function LocationCard({
  location,
  assetCount = 0,
  onEdit,
  onDelete,
}: LocationCardProps) {
  return (
    <div
      className="
        bg-white dark:bg-[#1B1F28]
        border border-[#E5E7EB] dark:border-[#2D3340]
        rounded-xl shadow-lg dark:shadow-none
        p-6 transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
      "
    >
      <div className="flex items-start gap-4">
        <MapPin className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
            {location.name}
          </h3>

          {location.description && (
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              {location.description}
            </p>
          )}
        </div>
      </div>

      {/* Actions + Assets count */}
      <div className="flex justify-between items-center mt-4">
        {/* Display assets count */}
        <div
          className="
            text-sm font-medium text-[#111827] dark:text-[#E4E6EB]
            px-2 py-1 bg-gray-100 dark:bg-[#2D3340] rounded-md
          "
        >
          Assets: {assetCount}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(location)}
            className="
              cursor-pointer
              p-2 rounded-md
              text-[#6B7280] dark:text-[#9CA3AF]
              hover:bg-gray-100 dark:hover:bg-[#2D3340]
              transition
            "
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(location)}
            className="
              cursor-pointer
              p-2 rounded-md
              text-red-500
              hover:bg-red-50 dark:hover:bg-red-500/10
              transition
            "
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
