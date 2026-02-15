// Asset Types Configuration - Keep English values for backend
export const ASSET_TYPES = [
  "CO2",
  "Powder",
  "Foam",
  "Water",
  "Wet Chemical",
  "Clean Agent",
] as const;

// Asset Classes Configuration - Keep English values for backend
export const ASSET_CLASSES = [
  "A",
  "B",
  "C",
  "D",
  "K",
  "A, B",
  "A, B, C",
  "B, C",
] as const;

// Helper function to get translation key for asset type
// Maps backend values to translation keys
export const getAssetTypeTranslationKey = (type: string): string => {
  const typeMap: Record<string, string> = {
    CO2: "co2",
    Powder: "powder",
    Foam: "foam",
    Water: "water",
    "Wet Chemical": "wetChemical",
    "Clean Agent": "cleanAgent",
  };
  return typeMap[type] || type.toLowerCase();
};

// Helper function to get translation key for asset class
// Maps backend values to translation keys
export const getAssetClassTranslationKey = (assetClass: string): string => {
  const classMap: Record<string, string> = {
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    K: "k",
    "A, B": "ab",
    "A, B, C": "abc",
    "B, C": "bc",
  };
  return classMap[assetClass] || assetClass.toLowerCase();
};

// React Query Keys
export const QUERY_KEYS = {
  ASSETS: ["assets"] as const,
  ASSET: (id: string) => ["assets", id] as const,
  LOCATIONS: ["locations"] as const,
  LOCATION: (id: string) => ["locations", id] as const,
  INSPECTIONS: ["inspections"] as const,
  INSPECTION: (id: string) => ["inspections", id] as const,
  STATISTICS: ["statistics"] as const,
} as const;

// Inspection Types
export const INSPECTION_TYPES = {
  VISUAL: "VISUAL",
  OFFICIAL: "OFFICIAL",
} as const;

// Compliance Status
export const COMPLIANCE_STATUS = {
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  RED: "RED",
} as const;

// Inspection Intervals (in days)
export const INSPECTION_INTERVALS = {
  VISUAL: 30, // 1 month
  OFFICIAL: 365, // 1 year
} as const;
