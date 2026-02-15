"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const t = useTranslations("dashboard.common.error");

  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-6 text-center">
      {/* Icon with Lucide React */}
      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-full mb-4">
        <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
      </div>

      {/* Localized Heading */}
      <h3 className="text-xl font-bold text-[#111827] dark:text-[#E4E6EB] mb-2">
        {t("title")}
      </h3>

      {/* Dynamic Error Message */}
      <p className="text-[#6B7280] dark:text-[#9CA3AF] max-w-md mb-6">
        {message}
      </p>

      {/* Localized Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            flex items-center gap-2
            px-6 py-2.5 
            bg-blue-600 hover:bg-blue-700 
            text-white font-medium 
            rounded-lg transition-all 
            active:scale-95
          "
        >
          <RefreshCw className="w-4 h-4" />
          {t("retry")}
        </button>
      )}
    </div>
  );
}
