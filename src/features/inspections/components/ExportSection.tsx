"use client";

import { useState } from "react";
import { FileDown, FileSpreadsheet, FileText, Download } from "lucide-react";
import { exportService } from "@/services/export.service";

interface ExportSectionProps {
  // Props are now optional since we're using the service
  disabled?: boolean;
}

export function ExportSection({ disabled = false }: ExportSectionProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExportPDF = async () => {
    setIsExporting("pdf");
    try {
      await exportService.downloadInspectionsPdf();
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting("excel");
    try {
      await exportService.downloadInspectionsExcel();
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Failed to export Excel. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportStatistics = async () => {
    setIsExporting("statistics");
    try {
      await exportService.downloadStatisticsPdf();
    } catch (error) {
      console.error("Statistics export failed:", error);
      alert("Failed to export statistics. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-green-50 dark:bg-green-900/10 p-2 rounded-lg">
          <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
          Export Reports
        </h2>
      </div>

      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-6">
        Download inspection records and compliance reports in your preferred
        format
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Inspections PDF */}
        <button
          onClick={handleExportPDF}
          disabled={disabled || isExporting === "pdf"}
          className="
            flex items-center gap-3 p-4
            bg-[#F6F7FA] dark:bg-[#0D1117]
            border-2 border-[#E5E7EB] dark:border-[#2D3340]
            rounded-lg
            hover:border-red-300 dark:hover:border-red-700
            hover:bg-red-50 dark:hover:bg-red-900/10
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          "
        >
          <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors">
            <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E4E6EB]">
              {isExporting === "pdf" ? "Exporting..." : "Inspections Report"}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              PDF Format
            </p>
          </div>
          <FileDown className="w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-red-600 dark:group-hover:text-red-400" />
        </button>

        {/* Inspections Excel */}
        <button
          onClick={handleExportExcel}
          disabled={disabled || isExporting === "excel"}
          className="
            flex items-center gap-3 p-4
            bg-[#F6F7FA] dark:bg-[#0D1117]
            border-2 border-[#E5E7EB] dark:border-[#2D3340]
            rounded-lg
            hover:border-green-300 dark:hover:border-green-700
            hover:bg-green-50 dark:hover:bg-green-900/10
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          "
        >
          <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/20 transition-colors">
            <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E4E6EB]">
              {isExporting === "excel" ? "Exporting..." : "Inspections Data"}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Excel Format
            </p>
          </div>
          <FileDown className="w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-green-600 dark:group-hover:text-green-400" />
        </button>

        {/* Statistics PDF */}
        <button
          onClick={handleExportStatistics}
          disabled={disabled || isExporting === "statistics"}
          className="
            flex items-center gap-3 p-4
            bg-[#F6F7FA] dark:bg-[#0D1117]
            border-2 border-[#E5E7EB] dark:border-[#2D3340]
            rounded-lg
            hover:border-blue-300 dark:hover:border-blue-700
            hover:bg-blue-50 dark:hover:bg-blue-900/10
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          "
        >
          <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-sm font-semibold text-[#111827] dark:text-[#E4E6EB]">
              {isExporting === "statistics"
                ? "Exporting..."
                : "Statistics Report"}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              PDF with Charts
            </p>
          </div>
          <FileDown className="w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF] group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-lg">
        <div className="flex items-start gap-3">
          <FileDown className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              Export Information
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
              <li>
                • PDF reports include all inspection records with detailed
                information
              </li>
              <li>• Excel files contain raw data for further analysis</li>
              <li>
                • Statistics reports include charts and compliance metrics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
