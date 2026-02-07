"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateAsset } from "../hooks/useAssets";
import { useLocations } from "@/features/locations/hooks/useLocations";
import { ASSET_TYPES, ASSET_CLASSES } from "@/config/constants";

export function AssetForm() {
  const router = useRouter();
  const { data: locations = [], isLoading: loadingLocations } = useLocations();
  const createAsset = useCreateAsset();

  const [formData, setFormData] = useState({
    referenceNumber: "",
    type: "CO2",
    locationId: "",
    class: "A, B, C",
    weightKg: 6,
    visualInspectionDate: new Date().toISOString().split("T")[0],
    officialInspectionDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createAsset.mutateAsync({
        ...formData,
        weightKg: Number(formData.weightKg),
        visualInspectionDate: new Date(
          formData.visualInspectionDate,
        ).toISOString(),
        officialInspectionDate: new Date(
          formData.officialInspectionDate,
        ).toISOString(),
      });

      router.push("/assets");
    } catch (error) {
      console.error("Failed to create asset:", error);
      alert("Failed to create asset. Please try again.");
    }
  };

  if (loadingLocations) {
    return <div className="text-center py-8">Loading locations...</div>;
  }

  if (locations.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800 mb-4">
          ⚠️ No locations available. You need to create at least one location
          first.
        </p>
        <button
          onClick={() => router.push("/locations/new")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Create Location
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow"
    >
      {/* Reference Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reference Number *
        </label>
        <input
          type="text"
          required
          value={formData.referenceNumber}
          onChange={(e) =>
            setFormData({ ...formData, referenceNumber: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., M1C001"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type *
        </label>
        <select
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {ASSET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <select
          required
          value={formData.locationId}
          onChange={(e) =>
            setFormData({ ...formData, locationId: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {/* Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Class *
        </label>
        <select
          required
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {ASSET_CLASSES.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weight (kg) *
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.1"
          value={formData.weightKg}
          onChange={(e) =>
            setFormData({ ...formData, weightKg: Number(e.target.value) })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Visual Inspection Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Visual Inspection Date *
        </label>
        <input
          type="date"
          required
          value={formData.visualInspectionDate}
          onChange={(e) =>
            setFormData({ ...formData, visualInspectionDate: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Official Inspection Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Official Inspection Date *
        </label>
        <input
          type="date"
          required
          value={formData.officialInspectionDate}
          onChange={(e) =>
            setFormData({ ...formData, officialInspectionDate: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={createAsset.isPending}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {createAsset.isPending ? "Creating..." : "Create Asset"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
