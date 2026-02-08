"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface SwipeBumpProps {
  onDragStart: (clientX: number) => void;
  onDragMove: (clientX: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  dragProgress: number;
  isMobileMenuOpen: boolean;
}

export function SwipeBump({
  onDragStart,
  onDragMove,
  onDragEnd,
  isDragging,
  dragProgress,
  isMobileMenuOpen,
}: SwipeBumpProps) {
  const [showPulse, setShowPulse] = useState(false);

  // Show pulse animation on first load to teach users
  useEffect(() => {
    const hasSeenBump = localStorage.getItem("hasSeenSwipeBump");
    if (!hasSeenBump) {
      setShowPulse(true);
      localStorage.setItem("hasSeenSwipeBump", "true");

      // Stop pulsing after 3 seconds
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    onDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    onDragMove(e.touches[0].clientX);
  };

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    onDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      onDragEnd();
    }
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Don't show on desktop or when menu is open (except during drag)
  if (isMobileMenuOpen && !isDragging) {
    return null;
  }

  // Calculate transform based on drag progress
  const translateX = isDragging ? dragProgress * 256 : 0; // 256px = sidebar width
  const scale = isDragging ? 1 + dragProgress * 0.2 : 1;

  return (
    <>
      {/* Extended touch area - invisible but captures swipes from edge */}
      <div
        className="fixed left-0 top-0 bottom-0 w-12 z-60 md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onDragEnd}
        onMouseDown={handleMouseDown}
        style={{ touchAction: "none" }}
      />

      {/* The visible bump */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-61 md:hidden pointer-events-none"
        style={{
          transform: `translate(${translateX}px, -50%) scale(${scale})`,
          transition: isDragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Pulse animation ring */}
        {showPulse && (
          <div className="absolute inset-0 animate-ping">
            <div className="w-full h-full bg-red-500/30 rounded-r-full" />
          </div>
        )}

        {/* Main bump shape */}
        <div
          className="relative w-6 h-20 bg-linear-to-r from-red-600 to-red-500 rounded-r-full shadow-lg pointer-events-auto cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={onDragEnd}
          onMouseDown={handleMouseDown}
          style={{ touchAction: "none" }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent rounded-r-full" />

          {/* Chevron icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChevronRight
              size={16}
              className="text-white/90 transition-transform duration-200"
              style={{
                transform: isDragging
                  ? `translateX(${dragProgress * 4}px)`
                  : "translateX(0)",
              }}
            />
          </div>

          {/* Bottom shadow for depth */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-black/20 rounded-r-full blur-sm" />
        </div>

        {/* Stretch effect during drag */}
        {isDragging && dragProgress > 0.1 && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-linear-to-r from-red-500/50 to-transparent"
            style={{
              width: `${dragProgress * 256}px`,
              transition: "none",
            }}
          />
        )}
      </div>
    </>
  );
}
