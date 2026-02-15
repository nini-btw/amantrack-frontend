"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/routing";
import { Globe, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
  },
];

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languageToggle");

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    if (langCode === locale) {
      setIsOpen(false);
      return;
    }

    router.replace(pathname, { locale: langCode });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button - Matching ThemeToggle style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer relative"
        aria-label={`${t("currentLanguage")}: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={currentLanguage.name}
      >
        {/* Globe icon */}
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />

        {/* Small language indicator badge with RED color */}
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[9px] font-bold bg-red-500 text-white rounded-full border-2 border-white dark:border-gray-800 uppercase">
          {currentLanguage.code}
        </span>
      </button>

      {/* Dropdown Menu - RTL support for Arabic */}
      {isOpen && (
        <div
          className={`absolute ${
            locale === "ar" ? "left-0" : "right-0"
          } mt-2 w-64 bg-white dark:bg-[#2d3340] border border-[#e5e7eb] dark:border-[#3b3f50] rounded-lg shadow-xl dark:shadow-2xl overflow-hidden z-50 animate-fadeIn`}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#e5e7eb] dark:border-[#3b3f50] bg-gray-50 dark:bg-[#1b1f28]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6b7280] dark:text-[#9ca3af]" />
              <span className="text-sm font-semibold text-[#111827] dark:text-[#e4e6eb]">
                {t("title")}
              </span>
            </div>
          </div>

          {/* Language Options */}
          <div className="py-1">
            {LANGUAGES.map((language) => {
              const isActive = language.code === locale;

              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-3 flex items-center justify-between transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-red-50 dark:bg-red-900/20 cursor-default"
                      : "hover:bg-gray-100 dark:hover:bg-[#3b3f50] hover:shadow-sm"
                  }`}
                  disabled={isActive}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Flag with hover effect */}
                    <span
                      className={`text-2xl leading-none transition-transform duration-200 ${
                        !isActive ? "group-hover:scale-110" : ""
                      }`}
                    >
                      {language.flag}
                    </span>

                    {/* Language names */}
                    <div className="flex flex-col items-start flex-1">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive
                            ? "text-red-600 dark:text-red-400"
                            : "text-[#111827] dark:text-[#e4e6eb] group-hover:text-red-600 dark:group-hover:text-red-400"
                        }`}
                      >
                        {language.name}
                      </span>
                      <span
                        className={`text-xs transition-colors ${
                          isActive
                            ? "text-red-500 dark:text-red-300"
                            : "text-[#6b7280] dark:text-[#9ca3af] group-hover:text-red-500 dark:group-hover:text-red-300"
                        }`}
                        dir={language.code === "ar" ? "rtl" : "ltr"}
                      >
                        {language.nativeName}
                      </span>
                    </div>
                  </div>

                  {/* Check mark for active language */}
                  {isActive && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-red-600 dark:text-red-400 uppercase">
                        {t("active")}
                      </span>
                      <Check className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-[#e5e7eb] dark:border-[#3b3f50] bg-gray-50 dark:bg-[#1b1f28]">
            <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] text-center">
              {t("hint")}
            </p>
          </div>
        </div>
      )}

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
