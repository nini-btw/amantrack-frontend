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
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Target,
  FileText,
  MapPin,
  Check,
  ArrowRight,
  X,
} from "lucide-react";

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

  // New: Compliance trend data (you can replace with actual data if available)

  const CustomPie = (props: any) => {
    return <Sector {...props} fill={props.payload.color} />;
  };

  const renderCustomizedLabel = (props: any) => {
    const { x, y, cx, payload, percent, name } = props;

    return (
      <text
        x={x}
        y={y}
        fill={payload.color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs sm:text-sm font-medium"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB]">
            {payload[0].name ||
              payload[0].payload.name ||
              payload[0].payload.subject}
          </p>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            {payload[0].dataKey === "value"
              ? "Count"
              : payload[0].dataKey === "compliance"
                ? "Rate"
                : "Assets"}
            :{" "}
            <span className="font-semibold text-[#111827] dark:text-[#E4E6EB]">
              {payload[0].value}
              {payload[0].dataKey === "compliance" ? "%" : ""}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    // Check screen width
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 640; // sm breakpoint in Tailwind

    return (
      <text
        x={x}
        y={y + 5} // move down a bit
        textAnchor={isSmallScreen ? "start" : "middle"}
        transform={isSmallScreen ? `rotate(+90, ${x}, ${y + 5})` : undefined}
        fill="#6B7280"
        fontSize={isSmallScreen ? 10 : 12}
        className="dark:fill-[#9CA3AF]"
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Summary Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            label: "Total Assets",
            value: statistics.total,
            color: "blue",
            icon: Package,
            bgColor: "bg-blue-50 dark:bg-blue-900/10",
            iconColor: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Valid",
            value: statistics.valid,
            color: "green",
            icon: CheckCircle2,
            bgColor: "bg-green-50 dark:bg-green-900/10",
            iconColor: "text-green-600 dark:text-green-400",
          },
          {
            label: "Warning",
            value: statistics.byStatus.YELLOW || 0,
            color: "yellow",
            icon: AlertTriangle,
            bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
            iconColor: "text-yellow-600 dark:text-yellow-400",
          },
          {
            label: "Expired",
            value: statistics.expired,
            color: "red",
            icon: AlertTriangle,
            bgColor: "bg-red-50 dark:bg-red-900/10",
            iconColor: "text-red-600 dark:text-red-400",
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="
                bg-white dark:bg-[#1B1F28]
                border border-[#E5E7EB] dark:border-[#2D3340]
                rounded-lg shadow-lg dark:shadow-none
                p-3 sm:p-4 lg:p-6 
                transition-all duration-200
                hover:shadow-xl hover:scale-105
                hover:border-[#D1D5DB] dark:hover:border-[#3D4350]
              "
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                  {card.label}
                </p>
                <div className={`${card.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827] dark:text-[#E4E6EB]">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Compliance Progress Bar - Full Width */}
      <div
        className="
        bg-white dark:bg-[#1B1F28]
        border border-[#E5E7EB] dark:border-[#2D3340]
        rounded-lg shadow-lg dark:shadow-none
        p-4 sm:p-5 lg:p-6
        transition-all duration-200
        hover:shadow-xl
      "
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-purple-50 dark:bg-purple-900/10 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
              Compliance Rate
            </h3>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
            {statistics.compliancePercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-linear-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 transition-all duration-500 ease-out flex items-center justify-end pr-3"
            style={{ width: `${statistics.compliancePercentage}%` }}
          >
            {statistics.compliancePercentage > 15 && (
              <span className="text-white text-xs sm:text-sm font-semibold">
                {statistics.compliancePercentage}%
              </span>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] text-center flex items-center justify-center gap-1">
          {statistics.compliancePercentage >= 90 ? (
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <Check className="w-4 h-4" />
              Excellent compliance level
            </span>
          ) : statistics.compliancePercentage >= 75 ? (
            <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
              <ArrowRight className="w-4 h-4" />
              Good compliance level
            </span>
          ) : statistics.compliancePercentage >= 50 ? (
            <span className="text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Moderate compliance level
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
              <X className="w-4 h-4" />
              Low compliance level - action required
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-5 bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded-lg">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
              Status Distribution
            </h3>
          </div>

          {statusData.length ? (
            <div className="flex-1 min-h-62.5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius="70%"
                    dataKey="value"
                    shape={CustomPie}
                    label={renderCustomizedLabel}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 min-h-62.5 flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]">
              <Target className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm">No data available</p>
            </div>
          )}

          {/* Legend */}
          {statusData.length > 0 && (
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 justify-center border-t border-[#E5E7EB] dark:border-[#2D3340] pt-4">
              {statusData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-7 bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
              Assets by Type
            </h3>
          </div>

          {typeData.length > 0 ? (
            <div className="flex-1 min-h-62.5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeData}
                  margin={{ top: 5, right: 5, left: -20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    className="dark:stroke-[#2D3340]"
                  />
                  <XAxis
                    dataKey="name"
                    tick={<CustomXAxisTick />}
                    className="dark:fill-[#9CA3AF] text-xs sm:text-sm"
                    angle={0} // <-- horizontal labels
                    textAnchor="middle" // center them
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    className="dark:fill-[#9CA3AF]"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload; // original data object
                        return (
                          <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB]">
                              {data.name} {/* <-- X-axis label */}
                            </p>
                            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                              Value:{" "}
                              <span className="font-semibold text-[#111827] dark:text-[#E4E6EB]">
                                {data.count} {/* <-- corresponding value */}
                              </span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 min-h-62.5 flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]">
              <FileText className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg shadow-lg dark:shadow-none p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-shadow duration-200">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="bg-green-50 dark:bg-green-900/10 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-[#111827] dark:text-[#E4E6EB]">
            Assets by Location
          </h3>
        </div>

        {locationData.length > 0 ? (
          <div className="w-full" style={{ height: "350px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                margin={{ top: 5, right: 20, left: -20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  className="dark:stroke-[#2D3340]"
                />
                <XAxis
                  dataKey="name"
                  tick={<CustomXAxisTick />}
                  className="dark:fill-[#9CA3AF] text-xs sm:text-sm"
                  angle={0} // <-- horizontal labels
                  textAnchor="middle"
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 11 }}
                  className="dark:fill-[#9CA3AF]"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload; // original data object
                      return (
                        <div className="bg-white dark:bg-[#1B1F28] border border-[#E5E7EB] dark:border-[#2D3340] rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-medium text-[#111827] dark:text-[#E4E6EB]">
                            {data.name} {/* <-- X-axis label */}
                          </p>
                          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                            Value:{" "}
                            <span className="font-semibold text-[#111827] dark:text-[#E4E6EB]">
                              {data.count} {/* <-- corresponding value */}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div
            className="w-full flex flex-col items-center justify-center text-[#6B7280] dark:text-[#9CA3AF]"
            style={{ height: "350px" }}
          >
            <MapPin className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
