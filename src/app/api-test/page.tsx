"use client";

import { useState } from "react";
import { assetsService } from "@/services/assets.service";
import { locationsService } from "@/services/locations.service";
import { statisticsService } from "@/services/statistics.service";

export default function ApiTestPage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  const testEndpoint = async (name: string, testFn: () => Promise<any>) => {
    setLoading(name);
    setErrors((prev: any) => ({ ...prev, [name]: null }));

    try {
      const data = await testFn();
      setResults((prev: any) => ({ ...prev, [name]: data }));
    } catch (error: any) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: error.response?.data || error.message,
      }));
    } finally {
      setLoading(null);
    }
  };

  const tests = [
    {
      name: "GET /assets",
      fn: () => assetsService.getAll(),
      description: "Fetch all assets",
    },
    {
      name: "GET /locations",
      fn: () => locationsService.getAll(),
      description: "Fetch all locations",
    },
    {
      name: "GET /statistics",
      fn: () => statisticsService.get(),
      description: "Fetch statistics",
    },
    {
      name: "POST /locations",
      fn: () =>
        locationsService.create({
          name: "Test Location " + Date.now(),
          description: "Created from API test",
        }),
      description: "Create a test location",
    },
    {
      name: "POST /assets",
      fn: async () => {
        const locations = await locationsService.getAll();
        if (!locations.length) throw new Error("Create a location first");

        return assetsService.create({
          referenceNumber: "TEST-" + Date.now(),
          type: "CO2",
          locationId: locations[0].id,
          class: "A, B, C",
          weightKg: 6,
          visualInspectionDate: new Date().toISOString(),
          officialInspectionDate: new Date().toISOString(),
        });
      },
      description: "Create a test asset",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black p-8 text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="border rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">🧪 API Connection Test</h1>

          <p className="mb-4">
            Backend:
            <code className="ml-2 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}
            </code>
          </p>

          <div className="flex gap-2 p-3 border rounded">
            ℹ️ Make sure backend is running on <strong>localhost:3001</strong>
          </div>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.name} className="border rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{test.name}</h3>
                  <p>{test.description}</p>
                </div>

                <button
                  onClick={() => testEndpoint(test.name, test.fn)}
                  disabled={loading === test.name}
                  className={`px-4 py-2 rounded text-white ${
                    loading === test.name
                      ? "bg-gray-400"
                      : results[test.name]
                        ? "bg-green-600"
                        : errors[test.name]
                          ? "bg-red-600"
                          : "bg-blue-600"
                  }`}
                >
                  {loading === test.name ? "Testing..." : "Test"}
                </button>
              </div>

              {results[test.name] && (
                <pre className="bg-green-50 text-black p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(results[test.name], null, 2)}
                </pre>
              )}

              {errors[test.name] && (
                <pre className="bg-red-50 text-black p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(errors[test.name], null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={async () => {
              for (const test of tests) {
                await testEndpoint(test.name, test.fn);
                await new Promise((r) => setTimeout(r, 500));
              }
            }}
            disabled={loading !== null}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg"
          >
            Run All Tests
          </button>
        </div>
      </div>
    </div>
  );
}
