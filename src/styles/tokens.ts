// Design Tokens for AmanTrack
// Supports both Dashboard (light/dark) and Presentation (dark industrial) themes

export const colors = {
  // ============================================
  // PRESENTATION THEME (Industrial Precision)
  // Dark theme with orange accents for landing pages
  // ============================================
  presentation: {
    // Primary Colors
    primary: "#FF6B1A",
    primaryLight: "#FF8543",
    primaryDark: "#E65100",
    primaryHover: "#FF7F36",

    // Background Colors
    bgPrimary: "#0A0A0A", // Deep Black
    bgSecondary: "#1A1A1A",
    bgTertiary: "#2A2A2A",
    bgElevated: "#1F1F1F",
    bgCard: "#161616",

    // Text Colors
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
    textMuted: "#6B6B6B",
    textDisabled: "#4A4A4A",

    // Border Colors
    borderPrimary: "rgba(255, 107, 26, 0.2)",
    borderSecondary: "rgba(255, 255, 255, 0.1)",
    borderStrong: "rgba(255, 255, 255, 0.2)",

    // Accent Colors
    success: "#10B981",
    warning: "#FBBF24",
    error: "#EF4444",
    info: "#3B82F6",

    // Gradients
    gradientPrimary: "linear-gradient(135deg, #FF6B1A 0%, #FF8543 100%)",
    gradientBackground: "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
    gradientCard:
      "linear-gradient(135deg, rgba(255, 107, 26, 0.1) 0%, transparent 100%)",
    radialGlow:
      "radial-gradient(circle at top right, rgba(255, 107, 26, 0.1) 0%, transparent 70%)",
  },

  // ============================================
  // DASHBOARD THEME (Application)
  // Light/Dark mode support for the main app
  // ============================================

  // Brand Colors
  brand: {
    red: {
      light: "#EF4444",
      dark: "#DC2626",
    },
    blue: {
      light: "#2563EB",
      dark: "#3B82F6",
    },
    orange: {
      light: "#FF6B1A",
      dark: "#E65100",
    },
  },

  // Background Colors
  bg: {
    page: { light: "#F6F7FA", dark: "#0D1117" },
    container: { light: "#FFFFFF", dark: "#1B1F28" },
    surface: { light: "#F9FAFB", dark: "#2A2E37" },
    subtle: { light: "#F3F4F6", dark: "#21262D" },
    hover: { light: "#F9FAFB", dark: "#2A2E37" },
    active: { light: "#F3F4F6", dark: "#21262D" },
  },

  // Text Colors
  text: {
    primary: { light: "#111827", dark: "#E4E6EB" },
    secondary: { light: "#6B7280", dark: "#9CA3AF" },
    tertiary: { light: "#9CA3AF", dark: "#6B7280" },
    disabled: { light: "#D1D5DB", dark: "#4B5563" },
    placeholder: { light: "#9CA3AF", dark: "#6B7280" },
  },

  // Border Colors
  border: {
    default: { light: "#E5E7EB", dark: "#2D3340" },
    strong: { light: "#D1D5DB", dark: "#3D4350" },
    subtle: { light: "#F3F4F6", dark: "#21262D" },
    focus: { light: "#2563EB", dark: "#3B82F6" },
  },

  // Status Colors (Semantic)
  status: {
    success: { light: "#10B981", dark: "#34D399" },
    warning: { light: "#FBBF24", dark: "#FACC15" },
    error: { light: "#F87171", dark: "#F87171" },
    info: { light: "#3B82F6", dark: "#60A5FA" },
  },

  // Interactive States
  interactive: {
    hover: { light: "rgba(0, 0, 0, 0.05)", dark: "rgba(255, 255, 255, 0.05)" },
    active: { light: "rgba(0, 0, 0, 0.1)", dark: "rgba(255, 255, 255, 0.1)" },
    disabled: {
      light: "rgba(0, 0, 0, 0.05)",
      dark: "rgba(255, 255, 255, 0.05)",
    },
  },
};

// ============================================
// SPACING SYSTEM
// ============================================
export const spacing = {
  // Base spacing scale
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px

  // Presentation-specific
  section: "7.5rem", // 120px - vertical spacing between sections
  sectionSm: "5rem", // 80px - reduced section spacing on mobile

  // Component-specific
  cardPadding: "1.5rem", // 24px
  containerPadding: "1.5rem", // 24px
  pagePadding: "2rem", // 32px
};

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  // Font Families
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font Sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.6,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.02em",
    tight: "-0.01em",
    normal: "0",
    wide: "0.01em",
    wider: "0.05em",
  },
};

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  // Dashboard shadows
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",

  // Presentation shadows
  presentation: {
    card: "0 20px 60px rgba(0, 0, 0, 0.5)",
    cardHover: "0 12px 40px rgba(255, 107, 26, 0.1)",
    button: "0 8px 24px rgba(255, 107, 26, 0.3)",
    glow: "0 0 40px rgba(255, 107, 26, 0.2)",
  },

  // Dark mode shadows
  dark: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6)",
  },
};

// ============================================
// TRANSITIONS
// ============================================
export const transitions = {
  // Duration
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  // Timing Functions
  ease: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ============================================
// Z-INDEX SCALE
// ============================================
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
};

// ============================================
// BREAKPOINTS
// ============================================
export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "968px",
  xl: "1200px",
  "2xl": "1536px",
};

// ============================================
// CONTAINER
// ============================================
export const container = {
  // Presentation pages
  presentation: {
    maxWidth: "1200px",
    padding: "1.5rem", // 24px
    paddingMobile: "1rem", // 16px
  },

  // Dashboard pages
  dashboard: {
    maxWidth: "100%",
    padding: "2rem", // 32px
    paddingMobile: "1rem", // 16px
  },
};

// ============================================
// GRID
// ============================================
export const grid = {
  gap: {
    sm: "1rem", // 16px
    md: "1.5rem", // 24px
    lg: "2rem", // 32px
    xl: "3rem", // 48px
  },
  columns: {
    1: "repeat(1, 1fr)",
    2: "repeat(2, 1fr)",
    3: "repeat(3, 1fr)",
    4: "repeat(4, 1fr)",
    6: "repeat(6, 1fr)",
    12: "repeat(12, 1fr)",
  },
};

// ============================================
// ANIMATIONS
// ============================================
export const animations = {
  // Keyframes for CSS animations
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideUp: {
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    slideDown: {
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    scaleIn: {
      from: { opacity: 0, transform: "scale(0.95)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    spin: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  },
};

// ============================================
// EXPORT ALL AS DEFAULT
// ============================================
export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  container,
  grid,
  animations,
};
