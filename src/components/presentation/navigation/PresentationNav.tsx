"use client";

import { useState, useEffect } from "react";
import { Link } from "@/routing";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useTranslations, useLocale } from "next-intl";
import LanguageToggle from "@/components/LanguageToggle-presentation";
import ThemeToggle from "@/components/ThemeToggle";

export function PresentationNav() {
  const t = useTranslations("presentation.nav");
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine if current locale is RTL
  const isRTL = locale === "ar";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(15,15,15,0.85)] backdrop-blur-xl border-b border-[#2A2A2A]">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="max-w-7xl mx-auto px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl text-white hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Logo color="#fff" width={32} height={32} />
              <h1 className="text-xl sm:text-2xl font-bold">
                <span className="text-red-500">Aman</span>
                <span className="text-white">Track</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Links & Actions */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="#features"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              {t("features")}
            </Link>
            <Link
              href="#pricing"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              {t("pricing")}
            </Link>
            <Link
              href="#contact"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              {t("contact")}
            </Link>

            {/* Theme & Language Toggles */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
            </div>

            <Link
              href="/dashboard"
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)]"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme & Language Toggles for Mobile */}
            <LanguageToggle />

            {/* Mobile Menu Toggle */}
            <button
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t("aria.toggle")}
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-60 bg-[rgba(0,0,0,0.95)] backdrop-blur-xl
          md:hidden
          transition-all duration-300 ease-in-out
          ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        role="dialog"
        aria-modal="true"
        onClick={() => setMobileMenuOpen(false)}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute top-6 z-70 text-white hover:text-[#EF4444] transition-all duration-200 hover:rotate-90 p-2 ${
            isRTL ? "left-6" : "right-6"
          }`}
          aria-label={t("aria.close")}
        >
          <X size={32} strokeWidth={2} />
        </button>

        <div
          className="h-full w-full flex flex-col items-center justify-center gap-6 px-6"
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            {t("features")}
          </Link>

          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            {t("pricing")}
          </Link>

          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            {t("contact")}
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold px-10 py-5 rounded-xl transition-all shadow-xl hover:shadow-[0_12px_30px_rgba(239,68,68,0.4)] text-lg"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </>
  );
}
