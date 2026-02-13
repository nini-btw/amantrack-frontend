"use client";

import { useEffect, useRef, useState } from "react";

export default function DashboardPreview() {
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
      id="showcase"
      className="bg-[#0F0F0F] py-20 sm:py-28 lg:py-32"
    >
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        {/* Header */}
        <div
          className={`
            text-center mb-12 sm:mb-16 lg:mb-20
            transition-all duration-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase bg-[rgba(239,68,68,0.08)] text-[#EF4444] border border-[rgba(239,68,68,0.25)]">
            Dashboard
          </span>

          <h2 className=" text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight px-4">
            Built for clarity and control
          </h2>

          <p className="text-[#A3A3A3] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            A clean, intuitive interface that puts critical safety information
            at your fingertips.
          </p>
        </div>

        {/* Window */}
        <div
          className={`
            bg-[#1A1A1A] border border-[#2A2A2A]
            rounded-xl sm:rounded-[20px]
            overflow-hidden
            shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
            relative
            transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          {/* Header bar */}
          <div className="bg-[#0F0F0F] px-4 sm:px-6 py-3 sm:py-4 border-b border-[#2A2A2A] flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
          </div>

          {/* Image body */}
          <div className="p-4 sm:p-6 bg-[#F5F5F5]">
            <img
              src="/dashboard-preview.png"
              alt="AmanTrack Dashboard"
              loading="lazy"
              className="w-full h-auto rounded-lg sm:rounded-xl block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
