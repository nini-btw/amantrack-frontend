import { getStatusLabel } from "@/lib/utils";

interface StatusBadgeProps {
  status: "GREEN" | "YELLOW" | "RED";
  daysRemaining: number;
}

export function StatusBadge({ status, daysRemaining }: StatusBadgeProps) {
  const getDarkColor = () => {
    switch (status) {
      case "GREEN":
        return "dark:bg-green-700 dark:text-green-100 dark:border-green-600";
      case "YELLOW":
        return "dark:bg-yellow-700 dark:text-yellow-100 dark:border-yellow-600";
      case "RED":
        return "dark:bg-red-700 dark:text-red-100 dark:border-red-600";
    }
  };

  const getLightColor = () => {
    switch (status) {
      case "GREEN":
        return "bg-green-100 text-green-800 border-green-300";
      case "YELLOW":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "RED":
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-1 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs lg:text-sm font-medium border 
          ${getLightColor()} ${getDarkColor()}`}
      >
        {getStatusLabel(status)}
      </span>
      <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
        {daysRemaining > 0
          ? `${daysRemaining} days left`
          : `${Math.abs(daysRemaining)} days overdue`}
      </span>
    </div>
  );
}
