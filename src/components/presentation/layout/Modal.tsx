"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-8 shadow-2xl animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-[#A3A3A3] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
