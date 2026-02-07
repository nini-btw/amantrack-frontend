"use client";

import Link from "next/link";
import { AssetForm } from "@/features/assets/components/AssetForm";

export default function NewAssetPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">🆕</span>
            New Fire Extinguisher
          </h1>
          <Link
            href="/assets"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to List
          </Link>
        </div>

        {/* Form */}
        <AssetForm />
      </div>
    </div>
  );
}
