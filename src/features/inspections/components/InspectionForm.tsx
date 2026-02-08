"use client";

import { useState } from "react";
import { useLogInspection } from "../hooks/useInspections";
import { InspectionType } from "@/types/asset.types";

interface InspectionFormProps {
  assetId: string;
  onSuccess: () => void;
}

export function InspectionForm({ assetId, onSuccess }: InspectionFormProps) {
  const logInspection = useLogInspection();

  const [formData, setFormData] = useState({
    type: "VISUAL" as InspectionType,
    inspectionDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await logInspection.mutateAsync({
        assetId,
        type: formData.type,
        inspectionDate: new Date(formData.inspectionDate).toISOString(),
        notes: formData.notes || undefined,
      });

      onSuccess();
      alert("Inspection logged successfully!");
    } catch (error) {
      console.error("Failed to log inspection:", error);
      alert("Failed to log inspection. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-[#1B1F28] p-6 rounded-lg border border-gray-200 dark:border-[#2D3340]"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-[#E4E6EB] mb-4">
        Log Inspection
      </h3>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#9CA3AF] mb-2">
          Inspection Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as InspectionType })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#3B3F4B] rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#2D3340] dark:text-[#E4E6EB]"
        >
          <option value="VISUAL">Visual Inspection (VISUAL)</option>
          <option value="OFFICIAL">Official Inspection (Yearly)</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#9CA3AF] mb-2">
          Inspection Date *
        </label>
        <input
          type="date"
          required
          value={formData.inspectionDate}
          onChange={(e) =>
            setFormData({ ...formData, inspectionDate: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#3B3F4B] rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#2D3340] dark:text-[#E4E6EB]"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#9CA3AF] mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-[#3B3F4B] rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#2D3340] dark:text-[#E4E6EB]"
          placeholder="Any additional notes..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={logInspection.isPending}
        className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
      >
        {logInspection.isPending ? "Logging..." : "Log Inspection"}
      </button>
    </form>
  );
}
