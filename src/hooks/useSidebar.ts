import { useState, useEffect, useCallback, useRef } from "react";

interface UseSidebarReturn {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isMobile: boolean;
  dragProgress: number;
  isDragging: boolean;
  handleDragStart: (clientX: number) => void;
  handleDragMove: (clientX: number) => void;
  handleDragEnd: () => void;
}

export function useSidebar(): UseSidebarReturn {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const currentX = useRef(0);
  const startedFromEdge = useRef(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isMobileMenuOpen]);

  const handleDragStart = useCallback(
    (clientX: number) => {
      if (!isMobile) return;

      dragStartX.current = clientX;
      currentX.current = clientX;
      startedFromEdge.current = clientX < 50; // Started within 50px of left edge
      setIsDragging(true);
    },
    [isMobile],
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !isMobile) return;

      currentX.current = clientX;
      const delta = clientX - dragStartX.current;

      // Calculate progress (0 to 1)
      const sidebarWidth = 256; // 64 * 4 = 256px (w-64 in Tailwind)
      let progress = 0;

      if (isMobileMenuOpen) {
        // Dragging to close
        progress = Math.max(0, Math.min(1, 1 + delta / sidebarWidth));
      } else {
        // Dragging to open
        if (startedFromEdge.current) {
          progress = Math.max(0, Math.min(1, delta / sidebarWidth));
        }
      }

      setDragProgress(progress);
    },
    [isDragging, isMobile, isMobileMenuOpen],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !isMobile) return;

    const threshold = 0.4; // 40% threshold
    const delta = currentX.current - dragStartX.current;
    const velocity = Math.abs(delta);

    // Determine if we should open or close
    let shouldOpen = isMobileMenuOpen;

    if (isMobileMenuOpen) {
      // Currently open, dragging to close
      shouldOpen = dragProgress > threshold || velocity < 50;
    } else {
      // Currently closed, dragging to open
      shouldOpen = dragProgress > threshold && startedFromEdge.current;
    }

    setIsMobileMenuOpen(shouldOpen);
    setIsDragging(false);
    setDragProgress(0);
    dragStartX.current = 0;
    currentX.current = 0;
    startedFromEdge.current = false;
  }, [isDragging, isMobile, isMobileMenuOpen, dragProgress]);

  return {
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
  };
}
