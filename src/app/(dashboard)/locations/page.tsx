"use client";

import { useState } from "react";
import { LocationsHeader } from "@/features/locations/components/LocationsHeader";
import { LocationsGrid } from "@/features/locations/components/LocationsGrid";
import LocationModal from "@/features/locations/components/LocationModal";
import LocationForm from "@/features/locations/components/LocationForm";
import {
  useLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
} from "@/features/locations/hooks/useLocations";
import { Location } from "@/types/location.types";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function LocationsPage() {
  const { data: locations = [], isLoading } = useLocations();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // Calculate asset counts
  const assetCounts = locations.reduce<Record<string, number>>((acc, loc) => {
    acc[loc.id] = statistics?.byLocation[loc.name] || 0;
    return acc;
  }, {});

  // Open modal for creating a new location
  const handleAdd = () => {
    setEditingLocation(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing location
  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setModalOpen(true);
  };

  // Handle delete - now async and takes locationId string
  const handleDelete = async (locationId: string): Promise<void> => {
    try {
      await deleteLocationMutation.mutateAsync(locationId);
      // Optional: Show success toast
      console.log("Location deleted successfully");
    } catch (error) {
      console.error("Failed to delete location:", error);
      // Optional: Show error toast
      throw error; // Re-throw so LocationCard can handle it
    }
  };

  // Submit handler for add/edit form
  const handleSubmit = (data: { name: string; description?: string }) => {
    if (editingLocation) {
      updateLocation.mutate({
        id: editingLocation.id,
        data,
      });
    } else {
      createLocation.mutate(data);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <LocationsHeader onAdd={handleAdd} />

        {isLoading ? (
          <LoadingSpinner message="Loading Locations..." />
        ) : (
          <LocationsGrid
            locations={locations}
            onEdit={handleEdit}
            onDelete={handleDelete}
            assetCounts={assetCounts}
          />
        )}

        {/* Add/Edit Location Modal */}
        <LocationModal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <LocationForm
            initialName={editingLocation?.name}
            initialDescription={editingLocation?.description}
            onSubmit={handleSubmit}
          />
        </LocationModal>
      </div>
    </div>
  );
}
