"use client";

import { useLocations } from "@/features/locations/hooks/useLocations";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function LocationsPage() {
  const { data: locations = [], isLoading, error, refetch } = useLocations();

  if (isLoading) {
    return <LoadingSpinner message="Loading locations..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load locations."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-3">
            <span className="text-4xl">📍</span>
            Locations
          </h2>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Manage asset locations
          </p>
        </div>

        {/* Empty State */}
        {locations.length === 0 && (
          <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-16 text-center">
            <div className="text-7xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-[#111827] dark:text-[#E4E6EB] mb-2">
              No locations yet
            </h3>
            <p className="text-[#6B7280] dark:text-[#9CA3AF]">
              Locations will appear here once added.
            </p>
          </div>
        )}

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="
                bg-white dark:bg-[#1B1F28]
                border border-[#E5E7EB] dark:border-[#2D3340]
                rounded-lg shadow-lg dark:shadow-none
                p-6 transition-all duration-300
                hover:shadow-xl hover:scale-[1.02]
              "
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">📍</div>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
