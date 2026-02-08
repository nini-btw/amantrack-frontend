import { MapPin, Plus } from "lucide-react";

interface LocationsHeaderProps {
  onAdd: () => void;
}

export function LocationsHeader({ onAdd }: LocationsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
          <MapPin className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          Locations
        </h2>

        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Manage asset locations
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
                    cursor-pointer

          inline-flex items-center gap-2
          px-4 py-2 rounded-lg
          bg-indigo-600 hover:bg-indigo-700
          text-white font-medium
          transition-colors
        "
      >
        <Plus className="w-4 h-4" />
        Add Location
      </button>
    </div>
  );
}
