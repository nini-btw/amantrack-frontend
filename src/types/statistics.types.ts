// Statistics types for the application

import { ComplianceStatus } from "./asset.types";

export interface Statistics {
  total: number;
  valid: number;
  expired: number;
  byType: Record<string, number>;
  byLocation: Record<string, number>;
  byStatus: Record<ComplianceStatus, number>;
  compliancePercentage: number;
}

export interface StatisticsResponse {
  total: number;
  valid: number;
  expired: number;
  byType: Record<string, number>;
  byLocation: Record<string, number>;
  byStatus: Record<ComplianceStatus, number>;
  compliancePercentage: number;
}
