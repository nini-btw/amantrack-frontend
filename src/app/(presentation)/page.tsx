"use client";

import { useState } from "react";
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

export default function LandingPage() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesGrid />
      <DashboardPreview />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <ContactSection />

      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </div>
  );
}
