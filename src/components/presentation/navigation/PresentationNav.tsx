"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

export function PresentationNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
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
        <div className="max-w-350 mx-auto px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl text-white hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Logo color="#fff" width={32} height={32} />
              <h1 className="text-xl sm:text-2xl font-bold font-['Syne']">
                <span className="text-red-500">Aman</span>
                <span className="text-white">Track</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#features"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              Features
            </Link>
            <Link
              href="#dashboard"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              Dashboard
            </Link>
            <Link
              href="#pricing"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-[#A3A3A3] hover:text-white transition-colors font-medium text-[0.95rem]"
            >
              Contact
            </Link>
            <Link
              href="#demo"
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)]"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-55 bg-[rgba(0,0,0,0.95)] backdrop-blur-xl
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
        {/* Close Button - Modern X */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 z-60 text-white hover:text-[#EF4444] transition-all duration-200 hover:rotate-90 p-2"
          aria-label="Close menu"
        >
          <X size={32} strokeWidth={2} />
        </button>

        <div
          className="h-full w-full flex flex-col items-center justify-center gap-6 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            Features
          </Link>

          <Link
            href="#dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            Dashboard
          </Link>

          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            Pricing
          </Link>

          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#EF4444] transition-colors text-2xl font-medium"
          >
            Contact
          </Link>

          <Link
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold px-10 py-5 rounded-xl transition-all shadow-xl hover:shadow-[0_12px_30px_rgba(239,68,68,0.4)] text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </>
  );
}
