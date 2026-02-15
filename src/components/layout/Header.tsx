"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle-dashboard";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export function Header({ onMenuClick, isMobile }: HeaderProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  return (
    <header className="h-16 border-b border-[#e5e7eb] dark:border-[#2d3340] bg-white dark:bg-[#1b1f28] px-4 md:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        {/* Hamburger menu for mobile */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2e37] rounded-lg transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-[#111827] dark:text-[#e4e6eb]" />
          </button>
        )}

        <div>
          {/* Show title ONLY on dashboard */}
          {isDashboard && (
            <h2 className="text-xl md:text-2xl font-bold text-[#111827] dark:text-[#e4e6eb]">
              Dashboard
            </h2>
          )}

          <p className="text-xs md:text-sm text-[#6b7280] dark:text-[#9ca3af]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
