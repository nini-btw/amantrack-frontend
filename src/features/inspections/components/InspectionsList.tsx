"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  FileText,
  Eye,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useDeleteInspection } from "@/features/inspections/hooks/useInspections";
import { LogInspectionResponse } from "@/types/inspection.types";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface InspectionsListProps {
  inspections?: LogInspectionResponse[];
  searchQuery: string;
  onSelectInspection: (id: string) => void;
  selectedInspection: string | null;
}

type SortField = "type" | "inspectionDate" | "performedBy";
type SortDirection = "asc" | "desc" | null;

export function InspectionsList({
  inspections,
  searchQuery,
  onSelectInspection,
  selectedInspection,
}: InspectionsListProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inspectionToDelete, setInspectionToDelete] =
    useState<LogInspectionResponse | null>(null);

  const deleteInspection = useDeleteInspection();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") setSortDirection("desc");
      else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeleteClick = (
    inspection: LogInspectionResponse,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setInspectionToDelete(inspection);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!inspectionToDelete) return;

    try {
      await deleteInspection.mutateAsync(inspectionToDelete.inspection.id);
      setDeleteDialogOpen(false);
      setInspectionToDelete(null);
    } catch (error) {
      console.error("Failed to delete inspection:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setInspectionToDelete(null);
  };

  // Single Sort Icon Component
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return (
        <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-gray-600" />
      );
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    );
  };

  // Filter inspections
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

  // Sort inspections
  let sortedInspections = [...(filteredInspections || [])];
  if (sortField && sortDirection) {
    sortedInspections.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "type":
          aValue = a.inspection.type;
          bValue = b.inspection.type;
          break;
        case "inspectionDate":
          aValue = new Date(a.inspection.inspectionDate).getTime();
          bValue = new Date(b.inspection.inspectionDate).getTime();
          break;
        case "performedBy":
          aValue = a.inspection.performedBy.toLowerCase();
          bValue = b.inspection.performedBy.toLowerCase();
          break;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  if (!sortedInspections || sortedInspections.length === 0) {
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

  const tableHeaders = [
    { label: "Type", field: "type" as SortField },
    { label: "Date", field: "inspectionDate" as SortField },
    { label: "Performed By", field: "performedBy" as SortField },
  ];

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F6F7FA] dark:bg-[#0D1117] border-b border-[#E5E7EB] dark:border-[#2D3340]">
              <tr>
                {tableHeaders.map(({ label, field }) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="px-4 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1B1F28] transition-colors select-none"
                  >
                    <div className="flex items-center gap-2">
                      {label}
                      <SortIcon field={field} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#2D3340]">
              {sortedInspections.map((inspection) => (
                <tr
                  key={inspection.inspection.id}
                  className={`transition-colors cursor-pointer hover:bg-[#F6F7FA] dark:hover:bg-[#0D1117] ${
                    selectedInspection === inspection.inspection.id
                      ? "bg-blue-50 dark:bg-blue-900/10"
                      : ""
                  }`}
                  onClick={() => onSelectInspection(inspection.inspection.id)}
                >
                  {/* Type */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inspection.inspection.type === "OFFICIAL"
                            ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                            : inspection.inspection.type === "VISUAL"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {inspection.inspection.type}
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 whitespace-nowrap">
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

                  {/* Performed By */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                      <User className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" />
                      {inspection.inspection.performedBy}
                    </div>
                  </td>

                  {/* Notes */}
                  <td className="px-4 py-4">
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 max-w-xs">
                      {inspection.inspection.notes || "No notes provided"}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => handleDeleteClick(inspection, e)}
                        className="cursor-pointer p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
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

        {/* Pagination footer */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] dark:border-[#2D3340] bg-[#F6F7FA] dark:bg-[#0D1117]">
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] text-center">
            Showing {sortedInspections.length} of {inspections?.length || 0}{" "}
            inspections
          </p>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none overflow-hidden">
        {/* Mobile Sort Controls */}
        <div className="p-4 bg-[#F6F7FA] dark:bg-[#0D1117] border-b border-[#E5E7EB] dark:border-[#2D3340]">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider whitespace-nowrap">
              Sort by:
            </span>
            {tableHeaders.map(({ label, field }) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  sortField === field
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-700"
                    : "bg-white dark:bg-[#1B1F28] text-[#6B7280] dark:text-[#9CA3AF] border-2 border-[#E5E7EB] dark:border-[#2D3340]"
                }`}
              >
                {label}
                <SortIcon field={field} />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Cards List */}
        <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D3340]">
          {sortedInspections.map((inspection) => (
            <div
              key={inspection.inspection.id}
              className={`p-4 transition-colors ${
                selectedInspection === inspection.inspection.id
                  ? "bg-blue-50 dark:bg-blue-900/10"
                  : ""
              }`}
              onClick={() => onSelectInspection(inspection.inspection.id)}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                    inspection.inspection.type === "OFFICIAL"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                      : inspection.inspection.type === "VISUAL"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
                  }`}
                >
                  {inspection.inspection.type}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleDeleteClick(inspection, e)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors active:scale-95"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                  <Calendar className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF] shrink-0" />
                  <span className="font-medium">
                    {new Date(
                      inspection.inspection.inspectionDate,
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#111827] dark:text-[#E4E6EB]">
                  <User className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF] shrink-0" />
                  <span>{inspection.inspection.performedBy}</span>
                </div>
                {inspection.inspection.notes && (
                  <div className="flex items-start gap-2 text-sm">
                    <FileText className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF] shrink-0 mt-0.5" />
                    <p className="text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2">
                      {inspection.inspection.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Footer */}
        <div className="px-4 py-3 border-t border-[#E5E7EB] dark:border-[#2D3340] bg-[#F6F7FA] dark:bg-[#0D1117]">
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] text-center">
            Showing {sortedInspections.length} of {inspections?.length || 0}{" "}
            inspections
          </p>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Inspection"
        description={`Are you sure you want to delete this ${
          inspectionToDelete?.inspection.type.toLowerCase() || ""
        } inspection performed on ${
          inspectionToDelete
            ? new Date(
                inspectionToDelete.inspection.inspectionDate,
              ).toLocaleDateString()
            : ""
        }? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteInspection.isPending}
      />
    </>
  );
}
