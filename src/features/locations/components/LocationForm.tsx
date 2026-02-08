"use client";

import { Save } from "lucide-react";

type Props = {
  initialName?: string;
  initialDescription?: string;
  onSubmit: (data: { name: string; description?: string }) => void;
};

export default function LocationForm({
  initialName = "",
  initialDescription = "",
  onSubmit,
}: Props) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (new FormData(form).get("name") as string).trim();
        const description = (
          new FormData(form).get("description") as string
        ).trim();
        if (!name) return; // enforce required name
        onSubmit({ name, description: description || undefined });
      }}
    >
      {/* Location Name (required) */}
      <input
        name="name"
        defaultValue={initialName}
        placeholder="Location name"
        required
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm outline-none"
      />

      {/* Location Description (optional) */}
      <textarea
        name="description"
        defaultValue={initialDescription}
        placeholder="Description (optional)"
        rows={3}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm outline-none resize-none"
      />

      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm cursor-pointer"
      >
        <Save className="w-4 h-4" />
        Save
      </button>
    </form>
  );
}
