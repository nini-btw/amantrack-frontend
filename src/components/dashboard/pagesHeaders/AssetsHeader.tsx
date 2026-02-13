"use client";

import { Archive } from "lucide-react";
import Link from "next/link";

export function AssetsHeader() {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB] flex items-center gap-2 sm:gap-3">
          <Archive className="w-8 h-8 sm:w-10 sm:h-10 text-[#E7000B] dark:text-[#FF4D4F] shrink-0" />
          <span className="leading-tight">Asset Management</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Manage all assets, compliance tracking, and inspections
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <Link
          href="/assets/new"
          className="
            cursor-pointer
            inline-flex items-center justify-center gap-2
            px-4 sm:px-6 py-2.5 sm:py-3
            bg-red-500 hover:bg-red-600
            dark:bg-red-600 dark:hover:bg-red-700
            text-white font-semibold text-sm sm:text-base
            rounded-lg
            shadow-md hover:shadow-lg
            transition-all duration-200
            active:scale-[0.98]
          "
        >
          <span className="text-lg leading-none">+</span>
          <span>New Asset</span>
        </Link>
      </div>
    </div>
  );
}
