"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description:
      "Perfect for small teams getting started with safety tracking.",
    features: [
      "Up to 100 assets",
      "Basic inspection logging",
      "Dashboard overview",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Professional",
    price: "$29",
    description: "Advanced tools for growing HSE teams.",
    features: [
      "Unlimited assets",
      "Advanced inspection tracking",
      "PDF & CSV exports",
      "Real-time statistics",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solution for large organizations.",
    features: [
      "Multi-location management",
      "Role-based access",
      "Dedicated onboarding",
      "Custom integrations",
      "Enterprise SLA",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
            Pricing
          </span>

          <h2 className=" text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h2>

          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto leading-relaxed">
            Choose a plan that fits your organization’s size and compliance
            needs.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
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
                  Most Popular
                </div>
              )}

              <h3 className=" text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>

              <p className="text-[#A3A3A3] mb-6 text-sm">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white ">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && plan.price !== "Free" && (
                  <span className="text-[#A3A3A3] ml-2">/month</span>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-red-500" />
                    <span className="text-[#E5E5E5] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={"/dashboard"}>
                {" "}
                <button
                  className={`w-full rounded-xl py-4 text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-1"
                      : "bg-[#252525] text-white hover:bg-[#303030]"
                  }`}
                >
                  {plan.price === "Custom"
                    ? "Contact Sales"
                    : "Start Free Trial"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
