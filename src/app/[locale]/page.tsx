"use client";

import { useState } from "react";
import localFont from "next/font/local";
import { Noto_Kufi_Arabic } from "next/font/google"; // 1. Import Noto
import { useLocale } from "next-intl"; // 2. Import hook to check current language
import { PresentationNav } from "@/components/presentation/navigation/PresentationNav";
import { PresentationFooter } from "@/components/presentation/navigation/PresentationFooter";
import {
  HeroSection,
  FeaturesGrid,
  DashboardPreview,
  StatsSection,
  CTASection,
  PricingSection,
  ContactSection,
} from "@/components/presentation/sections";
import PrivacyPolicyModal from "@/components/presentation/sections/PrivacyPolicyModal";
import TermsModal from "@/components/presentation/sections/TermsModal";
import ProblemSolution from "@/components/presentation/sections/ProblemSolution";

// Load Satoshi font
const satoshi = localFont({
  src: "../../../public/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

// 3. Load Noto Kufi Arabic
const noto = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  display: "swap",
});

export default function LandingPage() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const locale = useLocale(); // 4. Get current locale

  // 5. Select font based on locale
  const fontClass = locale === "ar" ? noto.className : satoshi.className;

  return (
    // 6. Apply dynamic font class
    <div className={fontClass}>
      <PresentationNav />
      <main className="landing-page">
        <HeroSection />
        <FeaturesGrid />
        <DashboardPreview />
        <StatsSection />
        <ProblemSolution />
        <PricingSection />
        <CTASection />
        <ContactSection />
      </main>
      <PresentationFooter
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />
      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}
