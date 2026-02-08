"use client";

import { Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteLocationDialog({
  open,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#0D1117] rounded-xl p-6 w-90 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Delete location?
        </h3>

        <p className="text-sm text-gray-500">This action cannot be undone.</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 text-sm rounded-lg border dark:border-gray-700 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-red-600 text-white cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
