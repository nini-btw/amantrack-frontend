"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

type DialogVariant = "danger" | "warning" | "info" | "success";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  loading?: boolean;
}

const variantConfig = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-100 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
    confirmButton:
      "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
  },
  warning: {
    icon: AlertCircle,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    confirmButton:
      "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700",
  },
  info: {
    icon: Info,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    confirmButton:
      "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
  },
  success: {
    icon: CheckCircle,
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    confirmButton:
      "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
  },
};

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const t = useTranslations("dashboard.common.confirmDialog");
  const config = variantConfig[variant];
  const Icon = config.icon;

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !loading) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onCancel, loading]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={loading ? undefined : onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Dialog */}
      <div
        className="
          relative w-full sm:max-w-md
          bg-white dark:bg-[#1B1F28]
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          transform transition-all
          p-5 sm:p-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${config.iconBg} flex items-center justify-center`}
          >
            <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${config.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-[#111827] dark:text-[#E4E6EB] mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF]">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              flex-1
              px-4 py-2.5 sm:py-3
              rounded-lg
              border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-[#0D1117]
              text-[#111827] dark:text-[#E4E6EB]
              font-medium
              text-sm sm:text-base
              hover:bg-gray-50 dark:hover:bg-[#2D3340]
              transition-all
              active:scale-95
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {cancelText || t("defaultCancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              flex-1
              px-4 py-2.5 sm:py-3
              rounded-lg
              ${config.confirmButton}
              text-white
              font-medium
              text-sm sm:text-base
              transition-all
              active:scale-95
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
              flex items-center justify-center gap-2
            `}
          >
            {loading && (
              <div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-label={t("aria.loading")}
              />
            )}
            {confirmText || t("defaultConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
