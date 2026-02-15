"use client";

import { FileSpreadsheet, Download, FileText } from "lucide-react";
import { LogInspectionResponse } from "@/types/inspection.types";
import { Statistics } from "@/types/statistics.types";
import { exportService } from "@/services/export.service";
import { useTranslations, useFormatter } from "next-intl";

interface ExportSectionProps {
  inspections?: LogInspectionResponse[];
  statistics?: Statistics;
}

export function ExportSection({
  inspections = [],
  statistics,
}: ExportSectionProps) {
  const t = useTranslations("dashboard.reports.export");
  const format = useFormatter();

  const handleExportCSV = () => {
    if (!inspections || inspections.length === 0) {
      alert(t("noDataAlert"));
      return;
    }

    const headers = [
      t("reportTemplate.table.assetId"),
      t("reportTemplate.table.type"),
      t("reportTemplate.table.date"),
      t("reportTemplate.table.performedBy"),
      t("reportTemplate.table.notes"),
      t("reportTemplate.table.status"),
    ];

    const rows = inspections.map((item) => [
      item.inspection.assetId,
      item.inspection.type,
      format.dateTime(new Date(item.inspection.inspectionDate)),
      item.inspection.performedBy,
      item.inspection.notes || "",
      item.asset.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute(
      "download",
      `inspections_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.href = url;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportReport = () => {
    if (!inspections || inspections.length === 0) {
      alert(t("noDataAlert"));
      return;
    }

    const reportContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${t("reportTemplate.title")}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #111827; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px; }
    .summary { background: #F6F7FA; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .summary-item { display: flex; justify-content: space-between; margin: 10px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #E5E7EB; }
    th { background: #F6F7FA; font-weight: 600; color: #6B7280; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; }
  </style>
</head>
<body>
  <h1>${t("reportTemplate.title")}</h1>
  <p>${t("reportTemplate.generatedAt", { date: format.dateTime(new Date()) })}</p>

  ${
    statistics
      ? `
  <div class="summary">
    <h2>${t("reportTemplate.summaryTitle")}</h2>
    <div class="summary-item">
      <span>${t("reportTemplate.total")}:</span>
      <strong>${statistics.total}</strong>
    </div>
    <div class="summary-item">
      <span>${t("reportTemplate.valid")}:</span>
      <strong>${statistics.valid}</strong>
    </div>
    <div class="summary-item">
      <span>${t("reportTemplate.expired")}:</span>
      <strong>${statistics.expired}</strong>
    </div>
    <div class="summary-item">
      <span>${t("reportTemplate.compliance")}:</span>
      <strong>${statistics.compliancePercentage.toFixed(1)}%</strong>
    </div>
  </div>
  `
      : ""
  }

  <h2>${t("reportTemplate.title")} (${inspections.length})</h2>
  <table>
    <thead>
      <tr>
        <th>${t("reportTemplate.table.assetId")}</th>
        <th>${t("reportTemplate.table.type")}</th>
        <th>${t("reportTemplate.table.date")}</th>
        <th>${t("reportTemplate.table.performedBy")}</th>
        <th>${t("reportTemplate.table.notes")}</th>
      </tr>
    </thead>
    <tbody>
      ${inspections
        .map(
          (item) => `
        <tr>
          <td>${item.inspection.assetId}</td>
          <td><strong>${item.inspection.type}</strong></td>
          <td>${format.dateTime(new Date(item.inspection.inspectionDate))}</td>
          <td>${item.inspection.performedBy}</td>
          <td>${item.inspection.notes || "-"}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>

  <div class="footer">
    <p>${t("reportTemplate.footer")}</p>
  </div>
</body>
</html>
  `;

    const blob = new Blob([reportContent], {
      type: "text/html;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute(
      "download",
      `inspection_report_${new Date().toISOString().split("T")[0]}.html`,
    );
    link.href = url;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportInspectionsPdf = async () => {
    try {
      await exportService.downloadInspectionsPdf();
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert(t("errors.pdf"));
    }
  };

  return (
    <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2">
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            disabled={!inspections || inspections.length === 0}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <FileSpreadsheet className="w-4 h-4" />
            {t("btnCsv")}
          </button>

          <button
            onClick={handleExportReport}
            disabled={!inspections || inspections.length === 0}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            {t("btnReport")}
          </button>

          <button
            onClick={handleExportInspectionsPdf}
            disabled={!inspections || inspections.length === 0}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" />
            {t("btnPdf")}
          </button>
        </div>
      </div>
    </div>
  );
}
