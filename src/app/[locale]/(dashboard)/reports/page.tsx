"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInspections } from "@/features/inspections/hooks/useInspections";
import { useStatistics } from "@/features/statistics/hooks/useStatistics";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { InspectionsList } from "@/features/inspections/components/InspectionsList";
import { InspectionDetails } from "@/features/inspections/components/InspectionDetails";
import { ExportSection } from "@/features/inspections/components/ExportSection";
import { CreateInspectionModal } from "@/features/inspections/components/CreateInspectionModal";
import { InspectionType } from "@/types/asset.types";
import { ReportsHeader } from "@/components/dashboard/pagesHeaders/ReportsHeader";

export default function ReportsPage() {
  const t = useTranslations("dashboard.reports");

  const [selectedType, setSelectedType] = useState<InspectionType | "ALL">(
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

  // Localized types for the filter tabs
  const inspectionTypes: {
    value: InspectionType | "ALL";
    label: string;
  }[] = [
    { value: "ALL", label: t("types.all") },
    { value: "OFFICIAL", label: t("types.official") },
    { value: "VISUAL", label: t("types.visual") },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] transition-colors duration-300 p-4 sm:p-6 lg:p-8">
        <LoadingSpinner message={t("loading")} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] transition-colors duration-300 p-4 sm:p-6 lg:p-8">
        <ErrorMessage message={t("error")} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7FA] dark:bg-[#0D1117] transition-colors duration-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ReportsHeader onNewInspection={() => setShowCreateModal(true)} />

        {/* Export Section */}
        <ExportSection inspections={inspectionsData} statistics={statistics} />

        {/* Filters and Search */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg text-[#111827] dark:text-[#E4E6EB] placeholder:text-[#6B7280] dark:placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="sm:w-64">
              <div className="flex w-full bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg overflow-hidden">
                {inspectionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`
                      flex-1 text-sm font-medium transition-all duration-200
                      py-2.5 px-2
                      cursor-pointer
                      ${
                        selectedType === type.value
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-[#111827] dark:text-[#E4E6EB] hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }
                    `}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
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
