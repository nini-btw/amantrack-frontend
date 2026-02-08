"use client";

import { useState } from "react";
import { X, Calendar, User, FileText, Tag, Save } from "lucide-react";
import { useLogInspection } from "@/features/inspections/hooks/useInspections";
import { InspectionType } from "@/types/asset.types";

interface CreateInspectionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateInspectionModal({
  onClose,
  onSuccess,
}: CreateInspectionModalProps) {
  const [assetId, setAssetId] = useState("");
  const [type, setType] = useState<InspectionType>("OFFICIAL");
  const [inspectionDate, setInspectionDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");

  const logInspection = useLogInspection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assetId.trim()) {
      alert("Please enter an Asset ID");
      return;
    }

    try {
      await logInspection.mutateAsync({
        assetId: assetId.trim(),
        type,
        inspectionDate,
        notes: notes.trim() || undefined,
      });
      onSuccess();
    } catch (error: any) {
      console.error("Failed to create inspection:", error);
      alert(error?.message || "Failed to create inspection. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="
          bg-white dark:bg-[#1B1F28]
          border border-[#E5E7EB] dark:border-[#2D3340]
          rounded-lg shadow-2xl
          w-full max-w-2xl
          max-h-[90vh]
          overflow-hidden
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB] dark:border-[#2D3340]">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-[#111827] dark:text-[#E4E6EB]">
              Log New Inspection
            </h2>
          </div>
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-[#6B7280] dark:text-[#9CA3AF]
              hover:bg-[#F6F7FA] dark:hover:bg-[#0D1117]
              transition-colors
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          <div className="space-y-5">
            {/* Asset ID */}
            <div>
              <label className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                Asset ID
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
                required
                className="
                  w-full px-4 py-2.5
                  bg-[#F6F7FA] dark:bg-[#0D1117]
                  border border-[#E5E7EB] dark:border-[#2D3340]
                  rounded-lg
                  text-[#111827] dark:text-[#E4E6EB]
                  placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  transition-colors
                "
              />
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                The unique identifier of the asset being inspected
              </p>
            </div>

            {/* Inspection Type */}
            <div>
              <label className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                Inspection Type
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["OFFICIAL", "VISUAL", "QUARTERLY"] as InspectionType[]).map(
                  (inspectionType) => (
                    <button
                      key={inspectionType}
                      type="button"
                      onClick={() => setType(inspectionType)}
                      className={`
                        px-4 py-3 rounded-lg font-medium text-sm
                        border-2 transition-all
                        ${
                          type === inspectionType
                            ? inspectionType === "OFFICIAL"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                              : inspectionType === "VISUAL"
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                : "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                            : "border-[#E5E7EB] dark:border-[#2D3340] text-[#6B7280] dark:text-[#9CA3AF] hover:border-[#D1D5DB] dark:hover:border-[#3D4350]"
                        }
                      `}
                    >
                      {inspectionType}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Inspection Date */}
            <div>
              <label className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                Inspection Date
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
                className="
                  w-full px-4 py-2.5
                  bg-[#F6F7FA] dark:bg-[#0D1117]
                  border border-[#E5E7EB] dark:border-[#2D3340]
                  rounded-lg
                  text-[#111827] dark:text-[#E4E6EB]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  transition-colors
                "
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any observations, findings, or remarks..."
                rows={4}
                className="
                  w-full px-4 py-2.5
                  bg-[#F6F7FA] dark:bg-[#0D1117]
                  border border-[#E5E7EB] dark:border-[#2D3340]
                  rounded-lg
                  text-[#111827] dark:text-[#E4E6EB]
                  placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  transition-colors
                  resize-none
                "
              />
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Document any important findings or observations
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-[#E5E7EB] dark:border-[#2D3340]">
          <button
            type="button"
            onClick={onClose}
            disabled={logInspection.isPending}
            className="
              px-4 py-2
              bg-[#F6F7FA] dark:bg-[#0D1117]
              border border-[#E5E7EB] dark:border-[#2D3340]
              text-[#111827] dark:text-[#E4E6EB]
              rounded-lg font-medium
              hover:bg-gray-100 dark:hover:bg-[#2A2E37]
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={logInspection.isPending}
            className="
              px-4 py-2
              bg-blue-600 dark:bg-blue-600
              hover:bg-blue-700 dark:hover:bg-blue-700
              text-white
              rounded-lg font-medium
              transition-colors
              flex items-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Save className="w-4 h-4" />
            {logInspection.isPending ? "Creating..." : "Create Inspection"}
          </button>
        </div>
      </div>
    </div>
  );
}
