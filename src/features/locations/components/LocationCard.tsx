"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Location } from "@/types/location.types";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface LocationCardProps {
  location: Location;
  assetCount?: number;
  onEdit: (location: Location) => void;
  onDelete: (locationId: string) => Promise<void>;
}

export function LocationCard({
  location,
  assetCount = 0,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(location.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete location:", error);
      // Error handling - you might want to show a toast notification here
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        className="
          bg-white dark:bg-[#1B1F28]
          border border-[#E5E7EB] dark:border-[#2D3340]
          rounded-xl shadow-lg dark:shadow-none
          p-4 sm:p-5 lg:p-6
          transition-all duration-300
          hover:shadow-xl hover:scale-[1.02]
        "
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] truncate">
              {location.name}
            </h3>

            {location.description && (
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1 line-clamp-2">
                {location.description}
              </p>
            )}
          </div>
        </div>

        {/* Actions + Assets count */}
        <div className="flex justify-between items-center mt-4 sm:mt-5 pt-4 border-t border-[#E5E7EB] dark:border-[#2D3340]">
          {/* Display assets count */}
          <div
            className="
              text-xs sm:text-sm font-medium text-[#111827] dark:text-[#E4E6EB]
              px-2.5 py-1.5 bg-gray-100 dark:bg-[#2D3340] rounded-md
              flex items-center gap-1.5
            "
          >
            <span className="text-[#6B7280] dark:text-[#9CA3AF]">Assets:</span>
            <span className="font-semibold">{assetCount}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => onEdit(location)}
              className="
                cursor-pointer
                p-2 sm:p-2.5 rounded-md
                text-[#6B7280] dark:text-[#9CA3AF]
                hover:bg-gray-100 dark:hover:bg-[#2D3340]
                hover:text-[#111827] dark:hover:text-[#E4E6EB]
                transition-all
                active:scale-95
              "
              aria-label="Edit location"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="
                cursor-pointer
                p-2 sm:p-2.5 rounded-md
                text-red-500 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-500/10
                hover:text-red-600 dark:hover:text-red-300
                transition-all
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
              aria-label="Delete location"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Delete Location?"
        description={
          assetCount > 0
            ? `This location has ${assetCount} asset${assetCount !== 1 ? "s" : ""}. All assets assigned to this location will need to be reassigned. This action cannot be undone.`
            : "This action cannot be undone. This location will be permanently deleted."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </>
  );
}
