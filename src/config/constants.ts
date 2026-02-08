export const ASSET_TYPES = ["CO2", "Poudre", "Eau", "Mousse"] as const;

export const ASSET_CLASSES = [
  "A",
  "B",
  "C",
  "A, B",
  "A, B, C",
  "B, C",
] as const;

export const INSPECTION_TYPES = {
  VISUAL: "VISUAL",
  OFFICIAL: "OFFICIAL",
} as const;

export const QUERY_KEYS = {
  // Assets
  ASSETS: ["assets"] as const,
  ASSET: (id: string) => ["assets", id] as const,

  // Locations
  LOCATIONS: ["locations"] as const,
  LOCATION: (id: string) => ["locations", id] as const,

  // Inspections
  INSPECTIONS: ["inspections"] as const,
  INSPECTION: (id: string) => ["inspections", id] as const,

  // Statistics
  STATISTICS: ["statistics"] as const,
} as const;
