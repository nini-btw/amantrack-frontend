// lib/smoothScroll.ts
// Optional: Add this to your project for smooth anchor scrolling

export function initSmoothScroll() {
  if (typeof window === "undefined") return;

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without jumping
        window.history.pushState(null, "", href);
      }
    });
  });
}

// Alternative: Use this in your layout or page component
export function useSmoothScroll() {
  if (typeof window === "undefined") return;

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]');

    if (anchor) {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        window.history.pushState(null, "", href);
      }
    }
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}
