"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateAsset } from "../hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { ASSET_TYPES, ASSET_CLASSES } from "@/config/constants";

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
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
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
    if (!dateString) return "Select date";
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

export function AssetForm() {
  const router = useRouter();
  const { data: locations = [], isLoading: loadingLocations } = useLocations();
  const createAsset = useCreateAsset();

  const [formData, setFormData] = useState({
    referenceNumber: "",
    type: "CO2",
    locationId: "",
    assetClass: "", // Optional field - can be empty string
    weightKg: "", // Optional field - stored as string for form handling
    visualInspectionDate: new Date().toISOString().split("T")[0],
    officialInspectionDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "referenceNumber":
        if (!value || value.trim() === "") {
          return "Reference number is required";
        }
        if (value.length < 3) {
          return "Reference number must be at least 3 characters";
        }
        return "";
      case "type":
        if (!value || value.trim() === "") {
          return "Type is required";
        }
        return "";
      case "locationId":
        if (!value || value.trim() === "") {
          return "Location is required";
        }
        return "";
      case "weightKg":
        // Optional field - only validate if provided
        if (value && value !== "") {
          const num = Number(value);
          if (isNaN(num) || num < 0) {
            return "Weight must be a positive number";
          }
        }
        return "";
      case "visualInspectionDate":
        if (!value || value.trim() === "") {
          return "Visual inspection date is required";
        }
        return "";
      case "officialInspectionDate":
        if (!value || value.trim() === "") {
          return "Official inspection date is required";
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

    // Validate required fields
    const requiredFields = [
      "referenceNumber",
      "type",
      "locationId",
      "visualInspectionDate",
      "officialInspectionDate",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData],
      );
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate optional weight if provided
    if (formData.weightKg !== "") {
      const weightError = validateField("weightKg", formData.weightKg);
      if (weightError) {
        newErrors.weightKg = weightError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
    );

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare data according to Asset entity structure
      const submitData: any = {
        referenceNumber: formData.referenceNumber.toUpperCase().trim(),
        type: formData.type,
        locationId: formData.locationId,
        class: formData.assetClass || "None", // Backend expects "class" field
        weightKg: formData.weightKg ? parseFloat(formData.weightKg) : 0, // Default to 0 if empty
        visualInspectionDate: formData.visualInspectionDate, // Send as YYYY-MM-DD string
        officialInspectionDate: formData.officialInspectionDate, // Send as YYYY-MM-DD string
      };

      console.log("Submitting data:", submitData); // Debug log
      await createAsset.mutateAsync(submitData);
      router.push("/assets");
    } catch (error) {
      console.error("Failed to create asset:", error);
      // Show more detailed error
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create asset. Please try again.";
      alert(errorMessage);
    }
  };

  if (loadingLocations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-[#E4E6EB] font-medium">
            Loading locations...
          </p>
        </div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">
              No Locations Available
            </h3>
            <p className="text-yellow-700 dark:text-yellow-400 mb-4">
              You need to create at least one location before adding assets.
            </p>
            <button
              onClick={() => router.push("/locations/new")}
              className="cursor-pointer px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white font-medium rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-600 transition-colors shadow-sm"
            >
              Create Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = `w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:border-transparent text-base`;

  const getInputClassName = (fieldName: string) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `${inputClass} ${
      hasError
        ? "border-red-500 dark:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10"
        : "border-gray-300 dark:border-[#3B3F50] focus:ring-blue-500 bg-white dark:bg-[#1B1F28]"
    } text-gray-900 dark:text-[#E4E6EB] placeholder-gray-400 dark:placeholder-gray-500`;
  };

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-[#E4E6EB] mb-1.5 sm:mb-2";

  const typeOptions = ASSET_TYPES.map((type) => ({ value: type, label: type }));
  const classOptions = [
    { value: "", label: "None" },
    ...ASSET_CLASSES.map((cls) => ({ value: cls, label: cls })),
  ];
  const locationOptions = [
    { value: "", label: "Select a location" },
    ...locations.map((location) => ({
      value: location.id,
      label: location.name,
    })),
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 bg-white dark:bg-[#1B1F28] p-4 sm:p-6 md:p-8 rounded-xl shadow-lg dark:shadow-none border border-gray-200 dark:border-[#2D3340] sm:border-0 transition-colors"
      >
        <div className="border-b border-gray-200 dark:border-[#2D3340] pb-3 sm:pb-4 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-[#E4E6EB]">
            Create New Asset
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details below. Fields marked with * are required.
          </p>
        </div>

        {/* Reference Number */}
        <div>
          <label className={labelClass}>
            Reference Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.referenceNumber}
            onChange={(e) =>
              handleChange("referenceNumber", e.target.value.toUpperCase())
            }
            onBlur={() => handleBlur("referenceNumber")}
            className={`${getInputClassName("referenceNumber")} uppercase`}
            placeholder="e.g., M1C001"
          />
          {touched.referenceNumber && errors.referenceNumber && (
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
              {errors.referenceNumber}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className={labelClass}>
            Type <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={formData.type}
            onChange={(value) => handleChange("type", value)}
            options={typeOptions}
            required
            error={touched.type ? errors.type : ""}
          />
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>
            Location <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={formData.locationId}
            onChange={(value) => handleChange("locationId", value)}
            options={locationOptions}
            placeholder="Select a location"
            required
            error={touched.locationId ? errors.locationId : ""}
          />
        </div>

        {/* Class - Optional */}
        <div>
          <label className={labelClass}>
            Class <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <CustomSelect
            value={formData.assetClass}
            onChange={(value) => handleChange("assetClass", value)}
            options={classOptions}
            placeholder="None"
          />
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Leave as "None" if not applicable
          </p>
        </div>

        {/* Weight - Optional */}
        <div>
          <label className={labelClass}>
            Weight (kg){" "}
            <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={formData.weightKg}
            onChange={(e) => handleChange("weightKg", e.target.value)}
            onBlur={() => handleBlur("weightKg")}
            className={getInputClassName("weightKg")}
            placeholder="0"
          />
          {touched.weightKg && errors.weightKg && (
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
              {errors.weightKg}
            </p>
          )}
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Leave empty if weight is not applicable
          </p>
        </div>

        {/* Visual Inspection Date */}
        <div>
          <label className={labelClass}>
            Last Visual Inspection Date <span className="text-red-500">*</span>
          </label>
          <CustomDatePicker
            value={formData.visualInspectionDate}
            onChange={(value) => handleChange("visualInspectionDate", value)}
            required
            error={
              touched.visualInspectionDate ? errors.visualInspectionDate : ""
            }
          />
        </div>

        {/* Official Inspection Date */}
        <div>
          <label className={labelClass}>
            Last Official Inspection Date{" "}
            <span className="text-red-500">*</span>
          </label>
          <CustomDatePicker
            value={formData.officialInspectionDate}
            onChange={(value) => handleChange("officialInspectionDate", value)}
            required
            error={
              touched.officialInspectionDate
                ? errors.officialInspectionDate
                : ""
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-[#2D3340]">
          <button
            type="submit"
            disabled={createAsset.isPending}
            className="cursor-pointer w-full sm:flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md disabled:shadow-none"
          >
            {createAsset.isPending ? (
              <span className="flex items-center justify-center gap-2">
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
                Creating...
              </span>
            ) : (
              "Create Asset"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-gray-200 dark:bg-[#2D3340] text-gray-700 dark:text-[#E4E6EB] font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-[#3B3F50] transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
