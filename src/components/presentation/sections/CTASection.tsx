"use client";

import { useEffect, useRef, useState } from "react";

export default function CTASection() {
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
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32 bg-[#0F0F0F]">
      <div className="max-w-350 mx-auto px-6 sm:px-8">
        <div
          className={`
            relative text-center
            rounded-2xl sm:rounded-3xl
            border border-[#2A2A2A]
            px-6 sm:px-12 lg:px-20
            py-16 sm:py-20 lg:py-24
            bg-linear-to-br from-[rgba(239,68,68,0.10)] to-transparent
            overflow-hidden
            transition-all duration-1000
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          {/* Animated Glow background */}
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-100 h-100 sm:w-150 sm:h-150 bg-[radial-gradient(circle,rgba(239,68,68,0.25)_0%,transparent_70%)] pointer-events-none animate-pulse-glow" />

          {/* Content */}
          <div className="relative z-10">
            <h2
              className={`
                font-['Syne'] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
                font-extrabold text-white mb-5 sm:mb-6 tracking-tight
                px-4
                transition-all duration-700 delay-200
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              Ready to transform your safety management?
            </h2>

            <p
              className={`
                text-[#A3A3A3] text-base sm:text-lg lg:text-xl 
                max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed
                px-4
                transition-all duration-700 delay-400
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              Join forward-thinking organizations using AmanTrack to maintain
              compliance and protect their teams.
            </p>

            <div
              className={`
                flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center
                transition-all duration-700 delay-600
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              {/* Primary */}
              <a
                href="#demo"
                className="
                  inline-flex items-center justify-center
                  px-8 sm:px-10 py-4 sm:py-5 rounded-xl
                  bg-[#EF4444] text-white 
                  font-semibold text-base sm:text-lg
                  transition-all duration-300
                  hover:bg-[#DC2626]
                  hover:-translate-y-1
                  hover:shadow-[0_15px_35px_rgba(239,68,68,0.35)]
                "
              >
                Start Free Trial
              </a>

              {/* Secondary */}
              <a
                href="#contact"
                className="
                  inline-flex items-center justify-center
                  px-8 sm:px-10 py-4 sm:py-5 rounded-xl
                  bg-[#1A1A1A] border border-[#2A2A2A]
                  text-white font-semibold text-base sm:text-lg
                  transition-all duration-300
                  hover:bg-[#252525]
                  hover:border-[#404040]
                "
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
