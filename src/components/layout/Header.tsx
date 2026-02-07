"use client";

import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/assets": "Asset Management",
  "/locations": "Locations",
  "/statistics": "Statistics & Reports",
  "/reports": "Reports",
};

export function Header() {
  const pathname = usePathname();

  // Get page name, handling dynamic routes
  let pageName = pageNames[pathname] || "Details";
  if (pathname.startsWith("/assets/new")) {
    pageName = "New Asset";
  } else if (pathname.startsWith("/assets/") && pathname !== "/assets") {
    pageName = "Asset Details";
  }

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{pageName}</h2>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <span className="text-2xl">🔔</span>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Settings */}
        <button className="rounded-full p-2 hover:bg-gray-100">
          <span className="text-2xl">⚙️</span>
        </button>
      </div>
    </header>
  );
}
