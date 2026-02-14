"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { User, Settings, LogOut, Info } from "lucide-react";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  const t = useTranslations("dashboard.sidebar.footer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownWidth = isCollapsed ? 200 : 235;

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Handle Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsDropdownOpen(false);
    }
    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isDropdownOpen]);

  const menuItems = [
    { href: "/profile", icon: User, label: t("profile") },
    { href: "/settings", icon: Settings, label: t("settings") },
    { href: "/", icon: LogOut, label: t("logout") },
    { href: "/", icon: Info, label: t("about") },
  ];

  return (
    <div className="border-t border-gray-800 p-4 relative">
      <div className="flex items-center gap-3 justify-center">
        <button
          ref={buttonRef}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer text-white"
        >
          <User size={20} />
        </button>

        {!isCollapsed && (
          // Use text-start to align right in Arabic and left in English
          <div className="flex-1 text-start">
            <p className="text-sm font-medium text-white truncate">
              {t("roles.hseManager")}
            </p>
            <p className="text-xs text-gray-400">Organization 1</p>
          </div>
        )}
      </div>

      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              width: `${dropdownWidth}px`,
              // This logical property replaces 'left: 10px'
              // It automatically becomes 'right: 10px' in RTL mode
              insetInlineStart: "10px",
            }}
            className="fixed bottom-20 bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-700 text-start shadow-black/50"
          >
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setIsDropdownOpen(false)}>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer group">
                    {/* shrink-0 prevents the icon from squishing if text is long */}
                    <item.icon size={16} className="shrink-0" />
                    <span className="text-sm whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                </Link>
                {/* Separator logic: skip after the last item */}
                {index < menuItems.length - 1 && (
                  <div className="border-t border-gray-700 my-1 mx-2" />
                )}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
