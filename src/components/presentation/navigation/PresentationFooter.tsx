"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

interface PresentationFooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function PresentationFooter({
  onOpenPrivacy,
  onOpenTerms,
}: PresentationFooterProps) {
  const currentYear = new Date().getFullYear();

  const linkStyle =
    "cursor-pointer text-sm text-[#A3A3A3] hover:text-[#EF4444] transition-colors";

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="space-y-5">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Logo color="#fff" width={32} height={32} />
              <h2 className="text-2xl font-bold">
                <span className="text-[#EF4444]">Aman</span>
                <span className="text-white">Track</span>
              </h2>
            </Link>

            <p className="text-[#A3A3A3] leading-relaxed text-sm max-w-sm">
              Professional HSE safety equipment tracking and compliance
              management for modern organizations.
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#A3A3A3]">
              <a
                href="mailto:contact@amantrack.com"
                className="flex items-center gap-2 cursor-pointer hover:text-[#EF4444] transition-colors"
              >
                <Mail size={16} />
                contact@amantrack.com
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 cursor-pointer hover:text-[#EF4444] transition-colors"
              >
                <Phone size={16} />
                +1 (234) 567-890
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Oran, Algeria
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8">
            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Product</h4>
              <div className="flex flex-col gap-3 items-start">
                <Link href="#features" className={linkStyle}>
                  Features
                </Link>
                <Link href="#pricing" className={linkStyle}>
                  Pricing
                </Link>
                <Link href="/login" className={linkStyle}>
                  Sign In
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Company</h4>
              <div className="flex flex-col gap-3 items-start">
                <Link href="#contact" className={linkStyle}>
                  Contact
                </Link>

                <button
                  onClick={onOpenPrivacy}
                  className={`${linkStyle} text-left`}
                >
                  Privacy
                </button>

                <button
                  onClick={onOpenTerms}
                  className={`${linkStyle} text-left`}
                >
                  Terms
                </button>
              </div>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-white mb-2">
                Start Managing Smarter
              </h4>
              <p className="text-sm text-[#A3A3A3] mb-6">
                Track inspections, ensure compliance, and simplify HSE
                operations.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="cursor-pointer w-full text-center rounded-lg bg-[#EF4444] py-3 text-sm font-semibold text-white hover:bg-[#DC2626] transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#737373] text-xs sm:text-sm">
          <p className="text-center sm:text-left">
            © {currentYear} AmanTrack. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            <button
              onClick={onOpenPrivacy}
              className="cursor-pointer hover:text-[#EF4444] transition-colors"
            >
              Privacy
            </button>

            <button
              onClick={onOpenTerms}
              className="cursor-pointer hover:text-[#EF4444] transition-colors"
            >
              Terms
            </button>

            <Link
              href="/cookies"
              className="cursor-pointer hover:text-[#EF4444] transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
