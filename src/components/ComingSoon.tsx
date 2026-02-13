"use client";

import { LucideIcon, Sparkles, Rocket, Clock, Hammer } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  variant?: "page" | "section" | "card";
  estimatedDate?: string;
  features?: string[];
}

export function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently under development. Stay tuned for updates!",
  icon: Icon = Sparkles,
  showBackButton = true,
  backHref = "/dashboard",
  backText = "Back to Dashboard",
  variant = "page",
  estimatedDate,
  features = [],
}: ComingSoonProps) {
  // Variant-specific styling
  const containerClasses = {
    page: "min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8",
    section: "py-12 sm:py-16 lg:py-20",
    card: "p-6 sm:p-8 lg:p-12",
  };

  const contentClasses = {
    page: "max-w-2xl mx-auto",
    section: "max-w-3xl mx-auto",
    card: "max-w-xl mx-auto",
  };

  return (
    <div className={containerClasses[variant]}>
      <div className={contentClasses[variant]}>
        <div className="bg-white dark:bg-[#1B1F28] rounded-2xl shadow-2xl dark:shadow-none border-2 border-[#E5E7EB] dark:border-[#2D3340] overflow-hidden">
          {/* Decorative Header Background */}
          <div className="relative bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12 border-b-2 border-[#E5E7EB] dark:border-[#2D3340]">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Icon Container */}
            <div className="relative flex justify-center mb-6">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

                {/* Icon */}
                <div className="relative bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-6 sm:p-8 rounded-2xl shadow-xl">
                  <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#111827] dark:text-[#E4E6EB] mb-3">
              {title}
            </h1>

            {/* Description */}
            <p className="relative text-sm sm:text-base lg:text-lg text-center text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto">
              {description}
            </p>
          </div>

          {/* Content Body */}
          <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-10 space-y-6 sm:space-y-8">
            {/* Estimated Date */}
            {estimatedDate && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 dark:bg-blue-500 p-2.5 rounded-lg shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-200 mb-0.5">
                      Estimated Release
                    </p>
                    <p className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
                      {estimatedDate}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Features List */}
            {features.length > 0 && (
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-purple-900 dark:text-purple-200">
                    What's Coming
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs sm:text-sm text-purple-800 dark:text-purple-300"
                    >
                      <div className="bg-purple-600 dark:bg-purple-500 p-1 rounded-full shrink-0 mt-0.5">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Under Construction Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-full">
                <Hammer className="w-4 h-4 text-yellow-600 dark:text-yellow-400 animate-bounce" />
                <span className="text-xs sm:text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                  Under Active Development
                </span>
              </div>
            </div>

            {/* Action Button */}
            {showBackButton && (
              <div className="flex justify-center pt-2">
                <Link
                  href={backHref}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 sm:px-8 py-3 sm:py-3.5
                    bg-linear-to-r from-blue-600 to-purple-600
                    hover:from-blue-700 hover:to-purple-700
                    dark:from-blue-500 dark:to-purple-500
                    dark:hover:from-blue-600 dark:hover:to-purple-600
                    text-white font-semibold text-sm sm:text-base
                    rounded-xl
                    shadow-lg hover:shadow-xl
                    transition-all duration-200
                    active:scale-[0.98]
                  "
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>{backText}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Text */}
        <p className="text-xs sm:text-sm text-center text-[#6B7280] dark:text-[#9CA3AF] mt-6 px-4">
          Have suggestions or feedback?{" "}
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Let us know
          </Link>
        </p>
      </div>
    </div>
  );
}
