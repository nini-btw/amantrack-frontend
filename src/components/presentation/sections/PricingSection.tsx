"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";

export default function PricingSection() {
  const t = useTranslations("presentation.pricing");

  const PLANS = [
    { key: "starter", highlight: false },
    { key: "professional", highlight: true },
    { key: "enterprise", highlight: false },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-[#0F0F0F] border-t border-[#2A2A2A] py-24 sm:py-32"
    >
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase bg-[rgba(239,68,68,0.08)] text-[#EF4444] border border-[rgba(239,68,68,0.25)]">
            {t("badge")}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {t("title")}
          </h2>

          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => {
            const price = t(`plans.${plan.key}.price`);
            const features = t.raw(`plans.${plan.key}.features`) as string[];

            return (
              <div
                key={plan.key}
                className={`relative rounded-2xl border p-10 transition-all duration-500 ${
                  plan.highlight
                    ? "border-[#EF4444] bg-[#1A1A1A] shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                    : "border-[#2A2A2A] bg-[#1A1A1A]"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 120}ms` : "0ms",
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EF4444] text-white text-xs font-semibold uppercase tracking-wide px-4 py-1 rounded-full">
                    {t("mostPopular")}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(`plans.${plan.key}.name`)}
                </h3>

                <p className="text-[#A3A3A3] mb-6 text-sm">
                  {t(`plans.${plan.key}.description`)}
                </p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{price}</span>
                  {price !== "Custom" && price !== "Free" && (
                    <span className="text-[#A3A3A3] ml-2">{t("perMonth")}</span>
                  )}
                </div>

                <ul className="space-y-4 mb-10">
                  {features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-red-500" />
                      <span className="text-[#E5E5E5] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={"/dashboard"}>
                  <button
                    className={`cursor-pointer w-full rounded-xl py-4 text-sm font-semibold transition-all ${
                      plan.highlight
                        ? "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-1"
                        : "bg-[#252525] text-white hover:bg-[#303030]"
                    }`}
                  >
                    {price === "Custom"
                      ? t("buttons.contactSales")
                      : t("buttons.startTrial")}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
