"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function LocationModal({
  open,
  onClose,
  children,
}: LocationModalProps) {
  // Prevent body scroll when modal is open
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
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div
        className="
          relative w-full sm:max-w-lg
          bg-white dark:bg-[#1B1F28]
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          max-h-[90vh] sm:max-h-[85vh]
          overflow-hidden
          transform transition-all
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-[#1B1F28] border-b border-[#E5E7EB] dark:border-[#2D3340] px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB]">
              Location Details
            </h2>
            <button
              onClick={onClose}
              className="
                p-2 rounded-lg
                text-[#6B7280] dark:text-[#9CA3AF]
                hover:bg-gray-100 dark:hover:bg-[#2D3340]
                hover:text-[#111827] dark:hover:text-[#E4E6EB]
                transition-all
                active:scale-95
              "
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(85vh-80px)] px-4 sm:px-6 py-4 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
