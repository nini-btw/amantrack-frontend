import { MapPin, Plus } from "lucide-react";

interface LocationsHeaderProps {
  onAdd: () => void;
}

export function LocationsHeader({ onAdd }: LocationsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400 shrink-0" />
          <span>Locations</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Manage asset locations
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
          cursor-pointer
          inline-flex items-center justify-center gap-2
          px-4 py-2.5 sm:py-2 rounded-lg
          bg-green-600 hover:bg-green-700
          dark:bg-green-600 dark:hover:bg-green-700
          text-white font-medium text-sm sm:text-base
          transition-colors
          w-full sm:w-auto
          active:scale-95
        "
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        Add Location
      </button>
    </div>
  );
}
