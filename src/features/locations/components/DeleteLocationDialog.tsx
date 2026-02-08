"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface DeleteLocationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteLocationDialog({
  open,
  onConfirm,
  onCancel,
}: DeleteLocationDialogProps) {
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Dialog */}
      <div
        className="
          relative w-full sm:max-w-md
          bg-white dark:bg-[#1B1F28]
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          transform transition-all
          p-5 sm:p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
            Delete Location?
          </h3>
          <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF]">
            This action cannot be undone. All assets assigned to this location
            will need to be reassigned.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="
              flex-1
              px-4 py-2.5 sm:py-3
              rounded-lg
              border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-[#0D1117]
              text-[#111827] dark:text-[#E4E6EB]
              font-medium
              text-sm sm:text-base
              hover:bg-gray-50 dark:hover:bg-[#2D3340]
              transition-all
              active:scale-95
              cursor-pointer
            "
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="
              flex-1
              px-4 py-2.5 sm:py-3
              rounded-lg
              bg-red-600 hover:bg-red-700
              dark:bg-red-600 dark:hover:bg-red-700
              text-white
              font-medium
              text-sm sm:text-base
              transition-all
              active:scale-95
              cursor-pointer
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
