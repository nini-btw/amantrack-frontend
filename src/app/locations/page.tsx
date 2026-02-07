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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Locations</h2>
          <p className="text-gray-600 mt-1">Manage asset locations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">📍</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {location.name}
                </h3>
                {location.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {location.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
