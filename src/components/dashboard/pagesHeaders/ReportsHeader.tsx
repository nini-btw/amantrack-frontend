"use client";

import { FileText, FilePlus } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReportsHeaderProps {
  onNewInspection: () => void;
}

export function ReportsHeader({ onNewInspection }: ReportsHeaderProps) {
  const t = useTranslations("dashboard.reports.header");

  return (
    <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="leading-tight">{t("title")}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          {t("description")}
        </p>
      </div>

      <button
        onClick={onNewInspection}
        className="
          cursor-pointer
          inline-flex items-center justify-center gap-2
          px-4 sm:px-6 py-2.5 sm:py-3
          bg-blue-600 hover:bg-blue-700
          dark:bg-blue-600 dark:hover:bg-blue-700
          text-white font-semibold text-sm sm:text-base
          rounded-lg
          shadow-md hover:shadow-lg
          transition-all duration-200
          w-full sm:w-auto
          active:scale-[0.98]
        "
      >
        <FilePlus className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span>{t("newBtn")}</span>
      </button>
    </div>
  );
}
