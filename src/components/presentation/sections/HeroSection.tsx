"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0F0F0F] text-white"
    >
      {/* Animated Glow background */}
      <div className="pointer-events-none absolute left-1/2 -top-50 sm:-top-75 h-150 w-150 sm:h-300 sm:w-300 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.3)_0%,transparent_60%)] animate-pulse-glow" />

      <div className="relative z-10 mx-auto max-w-350 px-6 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-25">
        {/* Badge - Animated */}
        <div
          className={`
            mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full 
            border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.08)] 
            px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium
            transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          <span className="hidden sm:inline">
            Trusted by HSE Professionals Worldwide
          </span>
          <span className="sm:hidden">Trusted by HSE Professionals</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:gap-20 lg:grid-cols-[1.1fr_1fr]">
          {/* Text */}
          <div>
            <h1
              className={`
                mb-6 sm:mb-7 font-extrabold leading-[1.1] sm:leading-[1.05] 
                tracking-[-0.03em] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.8rem]
                
                transition-all duration-700 delay-200
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Safety Asset Management.
              <br />
              <span className="text-[#EF4444]">Simplified.</span>
            </h1>

            <p
              className={`
                mb-8 sm:mb-10 max-w-full lg:max-w-162.5 
                text-base sm:text-lg lg:text-[1.3rem] 
                leading-[1.6] sm:leading-[1.7] text-[#A3A3A3]
                transition-all duration-700 delay-400
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Track every inspection, maintain compliance, and keep your
              workplace safe with real-time visibility into your safety
              equipment.
            </p>

            <div
              className={`
                flex flex-col sm:flex-row gap-3 sm:gap-4
                transition-all duration-700 delay-600
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <a
                href="/dashboard"
                className="
                  text-center rounded-[10px] bg-[#EF4444] 
                  px-7 sm:px-9 py-4 sm:py-5 
                  text-sm sm:text-base font-semibold text-white 
                  transition-all hover:-translate-y-1 hover:bg-[#DC2626] 
                  hover:shadow-[0_12px_30px_rgba(239,68,68,0.35)]
                "
              >
                Start Free Trial
              </a>

              {/*  <a
                href="#showcase"
                className="
                  text-center rounded-[10px] border border-[#2A2A2A] 
                  bg-[#1A1A1A] px-7 sm:px-9 py-4 sm:py-5 
                  text-sm sm:text-base font-semibold text-white 
                  transition-all hover:bg-[#252525] hover:border-[#404040]
                "
              >
                Watch Demo
              </a> */}
            </div>
          </div>

          {/* Visual - Dashboard Preview */}
          <div
            className={`
              relative transition-all duration-1000 delay-800
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute left-0 top-0 h-0.75 w-full bg-linear-to-r from-[#3B82F6] via-[#22C55E] to-[#A855F7]" />

              {/* Header */}
              <div className="mb-6 sm:mb-8 flex items-center justify-between">
                <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#737373]">
                  Live Dashboard
                </span>
                <div className="flex gap-1.5 sm:gap-2">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#737373]" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#737373]" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                {/* Total Assets */}
                <div className="group cursor-pointer rounded-xl border-l-[3px] border-[#3B82F6] bg-white/5 p-4 sm:p-5 lg:p-7 transition-all hover:translate-x-1 hover:bg-white/10">
                  <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-[2.8rem] font-bold tracking-tight text-white ">
                    5,000+
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.05em] text-[#737373]">
                    Total Assets
                  </div>
                </div>

                {/* Valid Assets */}
                <div className="group cursor-pointer rounded-xl border-l-[3px] border-[#22C55E] bg-white/5 p-4 sm:p-5 lg:p-7 transition-all hover:translate-x-1 hover:bg-white/10">
                  <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-[2.8rem] font-bold tracking-tight text-white ">
                    4,850
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.05em] text-[#737373]">
                    Valid Assets
                  </div>
                </div>

                {/* Needs Attention */}
                <div className="group cursor-pointer rounded-xl border-l-[3px] border-[#EAB308] bg-white/5 p-4 sm:p-5 lg:p-7 transition-all hover:translate-x-1 hover:bg-white/10">
                  <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-[2.8rem] font-bold tracking-tight text-white ">
                    150
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.05em] text-[#737373]">
                    Needs Attention
                  </div>
                </div>

                {/* Compliance */}
                <div className="group cursor-pointer rounded-xl border-l-[3px] border-[#A855F7] bg-white/5 p-4 sm:p-5 lg:p-7 transition-all hover:translate-x-1 hover:bg-white/10">
                  <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl lg:text-[2.8rem] font-bold tracking-tight text-white ">
                    99.2%
                  </div>
                  <div className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-[0.05em] text-[#737373]">
                    Compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
