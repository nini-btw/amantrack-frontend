"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProblemSolution() {
  const t = useTranslations("presentation.problemSolution");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const problems = [
    t("problem.items.paper"),
    t("problem.items.missed"),
    t("problem.items.manual"),
    t("problem.items.visibility"),
  ];

  const solutions = [
    t("solution.items.centralized"),
    t("solution.items.automated"),
    t("solution.items.realtime"),
    t("solution.items.secure"),
  ];

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
      id="problem-solution"
      className="py-24 sm:py-32 bg-[#0F0F0F] border-t border-[#2A2A2A]"
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Problem Card */}
          <div
            className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              {t("problem.title")}
            </h3>

            <ul className="space-y-5">
              {problems.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <AlertTriangle className="text-red-500 mt-1" size={20} />
                  <span className="text-[#A3A3A3] text-sm sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div
            className={`bg-[#1A1A1A] border border-[#EF4444] rounded-2xl p-10 shadow-[0_0_40px_rgba(239,68,68,0.08)] transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              {t("solution.title")}
            </h3>

            <ul className="space-y-5">
              {solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-[#EF4444] mt-1" size={20} />
                  <span className="text-[#E5E5E5] text-sm sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
