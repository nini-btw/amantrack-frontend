"use client";

import { MapPin, X } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
};

export default function LocationModal({
  open,
  onClose,
  children,
  title = "Add Location",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0D1117] rounded-xl w-105 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          </div>

          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>

        {/* Body / Children */}
        <div className="p-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}
