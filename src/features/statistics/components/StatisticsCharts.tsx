"use client";

import { Statistics } from "@/types/statistics.types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatisticsChartsProps {
  statistics: Statistics;
}

const COLORS = {
  GREEN: "#10b981",
  YELLOW: "#f59e0b",
  RED: "#ef4444",
};

export function StatisticsCharts({ statistics }: StatisticsChartsProps) {
  const statusData = [
    {
      name: "Valid",
      value: statistics.byStatus.GREEN || 0,
      color: COLORS.GREEN,
    },
    {
      name: "Warning",
      value: statistics.byStatus.YELLOW || 0,
      color: COLORS.YELLOW,
    },
    { name: "Expired", value: statistics.byStatus.RED || 0, color: COLORS.RED },
  ].filter((i) => i.value > 0);

  const typeData = Object.entries(statistics.byType).map(([name, value]) => ({
    name,
    count: value,
  }));

  const locationData = Object.entries(statistics.byLocation).map(
    ([name, value]) => ({
      name,
      count: value,
    }),
  );

  const CustomPie = (props: any) => {
    return <Sector {...props} fill={props.payload.color} />;
  };

  // --- NEW: Custom Label Function ---
  const renderCustomizedLabel = (props: any) => {
    const { x, y, cx, payload, percent, name } = props;

    return (
      <text
        x={x}
        y={y}
        fill={payload.color} // Uses the color defined in your data
        textAnchor={x > cx ? "start" : "end"} // Aligns text to avoid overlapping the line
        dominantBaseline="central"
        className="text-sm font-medium" // Optional: Tailwind classes for font size
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ... (Your existing Summary Cards code remains unchanged) ... */}
        {[
          {
            label: "Total Assets",
            value: statistics.total,
            color: "blue",
          },
          {
            label: "Valid",
            value: statistics.valid,
            color: "green",
          },
          {
            label: "Expired",
            value: statistics.expired,
            color: "red",
          },
          {
            label: "Compliance",
            value: `${statistics.compliancePercentage}%`,
            color: "purple",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="
              bg-white dark:bg-[#1B1F28]
              border border-[#E5E7EB] dark:border-[#2D3340]
              rounded-lg shadow-lg dark:shadow-none
              p-6 transition-all hover:shadow-xl
            "
          >
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-1">
              {card.label}
            </p>
            <p className="text-3xl font-bold text-[#111827] dark:text-[#E4E6EB]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Pie */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-6">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-4">
            Status Distribution
          </h3>

          {statusData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true} // Ensure the line connects to the text
                  outerRadius={100}
                  dataKey="value"
                  shape={CustomPie}
                  label={renderCustomizedLabel} // <--- Pass the custom function here
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]">
              No data
            </div>
          )}
        </div>

        {/* ... (Rest of your component remains unchanged) ... */}

        {/* By Type */}
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-6">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-4">
            Assets by Type
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  color: "#bbbbbb",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By Location */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-6">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#E4E6EB] mb-4">
            Assets by Location
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  color: "#bbbbbb",
                }}
              />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
