"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

export function PresentationFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A] text-white">
      <div className="max-w-350 mx-auto px-6 sm:px-8 py-16 sm:py-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-5">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity"
            >
              <Logo color="#fff" width={32} height={32} />
              <h2 className="text-2xl font-bold font-['Syne']">
                <span className="text-[#EF4444]">Aman</span>
                <span className="text-white">Track</span>
              </h2>
            </Link>

            <p className="text-[#A3A3A3] leading-relaxed max-w-sm text-sm sm:text-base">
              Professional HSE safety equipment tracking and compliance
              management for modern organizations.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:contact@amantrack.com"
                className="flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors"
              >
                <Mail size={16} className="shrink-0" />
                <span className="break-all">contact@amantrack.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors"
              >
                <Phone size={16} className="shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>

              <div className="flex items-center gap-2 text-[#A3A3A3]">
                <MapPin size={16} className="shrink-0" />
                <span>Oran, Algeria</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base sm:text-lg font-['Syne']">
              Product
            </h4>
            <div className="flex flex-col gap-3 text-[#A3A3A3] text-sm sm:text-base">
              <Link
                href="#features"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Pricing
              </Link>
              <Link
                href="#demo"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Request Demo
              </Link>
              <Link
                href="#showcase"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base sm:text-lg font-['Syne']">
              Company
            </h4>
            <div className="flex flex-col gap-3 text-[#A3A3A3] text-sm sm:text-base">
              <Link
                href="/about"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Contact
              </Link>
              <Link
                href="/careers"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Careers
              </Link>
              <Link
                href="/blog"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base sm:text-lg font-['Syne']">
              Support
            </h4>
            <div className="flex flex-col gap-3 text-[#A3A3A3] text-sm sm:text-base">
              <Link
                href="/docs"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Documentation
              </Link>
              <Link
                href="/help"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Help Center
              </Link>
              <Link
                href="/login"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Sign In
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#EF4444] transition-colors w-fit"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#737373] text-xs sm:text-sm">
          <p className="text-center sm:text-left">
            © {currentYear} AmanTrack. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
