"use client";

import Link from "next/link";
import { AssetForm } from "@/features/assets/components/AssetForm";
import { PlusCircle, ArrowLeft } from "lucide-react";

export default function NewAssetPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1B1F28] p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-[#E4E6EB] flex items-center gap-3">
            <PlusCircle className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            New Fire Extinguisher
          </h1>
          <Link
            href="/assets"
            className="
              px-4 py-2 
              bg-gray-200 dark:bg-[#2D3340] 
              text-gray-700 dark:text-[#E4E6EB] 
              rounded-lg 
              hover:bg-gray-300 dark:hover:bg-[#3B3F50] 
              flex items-center gap-2
              transition-colors
            "
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-6 transition-colors">
          <AssetForm />
        </div>
      </div>
    </div>
  );
}
