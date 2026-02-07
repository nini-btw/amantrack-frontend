export type ComplianceStatus = "GREEN" | "YELLOW" | "RED";
export type InspectionType = "VISUAL" | "OFFICIAL";

export interface Asset {
  id: string;
  organizationId: string;
  referenceNumber: string;
  type: string;
  locationId: string;
  class: string; // Matching backend's 'class' field
  weightKg: number;
  visualInspectionDate: string;
  visualInspectionNext: string;
  officialInspectionDate: string;
  officialInspectionNext: string;
  daysRemaining: number;
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetData {
  referenceNumber: string;
  type: string;
  locationId: string;
  class: string; // Matching backend
  weightKg: number;
  visualInspectionDate: string;
  officialInspectionDate: string;
}

export interface UpdateAssetData {
  type?: string;
  locationId?: string;
  class?: string; // Matching backend (assetClass in entity, but 'class' in schema)
  weightKg?: number;
}
