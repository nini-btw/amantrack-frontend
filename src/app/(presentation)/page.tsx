import {
  HeroSection,
  FeaturesGrid,
  DashboardPreview,
  StatsSection,
  CTASection,
} from "@/components/presentation/sections";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesGrid />
      <DashboardPreview />
      <StatsSection />
      <CTASection />
    </div>
  );
}
