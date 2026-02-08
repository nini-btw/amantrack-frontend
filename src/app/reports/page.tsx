"use client";

import { useState } from "react";
import {
  FileText,
  FilePlus,
  Calendar,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import { useInspections } from "@/features/inspections/hooks/useInspections";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { InspectionsList } from "@/features/inspections/components/InspectionsList";
import { InspectionDetails } from "@/features/inspections/components/InspectionDetails";
import { ExportSection } from "@/features/inspections/components/ExportSection";
import { CreateInspectionModal } from "@/features/inspections/components/CreateInspectionModal";
import { Inspection } from "@/types/inspection.types";
export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<Inspection["type"] | "ALL">(
    "ALL",
  );
  const [selectedInspection, setSelectedInspection] = useState<string | null>(
    null,
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: inspectionsData,
    isLoading,
    error,
    refetch,
  } = useInspections(selectedType === "ALL" ? undefined : selectedType);

  const { data: statistics } = useStatistics();

  const inspections = (inspectionsData || []) as unknown as Inspection[];

  const inspectionTypes: {
    value: Inspection["type"] | "ALL";
    label: string;
  }[] = [
    { value: "ALL", label: "All Inspections" },
    { value: "OFFICIAL", label: "Official" },
    { value: "VISUAL", label: "Visual" },
  ];

  if (isLoading) return <LoadingSpinner message="Loading reports..." />;
  if (error)
    return (
      <ErrorMessage
        message="Failed to load reports. Please try again."
        onRetry={refetch}
      />
    );

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              Reports & Inspections
            </h1>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2">
              Manage inspection records and generate compliance reports
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            <FilePlus className="w-4 h-4" /> New Inspection
          </button>
        </div>

        {/* Export Section */}
        <ExportSection inspections={inspections} statistics={statistics} />

        {/* Filters and Search */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search inspections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg text-[#111827] dark:text-[#E4E6EB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF]"
            />
          </div>
          <div className="relative sm:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" />
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as Inspection["type"] | "ALL")
              }
              className="w-full pl-10 pr-10 py-2.5 bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg text-[#111827] dark:text-[#E4E6EB] cursor-pointer"
            >
              {inspectionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" />
          </div>
        </div>

        {/* Inspections List */}
        <InspectionsList
          inspections={inspectionsData}
          searchQuery={searchQuery}
          selectedInspection={selectedInspection}
          onSelectInspection={setSelectedInspection}
        />
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateInspectionModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            refetch();
          }}
        />
      )}
      {selectedInspection && (
        <InspectionDetails
          inspectionId={selectedInspection}
          onClose={() => setSelectedInspection(null)}
        />
      )}
    </div>
  );
}
