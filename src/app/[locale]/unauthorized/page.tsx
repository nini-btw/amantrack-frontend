"use client";

import { Link } from "@/routing";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
          <div className="text-left space-y-2">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Required Permissions:
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• This page requires specific role permissions</li>
              <li>• Contact your administrator to request access</li>
              <li>• Check if you're logged in with the correct account</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/dashboard"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Need help?{" "}
          <Link
            href="/support"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
