import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface StatusBadgeProps {
  status: "GREEN" | "YELLOW" | "RED";
  daysRemaining: number;
}

export function StatusBadge({ status, daysRemaining }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}
      >
        {getStatusLabel(status)}
      </span>
      <span className="text-sm text-gray-600">
        {daysRemaining > 0
          ? `${daysRemaining} days left`
          : `${Math.abs(daysRemaining)} days overdue`}
      </span>
    </div>
  );
}
