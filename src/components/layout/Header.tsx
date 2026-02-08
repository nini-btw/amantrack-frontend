"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/assets": "Asset Management",
  "/locations": "Locations",
  "/statistics": "Statistics & Reports",
  "/reports": "Reports",
};

export function Header() {
  const pathname = usePathname();

  let pageName = pageNames[pathname] || "Details";
  if (pathname.startsWith("/assets/new")) pageName = "New Asset";
  else if (pathname.startsWith("/assets/") && pathname !== "/assets")
    pageName = "Asset Details";

  return (
    <header className="h-16 border-b border-[#e5e7eb] dark:border-[#2d3340] bg-white dark:bg-[#1b1f28] px-8 flex items-center justify-between transition-colors">
      <div>
        <h2 className="text-2xl font-bold text-[#111827] dark:text-[#e4e6eb]">
          {pageName}
        </h2>
        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
