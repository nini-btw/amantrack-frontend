"use client";

import { useState } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { PresentationNav } from "@/components/presentation/navigation/PresentationNav";
import { PresentationFooter } from "@/components/presentation/navigation/PresentationFooter";
import PrivacyPolicyModal from "@/components/presentation/sections/PrivacyPolicyModal";
import TermsModal from "@/components/presentation/sections/TermsModal";

const satoshi = localFont({
  src: "../../../public/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className={`${satoshi.className} ${inter.className}`}>
      <PresentationNav />

      <main className="presentation-main">{children}</main>

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
