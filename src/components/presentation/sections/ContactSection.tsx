"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
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
      id="contact"
      className="relative bg-[#0F0F0F] border-t border-[#2A2A2A] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-1/2 top-0 h-150 w-150 translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.15)_0%,transparent_60%)] blur-3xl" />

      <div className="relative z-10 max-w-350 mx-auto px-6 sm:px-8">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase bg-[rgba(239,68,68,0.08)] text-[#EF4444] border border-[rgba(239,68,68,0.25)]">
            Contact
          </span>

          <h2 className=" text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Let’s Talk Safety
          </h2>

          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about AmanTrack? Our team is here to help you
            streamline compliance and asset management.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                icon: Mail,
                title: "Email",
                value: "support@amantrack.com",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+1 (555) 123-4567",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Global — Remote First",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#EF4444] transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[rgba(239,68,68,0.1)]">
                    <Icon className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#A3A3A3] text-sm">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <form className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 sm:p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-white focus:outline-none focus:border-[#EF4444] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-white focus:outline-none focus:border-[#EF4444] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your needs..."
                  className="w-full rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] px-4 py-3 text-white focus:outline-none focus:border-[#EF4444] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-4 text-sm font-semibold bg-[#EF4444] text-white transition-all hover:bg-[#DC2626] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(239,68,68,0.35)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
