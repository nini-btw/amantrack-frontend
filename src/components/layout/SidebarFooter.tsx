"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { User, Settings, LogOut, Info } from "lucide-react";
import Link from "next/link";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Adjust dropdown position and width based on sidebar state
  const dropdownWidth = isCollapsed ? 200 : 235; // px

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click is outside both the button and the dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    // Only add listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isDropdownOpen]);

  return (
    <div className="border-t border-gray-800 p-4 relative">
      <div className="flex items-center gap-3 justify-center">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
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
            ref={dropdownRef}
            style={{ width: `${dropdownWidth}px`, left: 10 }}
            className="fixed bottom-20 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <Link href={"/profile"} onClick={() => setIsDropdownOpen(false)}>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
                <User size={16} />
                <span>Profile</span>
              </button>
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <Link href={"/settings"} onClick={() => setIsDropdownOpen(false)}>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <Link href={"/"} onClick={() => setIsDropdownOpen(false)}>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </Link>
            <div className="border-t border-gray-700 my-1"></div>
            <Link href={"/"} onClick={() => setIsDropdownOpen(false)}>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer">
                <Info size={16} />
                <span>About Aman Track</span>
              </button>
            </Link>
          </div>,
          document.body,
        )}
    </div>
  );
}
