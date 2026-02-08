"use client";

import { Inspection } from "@/types/inspection.types";
import {
  Calendar,
  User,
  FileText,
  Eye,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useDeleteInspection } from "@/features/inspections/hooks/useInspections";
import { LogInspectionResponse } from "@/types/inspection.types";

interface InspectionsListProps {
  inspections?: LogInspectionResponse[];
  searchQuery: string;
  onSelectInspection: (id: string) => void;
  selectedInspection: string | null;
}

export function InspectionsList({
  inspections,
  searchQuery,
  onSelectInspection,
  selectedInspection,
}: InspectionsListProps) {
  const deleteInspection = useDeleteInspection();

  const filteredInspections = inspections?.filter((inspection) => {
    const search = searchQuery.toLowerCase();
    const type = inspection.inspection?.type?.toLowerCase() || "";
    const performedBy = inspection.inspection?.performedBy?.toLowerCase() || "";
    const notes = inspection.inspection?.notes?.toLowerCase() || "";
    const date = inspection.inspection?.inspectionDate || "";

    return (
      type.includes(search) ||
      performedBy.includes(search) ||
      notes.includes(search) ||
      date.includes(search)
    );
  });

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      confirm(
        "Are you sure you want to delete this inspection? This action cannot be undone.",
      )
    ) {
      try {
        await deleteInspection.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete inspection:", error);
      }
    }
  };

  if (!filteredInspections || filteredInspections.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-8 sm:p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 dark:bg-gray-900/10 p-4 rounded-full mb-4">
            <FileText className="w-12 h-12 text-[#6B7280] dark:text-[#9CA3AF] opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
            No Inspections Found
          </h3>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md">
            {searchQuery
              ? "No inspections match your search criteria. Try adjusting your filters."
              : "Get started by creating your first inspection record."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F6F7FA] dark:bg-[#0D1117] border-b border-[#E5E7EB] dark:border-[#2D3340]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Performed By
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#2D3340]">
            {filteredInspections.map((inspection) => (
              <tr
                key={inspection.inspection.id}
                className={`
                  transition-colors cursor-pointer
                  hover:bg-[#F6F7FA] dark:hover:bg-[#0D1117]
                  ${
                    selectedInspection === inspection.inspection.id
                      ? "bg-blue-50 dark:bg-blue-900/10"
                      : ""
                  }
                `}
                onClick={() => onSelectInspection(inspection.inspection.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        inspection.inspection.type === "OFFICIAL"
                          ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                          : inspection.inspection.type === "VISUAL"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                      }
                    `}
                    >
                      {inspection.inspection.type}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                    <Calendar className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                    {new Date(
                      inspection.inspection.inspectionDate,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                    <User className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                    {inspection.inspection.performedBy}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 max-w-xs">
                    {inspection.inspection.notes || "No notes provided"}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInspection(inspection.inspection.id);
                      }}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(inspection.inspection.id, e)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-[#E5E7EB] dark:divide-[#2D3340]">
        {filteredInspections.map((inspection) => (
          <div
            key={inspection.inspection.id}
            onClick={() => onSelectInspection(inspection.inspection.id)}
            className={`
              p-4 cursor-pointer transition-colors
              hover:bg-[#F6F7FA] dark:hover:bg-[#0D1117]
              ${
                selectedInspection === inspection.inspection.id
                  ? "bg-blue-50 dark:bg-blue-900/10"
                  : ""
              }
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  inspection.inspection.type === "OFFICIAL"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                    : inspection.inspection.type === "VISUAL"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                }
              `}
              >
                {inspection.inspection.type}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectInspection(inspection.inspection.id);
                  }}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(inspection.inspection.id, e)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                <Calendar className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                {new Date(
                  inspection.inspection.inspectionDate,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                <User className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                {inspection.inspection.performedBy}
              </div>
              {inspection.inspection.notes && (
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2">
                  {inspection.inspection.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination footer (optional - can be added later) */}
      <div className="px-6 py-4 border-t border-[#E5E7EB] dark:border-[#2D3340] bg-[#F6F7FA] dark:bg-[#0D1117]">
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] text-center">
          Showing {filteredInspections.length} of {inspections?.length || 0}{" "}
          inspections
        </p>
      </div>
    </div>
  );
}
