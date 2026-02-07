"use client";

import { Statistics } from "@/types/statistics.types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  // Status Distribution (Pie Chart)
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
  ].filter((item) => item.value > 0);

  // By Type (Bar Chart)
  const typeData = Object.entries(statistics.byType).map(([name, value]) => ({
    name,
    count: value,
  }));

  // By Location (Bar Chart)
  const locationData = Object.entries(statistics.byLocation).map(
    ([name, value]) => ({
      name,
      count: value,
    }),
  );

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Total Assets
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {statistics.total}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="text-sm font-medium text-gray-600 mb-1">Valid</div>
          <div className="text-3xl font-bold text-green-600">
            {statistics.valid}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <div className="text-sm font-medium text-gray-600 mb-1">Expired</div>
          <div className="text-3xl font-bold text-red-600">
            {statistics.expired}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Compliance
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {statistics.compliancePercentage}%
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Status Distribution
          </h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent = 0 }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* By Type Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Assets by Type
          </h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* By Location Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Assets by Location
          </h3>
          {locationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
