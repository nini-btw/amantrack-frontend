"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { User, Settings, LogOut } from "lucide-react";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Adjust dropdown position and width based on sidebar state
  const dropdownWidth = isCollapsed ? 200 : 235; // px

  return (
    <div className="border-t border-gray-800 p-4 relative">
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700"
        >
          <User size={20} />
        </button>

        {!isCollapsed && (
          <div className="flex-1">
            <p className="text-sm font-medium">HSE Manager</p>
            <p className="text-xs text-gray-400">Organization 1</p>
          </div>
        )}
      </div>

      {isDropdownOpen &&
        createPortal(
          <div
            style={{ width: `${dropdownWidth}px`, left: 10 }}
            className="fixed bottom-20 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer">
              <User size={16} />
              <span>Profile</span>
            </button>
            <div className="border-t border-gray-700 my-1"></div>{" "}
            {/* Divider */}
            <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <div className="border-t border-gray-700 my-1"></div>{" "}
            {/* Divider */}
            <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
