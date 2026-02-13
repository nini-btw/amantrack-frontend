"use client";

import { useEffect, useRef, useState } from "react";
import {
  Package,
  ClipboardCheck,
  BarChart3,
  MapPin,
  Bell,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    title: "Asset Management",
    desc: "Track all safety assets with inspection schedules and compliance status.",
    icon: Package,
    color: "rgba(59, 130, 246, 0.1)",
  },
  {
    title: "Inspection Tracking",
    desc: "Log inspections, reminders, and compliance deadlines.",
    icon: ClipboardCheck,
    color: "rgba(34, 197, 94, 0.1)",
  },
  {
    title: "Real-time Reports",
    desc: "Generate audit-ready PDF and CSV reports instantly.",
    icon: BarChart3,
    color: "rgba(234, 179, 8, 0.1)",
  },
  {
    title: "Location Management",
    desc: "Organize assets across multiple facilities.",
    icon: MapPin,
    color: "rgba(168, 85, 247, 0.1)",
  },
  {
    title: "Smart Alerts",
    desc: "Automated alerts for expired assets and inspections.",
    icon: Bell,
    color: "rgba(239, 68, 68, 0.1)",
  },
  {
    title: "Mobile Access",
    desc: "Use anywhere on any device.",
    icon: Smartphone,
    color: "rgba(59, 130, 246, 0.1)",
  },
];

export default function FeaturesGrid() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-[#1A1A1A] border-t border-[#2A2A2A] py-20 sm:py-28 lg:py-32"
    >
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        {/* Header */}
        <div
          className={`
            text-center mb-16 sm:mb-20
            transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[rgba(239,68,68,0.08)] text-[#EF4444] border border-[rgba(239,68,68,0.25)]">
            Features
          </span>

          <h2 className=" text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight px-4">
            Everything you need to manage safety
          </h2>

          <p className="text-[#A3A3A3] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Powerful features designed for HSE professionals to streamline
            operations and ensure workplace safety.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className={`
                  group relative bg-[#0F0F0F] border border-[#2A2A2A]
                  rounded-2xl p-8 sm:p-10
                  transition-all duration-500
                  hover:-translate-y-2 hover:border-[#EF4444]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{
                  transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#EF4444] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl mb-5 sm:mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: f.color }}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className=" text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  {f.title}
                </h3>

                {/* Desc */}
                <p className="text-[#A3A3A3] leading-relaxed text-sm sm:text-base">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
