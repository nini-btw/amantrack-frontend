/**
 * Centralized Translation Utilities
 *
 * Use this hook in any component that needs to translate asset constants.
 *
 * Example:
 * import { useAssetTranslations } from '@/lib/translations';
 *
 * const { translateType, translateClass } = useAssetTranslations();
 * <div>{translateType(asset.type)}</div>
 */

import { useTranslations } from "next-intl";
import { ASSET_TYPES, ASSET_CLASSES } from "@/config/constants";

// ============================================================================
// TRANSLATION KEY MAPPERS
// ============================================================================

export const getAssetTypeTranslationKey = (type: string): string => {
  const keyMap: Record<string, string> = {
    CO2: "co2",
    Powder: "powder",
    Foam: "foam",
    Water: "water",
    "Wet Chemical": "wetChemical",
    "Clean Agent": "cleanAgent",
  };
  return keyMap[type] || type.toLowerCase();
};

export const getAssetClassTranslationKey = (assetClass: string): string => {
  const keyMap: Record<string, string> = {
    A: "a",
    B: "b",
    C: "c",
    D: "d",
    K: "k",
    "A, B": "ab",
    "A, B, C": "abc",
    "B, C": "bc",
    None: "none",
  };
  return keyMap[assetClass] || assetClass.toLowerCase();
};

export const getComplianceStatusTranslationKey = (status: string): string => {
  const keyMap: Record<string, string> = {
    GREEN: "green",
    YELLOW: "yellow",
    RED: "red",
  };
  return keyMap[status] || status.toLowerCase();
};

export const getInspectionTypeTranslationKey = (type: string): string => {
  const keyMap: Record<string, string> = {
    VISUAL: "visual",
    OFFICIAL: "official",
  };
  return keyMap[type] || type.toLowerCase();
};

// ============================================================================
// MAIN TRANSLATION HOOK
// ============================================================================

/**
 * Hook for translating all asset-related constants
 * Use this instead of manually building translation keys
 */
export function useAssetTranslations() {
  const t = useTranslations("dashboard.assets");

  return {
    // Translation functions
    translateType: (type: string): string => {
      return t(`constants.types.${getAssetTypeTranslationKey(type)}`);
    },

    translateClass: (assetClass: string): string => {
      return t(`constants.classes.${getAssetClassTranslationKey(assetClass)}`);
    },

    translateStatus: (status: string): string => {
      return t(`constants.status.${getComplianceStatusTranslationKey(status)}`);
    },

    translateInspectionType: (type: string): string => {
      return t(
        `constants.inspectionTypes.${getInspectionTypeTranslationKey(type)}`,
      );
    },

    // Dropdown options generators
    getTypeOptions: () => {
      return ASSET_TYPES.map((type) => ({
        value: type,
        label: t(`constants.types.${getAssetTypeTranslationKey(type)}`),
      }));
    },

    getClassOptions: (includeNone: boolean = false) => {
      const options = ASSET_CLASSES.map((cls) => ({
        value: cls,
        label: t(`constants.classes.${getAssetClassTranslationKey(cls)}`),
      }));

      if (includeNone) {
        return [{ value: "", label: t("constants.classes.none") }, ...options];
      }

      return options;
    },

    getStatusOptions: () => {
      const STATUSES = ["GREEN", "YELLOW", "RED"];
      return STATUSES.map((status) => ({
        value: status,
        label: t(
          `constants.status.${getComplianceStatusTranslationKey(status)}`,
        ),
      }));
    },

    getInspectionTypeOptions: () => {
      const TYPES = ["VISUAL", "OFFICIAL"];
      return TYPES.map((type) => ({
        value: type,
        label: t(
          `constants.inspectionTypes.${getInspectionTypeTranslationKey(type)}`,
        ),
      }));
    },
  };
}
