"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SwipeBump } from "./SwipeBump";
import { useSidebar } from "@/hooks/useSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const {
    isCollapsed,
    setIsCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobile,
    dragProgress,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7fa] dark:bg-[#0d1117] transition-colors">
      {/* Swipe Bump for mobile */}
      {/* {isMobile && (
        <SwipeBump
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          isDragging={isDragging}
          dragProgress={dragProgress}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      )}
 */}
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobile={isMobile}
        dragProgress={dragProgress}
        isDragging={isDragging}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setIsMobileMenuOpen(true)}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
