"use client";

import { Save } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard.locations.form");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string).trim();
    const description = (formData.get("description") as string).trim();

    if (!name) return; // enforce required name
    onSubmit({ name, description: description || undefined });
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
      {/* Location Name (required) */}
      <div>
        <label
          htmlFor="location-name"
          className="block text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2"
        >
          {t("name.label")} <span className="text-red-500">*</span>
        </label>
        <input
          id="location-name"
          name="name"
          type="text"
          defaultValue={initialName}
          placeholder={t("name.placeholder")}
          required
          className="
            w-full rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#0D1117]
            text-[#111827] dark:text-[#E4E6EB]
            px-3 sm:px-4 py-2.5 sm:py-3
            text-sm sm:text-base
            outline-none
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
            focus:border-transparent
            transition-all
            placeholder:text-gray-400 dark:placeholder:text-gray-600
          "
        />
      </div>

      {/* Location Description (optional) */}
      <div>
        <label
          htmlFor="location-description"
          className="block text-sm font-medium text-[#111827] dark:text-[#E4E6EB] mb-2"
        >
          {t("description.label")}{" "}
          <span className="text-xs text-gray-500 font-normal">
            {t("description.optional")}
          </span>
        </label>
        <textarea
          id="location-description"
          name="description"
          defaultValue={initialDescription}
          placeholder={t("description.placeholder")}
          rows={3}
          className="
            w-full rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-[#0D1117]
            text-[#111827] dark:text-[#E4E6EB]
            px-3 sm:px-4 py-2.5 sm:py-3
            text-sm sm:text-base
            outline-none
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
            focus:border-transparent
            transition-all
            resize-none
            placeholder:text-gray-400 dark:placeholder:text-gray-600
          "
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="
            flex items-center justify-center gap-2
            px-5 sm:px-6 py-2.5 sm:py-3
            rounded-lg
            bg-green-600 hover:bg-green-700
            dark:bg-green-600 dark:hover:bg-green-700
            text-white font-medium
            text-sm sm:text-base
            cursor-pointer
            transition-all
            active:scale-95
            w-full sm:w-auto
          "
        >
          <Save className="w-4 h-4 sm:w-5 sm:h-5" />
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
