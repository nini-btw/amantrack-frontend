"use client";

import { MapPin, Plus } from "lucide-react";

interface LocationsHeaderProps {
  onAdd: () => void;
}

export function LocationsHeader({ onAdd }: LocationsHeaderProps) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400 shrink-0" />
          <span className="leading-tight">Locations</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Manage asset locations and facilities
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
          cursor-pointer
          inline-flex items-center justify-center gap-2
          px-4 sm:px-6 py-2.5 sm:py-3
          bg-green-600 hover:bg-green-700
          dark:bg-green-600 dark:hover:bg-green-700
          text-white font-semibold text-sm sm:text-base
          rounded-lg
          shadow-md hover:shadow-lg
          transition-all duration-200
          w-full sm:w-auto
          active:scale-[0.98]
        "
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>Add Location</span>
      </button>
    </div>
  );
}
