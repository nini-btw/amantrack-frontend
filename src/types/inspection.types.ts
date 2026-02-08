import { InspectionType } from "./asset.types";

export interface Inspection {
  id: string;
  assetId: string;
  type: InspectionType;
  inspectionDate: string;
  performedBy: string;
  notes?: string;
  createdAt: string;
}

export interface LogInspectionData {
  assetId: string;
  type: InspectionType;
  inspectionDate: string;
  notes?: string;
}

export interface LogInspectionResponse {
  asset: {
    id: string;
    daysRemaining: number;
    status: string;
  };
  inspection: {
    createdAt: string | number | Date;
    assetId: string;
    performedBy: string;
    id: string;
    type: InspectionType;
    inspectionDate: string;
    notes?: string;
  };
}
