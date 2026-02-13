"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "5,000+", label: "Assets Tracked" },
  { value: "99.2%", label: "System Uptime" },
  { value: "45min", label: "Saved Per Inspector / Week" },
  { value: "100%", label: "Audit Ready" },
];

export default function StatsSection() {
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
      className="py-20 sm:py-28 lg:py-32 bg-linear-to-br from-[#1A1A1A] to-[#0F0F0F] border-t border-[#2A2A2A]"
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
            Impact
          </span>

          <h2 className=" text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight px-4">
            Trusted by safety teams
          </h2>

          <p className="text-[#A3A3A3] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Join organizations that have transformed their safety management
            with AmanTrack.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`
                group text-center
                bg-[#0F0F0F] border border-[#2A2A2A]
                rounded-xl sm:rounded-2xl
                px-6 sm:px-8 py-10 sm:py-12
                transition-all duration-500
                hover:-translate-y-2 hover:border-[#EF4444]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              {/* Value with scale animation */}
              <div
                className={`
                   text-4xl sm:text-5xl font-extrabold
                  text-[#EF4444] mb-2 sm:mb-3 tracking-tight
                  transition-transform duration-700
                  ${isVisible ? "scale-100" : "scale-75"}
                `}
                style={{
                  transitionDelay: isVisible ? `${i * 100 + 200}ms` : "0ms",
                }}
              >
                {s.value}
              </div>

              {/* Label */}
              <div className="text-[#A3A3A3] text-xs sm:text-sm font-medium uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
