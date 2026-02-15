"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { useLogInspection } from "../hooks/useInspections";
import { InspectionType } from "@/types/asset.types";
import { useTranslations } from "next-intl";

// Custom Scrollbar Styles
const scrollbarStyles = `
  /* Webkit browsers (Chrome, Safari, Edge) */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #9CA3AF;
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4B5563;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6B7280;
  }
  
  /* Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #9CA3AF transparent;
  }
  
  .dark .custom-scrollbar {
    scrollbar-color: #4B5563 transparent;
  }
`;

// Custom Select Component
function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border text-base ${
          error
            ? "border-red-500 dark:border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-[#3B3F50] focus:ring-blue-500"
        } bg-white dark:bg-[#1B1F28] text-gray-900 dark:text-[#E4E6EB] text-left focus:ring-2 focus:border-transparent transition-all hover:border-gray-400 dark:hover:border-[#4B5563] flex items-center justify-between`}
      >
        <span
          className={!selectedOption ? "text-gray-400 dark:text-gray-500" : ""}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""} text-gray-500 dark:text-gray-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#2D3340] border border-gray-300 dark:border-[#3B3F50] rounded-lg shadow-xl max-h-60 overflow-auto custom-scrollbar">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-base hover:bg-gray-100 dark:hover:bg-[#3B3F50] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                value === option.value
                  ? "bg-blue-50 dark:bg-[#1B1F28] text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-900 dark:text-[#E4E6EB]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-xs sm:text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// Custom Date Picker Component
function CustomDatePicker({
  value,
  onChange,
  required = false,
  error = "",
  t,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  t: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(value || new Date()));
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return t("datePickerPlaceholder");
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(viewDate);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(newDate.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const changeMonth = (delta: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1),
    );
  };

  const selectedDate = value ? new Date(value) : null;
  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewDate.getMonth() &&
      today.getFullYear() === viewDate.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border text-base ${
          error
            ? "border-red-500 dark:border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-[#3B3F50] focus:ring-blue-500"
        } bg-white dark:bg-[#1B1F28] text-gray-900 dark:text-[#E4E6EB] text-left focus:ring-2 focus:border-transparent transition-all hover:border-gray-400 dark:hover:border-[#4B5563] flex items-center justify-between`}
      >
        <span
          className={
            !value
              ? "text-gray-400 dark:text-gray-500 text-sm sm:text-base"
              : "text-sm sm:text-base"
          }
        >
          {formatDate(value)}
        </span>
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full sm:w-auto sm:min-w-70 mt-2 bg-white dark:bg-[#2D3340] border border-gray-300 dark:border-[#3B3F50] rounded-lg shadow-xl p-3 sm:p-4 left-0 right-0 sm:left-auto sm:right-auto">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="cursor-pointer p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#3B3F50] rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-[#E4E6EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-[#E4E6EB]">
              {viewDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="cursor-pointer p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#3B3F50] rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-[#E4E6EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`cursor-pointer p-1.5 sm:p-2 text-sm rounded-lg transition-all font-medium min-h-9 sm:min-h-10 ${
                    isSelected(day)
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      : isToday(day)
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                        : "text-gray-900 dark:text-[#E4E6EB] hover:bg-gray-100 dark:hover:bg-[#3B3F50]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-xs sm:text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface InspectionFormProps {
  assetId: string;
  onSuccess: () => void;
}

export function InspectionForm({ assetId, onSuccess }: InspectionFormProps) {
  const logInspection = useLogInspection();
  const t = useTranslations("dashboard.assets.inspection.form");

  const [formData, setFormData] = useState({
    type: "VISUAL" as InspectionType,
    inspectionDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "type":
        if (!value || value.trim() === "") {
          return t("validation.typeRequired");
        }
        return "";
      case "inspectionDate":
        if (!value || value.trim() === "") {
          return t("validation.dateRequired");
        }
        // Check if date is not in the future
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (selectedDate > today) {
          return t("validation.dateFuture");
        }
        return "";
      case "notes":
        // Notes are optional
        if (value && value.length > 500) {
          return t("validation.notesMaxLength");
        }
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    const fields = ["type", "inspectionDate", "notes"];

    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData],
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await logInspection.mutateAsync({
        assetId,
        type: formData.type,
        inspectionDate: new Date(formData.inspectionDate).toISOString(),
        notes: formData.notes || undefined,
      });

      onSuccess();
    } catch (error) {
      console.error("Failed to log inspection:", error);
      const errorMessage =
        error instanceof Error ? error.message : t("submitError");
      alert(errorMessage);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:border-transparent text-base ${
      hasError
        ? "border-red-500 dark:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10"
        : "border-gray-300 dark:border-[#3B3F50] focus:ring-blue-500 bg-white dark:bg-[#1B1F28]"
    } text-gray-900 dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-gray-500`;
  };

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-[#E4E6EB] mb-1.5 sm:mb-2";

  const inspectionTypeOptions = [
    { value: "VISUAL", label: t("typeOptions.visual") },
    { value: "OFFICIAL", label: t("typeOptions.official") },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 transition-colors"
      >
        <div className="border-b border-gray-200 dark:border-[#2D3340] pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-[#E4E6EB]">
              {t("title")}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("description")}
          </p>
        </div>

        {/* Inspection Type */}
        <div>
          <label className={labelClass}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {t("type.label")} <span className="text-red-500">*</span>
            </div>
          </label>
          <CustomSelect
            value={formData.type}
            onChange={(value) => handleChange("type", value as InspectionType)}
            options={inspectionTypeOptions}
            required
            error={touched.type ? errors.type : ""}
          />
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            {t("type.help")}
          </p>
        </div>

        {/* Inspection Date */}
        <div>
          <label className={labelClass}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t("date.label")} <span className="text-red-500">*</span>
            </div>
          </label>
          <CustomDatePicker
            value={formData.inspectionDate}
            onChange={(value) => handleChange("inspectionDate", value)}
            required
            error={touched.inspectionDate ? errors.inspectionDate : ""}
            t={t}
          />
          {touched.inspectionDate && !errors.inspectionDate && (
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              {t("date.help")}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className={labelClass}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {t("notes.label")}{" "}
              <span className="text-gray-400 text-xs">
                ({t("notes.optional")})
              </span>
            </div>
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            onBlur={() => handleBlur("notes")}
            rows={4}
            maxLength={500}
            className={getInputClassName("notes")}
            placeholder={t("notes.placeholder")}
          />
          <div className="flex justify-between items-center mt-1.5">
            {touched.notes && errors.notes ? (
              <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.notes}
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("notes.help")}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formData.notes.length}/500
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                {t("infoBox.title")}
              </h4>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                {t("infoBox.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-[#2D3340]">
          <button
            type="submit"
            disabled={logInspection.isPending}
            className="cursor-pointer w-full sm:flex-1 px-6 py-3 bg-green-600 dark:bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:shadow-none flex items-center justify-center gap-2"
          >
            {logInspection.isPending ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("submitLoading")}
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                {t("submitButton")}
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
