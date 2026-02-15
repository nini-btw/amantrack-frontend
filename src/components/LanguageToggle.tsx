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

  // Determine if current locale is RTL
  const isRTL = locale === "ar";

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
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer relative"
        aria-label={`${t("currentLanguage")}: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={currentLanguage.name}
      >
        {/* Globe icon */}
        <Globe className="w-5 h-5 text-[#A3A3A3] hover:text-white transition-colors" />

        {/* Small language indicator badge */}
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[9px] font-bold bg-[#EF4444] text-white rounded-full border-2 border-[rgba(15,15,15,0.85)] uppercase">
          {currentLanguage.code}
        </span>
      </button>

      {/* Dropdown Menu - RTL support */}
      {isOpen && (
        <div
          className={`absolute ${
            isRTL ? "left-0" : "right-0"
          } mt-2 w-64 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-2xl overflow-hidden z-100 animate-fadeIn`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#2A2A2A] bg-[#0F0F0F]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#A3A3A3]" />
              <span className="text-sm font-semibold text-white">
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
                  className={`w-full px-4 py-3 flex items-center justify-between transition-all duration-200 group ${
                    isActive
                      ? "bg-[#EF4444]/10 cursor-default"
                      : "hover:bg-white/5 hover:shadow-sm cursor-pointer"
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
                            ? "text-[#EF4444]"
                            : "text-white group-hover:text-[#EF4444]"
                        }`}
                      >
                        {language.name}
                      </span>
                      <span
                        className={`text-xs transition-colors ${
                          isActive
                            ? "text-[#EF4444]/80"
                            : "text-[#A3A3A3] group-hover:text-[#EF4444]/80"
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
                      <span className="text-xs font-medium text-[#EF4444] uppercase">
                        {t("active")}
                      </span>
                      <Check className="w-5 h-5 text-[#EF4444] shrink-0" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-[#2A2A2A] bg-[#0F0F0F]">
            <p className="text-xs text-[#A3A3A3] text-center">{t("hint")}</p>
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
