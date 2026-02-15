"use client";

import { useInspection } from "@/features/inspections/hooks/useInspections";
import { X, Calendar, User, FileText, Clock, Tag } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Inspection } from "@/types/inspection.types";
import { useTranslations } from "next-intl";

interface InspectionDetailsProps {
  inspectionId: string;
  onClose: () => void;
}

function getInspectionBadgeClasses(type: Inspection["type"]) {
  switch (type) {
    case "OFFICIAL":
      return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
    case "VISUAL":
      return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  }
}

export function InspectionDetails({
  inspectionId,
  onClose,
}: InspectionDetailsProps) {
  const { data: inspection, isLoading } = useInspection(inspectionId);
  const t = useTranslations("dashboard.reports.details");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB] dark:border-[#2D3340]">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-[#111827] dark:text-[#E4E6EB]">
              {t("title")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-lg text-[#6B7280] dark:text-[#9CA3AF] hover:bg-[#F6F7FA] dark:hover:bg-[#0D1117] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner message={t("loading")} />
            </div>
          ) : inspection ? (
            <div className="space-y-6">
              {/* Type Badge */}
              <div>
                <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider mb-2 block">
                  {t("type.label")}
                </label>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${getInspectionBadgeClasses(inspection.inspection.type)}`}
                >
                  <Tag className="w-4 h-4" />
                  {inspection.inspection.type}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {t("date.label")}
                </label>
                <p className="text-base text-[#111827] dark:text-[#E4E6EB] font-medium">
                  {new Date(
                    inspection.inspection.inspectionDate,
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Performed By */}
              <div>
                <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> {t("performedBy.label")}
                </label>
                <p className="text-base text-[#111827] dark:text-[#E4E6EB] font-medium">
                  {inspection.inspection.performedBy}
                </p>
              </div>

              {/* Notes */}
              {inspection.inspection.notes && (
                <div>
                  <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> {t("notes.label")}
                  </label>
                  <div className="bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg p-4">
                    <p className="text-sm text-[#111827] dark:text-[#E4E6EB] whitespace-pre-wrap">
                      {inspection.inspection.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t border-[#E5E7EB] dark:border-[#2D3340] pt-4">
                <label className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wider mb-3 block">
                  {t("metadata.title")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                      {t("metadata.inspectionId")}
                    </p>
                    <p className="text-sm text-[#111827] dark:text-[#E4E6EB] font-mono">
                      {inspection.inspection.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                      {t("metadata.assetId")}
                    </p>
                    <p className="text-sm text-[#111827] dark:text-[#E4E6EB] font-mono">
                      {inspection.inspection.assetId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {t("metadata.createdAt")}
                    </p>
                    <p className="text-sm text-[#111827] dark:text-[#E4E6EB]">
                      {new Date(inspection.inspection.createdAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                {t("notFound")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-[#E5E7EB] dark:border-[#2D3340]">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-[#F6F7FA] dark:bg-[#0D1117] border border-[#E5E7EB] dark:border-[#2D3340] text-[#111827] dark:text-[#E4E6EB] rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-[#2A2E37] transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
