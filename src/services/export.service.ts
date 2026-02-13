// frontend/src/services/export.service.ts

import { apiClient } from "../lib/api-client";

/**
 * Download a blob as a file
 */
const downloadFile = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

/**
 * Export service for downloading inspection and statistics reports
 */
export const exportService = {
  /**
   * Download inspections report as PDF
   */
  async downloadInspectionsPdf(): Promise<void> {
    const response = await apiClient.get("/export/inspections/pdf", {
      responseType: "blob",
    });

    const filename = `inspections-${new Date().toISOString().split("T")[0]}.pdf`;
    downloadFile(response.data, filename);
  },

  /**
   * Download inspections data as Excel
   */
  async downloadInspectionsExcel(): Promise<void> {
    const response = await apiClient.get("/export/inspections/excel", {
      responseType: "blob",
    });

    const filename = `inspections-${new Date().toISOString().split("T")[0]}.xlsx`;
    downloadFile(response.data, filename);
  },

  /**
   * Download statistics report as PDF
   */
  async downloadStatisticsPdf(): Promise<void> {
    const response = await apiClient.get("/export/statistics/pdf", {
      responseType: "blob",
    });

    const filename = `statistics-${new Date().toISOString().split("T")[0]}.pdf`;
    downloadFile(response.data, filename);
  },
};
