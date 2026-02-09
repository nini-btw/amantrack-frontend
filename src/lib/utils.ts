import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string | Date,
  formatStr: string = "dd/MM/yyyy",
): string {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  if (formatStr === "dd/MM/yyyy") {
    return `${day}/${month}/${year}`;
  }

  return dateObj.toLocaleDateString();
}

export function getStatusColor(status: "GREEN" | "YELLOW" | "RED") {
  switch (status) {
    case "GREEN":
      return "bg-green-100 text-green-800 border-green-300";
    case "YELLOW":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "RED":
      return "bg-red-100 text-red-800 border-red-300";
  }
}

export function getStatusLabel(status: "GREEN" | "YELLOW" | "RED") {
  switch (status) {
    case "GREEN":
      return "VALID";
    case "YELLOW":
      return "WARNING";
    case "RED":
      return "EXPIRED";
  }
}

export function getRowBackgroundColor(status: "GREEN" | "YELLOW" | "RED") {
  switch (status) {
    case "RED":
      return "bg-red-50";
    case "YELLOW":
      return "bg-yellow-50";
    default:
      return "";
  }
}

export function resolveAssetIdentifier(value: string): {
  assetId?: string;
  assetRef?: string;
} {
  const v = value.trim();

  // UUID v4 pattern
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (uuidRegex.test(v)) {
    return { assetId: v };
  }

  // Default to reference
  return { assetRef: v };
}
