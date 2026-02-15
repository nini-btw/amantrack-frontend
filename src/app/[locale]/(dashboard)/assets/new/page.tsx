"use client";

import { Link } from "@/routing";
import { useTranslations } from "next-intl";
import { AssetForm } from "@/features/assets/components/AssetForm";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default function NewAssetPage() {
  const t = useTranslations("dashboard.assets");

  return (
    <div className="rounded-lg min-h-screen bg-gray-50 dark:bg-[#1B1F28] p-3 sm:p-4 md:p-6 lg:p-8 transition-colors">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
            <PlusCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>{t("new.pageTitle")}</span>
          </h1>
          <Link
            href="/assets"
            className="
              cursor-pointer
              w-full sm:w-auto
              px-4 py-2.5 sm:py-2
              bg-gray-200 dark:bg-[#2D3340] 
              text-gray-700 dark:text-[#E4E6EB] 
              rounded-lg 
              hover:bg-gray-300 dark:hover:bg-[#3B3F50] 
              flex items-center justify-center sm:justify-start gap-2
              transition-colors
              font-medium
              shadow-sm
            "
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            <span>{t("new.backToList")}</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="sm:bg-white sm:dark:bg-[#1B1F28] sm:border sm:border-[#E5E7EB] sm:dark:border-[#2D3340] sm:rounded-xl sm:shadow-lg sm:dark:shadow-none sm:p-4 md:p-6 transition-colors">
          <AssetForm />
        </div>
      </div>
    </div>
  );
}
