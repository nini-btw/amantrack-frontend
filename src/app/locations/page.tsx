"use client";

import { useState } from "react";
import { LocationsHeader } from "@/features/locations/components/LocationsHeader";
import { LocationsGrid } from "@/features/locations/components/LocationsGrid";
import LocationModal from "@/features/locations/components/LocationModal";
import DeleteLocationDialog from "@/features/locations/components/DeleteLocationDialog";
import LocationForm from "@/features/locations/components/LocationForm";
import {
  useLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
} from "@/features/locations/hooks/useLocations";
import { Location } from "@/types/location.types";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";

export default function LocationsPage() {
  const { data: locations = [], isLoading } = useLocations();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deletingLocation, setDeletingLocation] = useState<Location | null>(
    null,
  );
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

  // Open delete confirmation dialog
  const handleDelete = (location: Location) => {
    setDeletingLocation(location);
  };

  /// Submit handler for add/edit form
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

  // Confirm delete
  const confirmDelete = () => {
    if (deletingLocation) {
      deleteLocation.mutate(deletingLocation.id);
      setDeletingLocation(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <LocationsHeader onAdd={handleAdd} />

      {isLoading ? (
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Loading locations...
        </p>
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

      {/* Delete Confirmation Dialog */}
      <DeleteLocationDialog
        open={!!deletingLocation}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingLocation(null)}
      />
    </div>
  );
}
