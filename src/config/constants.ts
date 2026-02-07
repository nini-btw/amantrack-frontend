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
  ASSETS: ["assets"],
  ASSET: (id: string) => ["assets", id],
  LOCATIONS: ["locations"],
  STATISTICS: ["statistics"],
} as const;
