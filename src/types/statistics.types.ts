// Statistics types for the application

export interface Statistics {
  total: number;
  valid: number;
  expired: number;
  byStatus: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  compliancePercentage: number;
}

export interface StatisticsResponse {
  total: number;
  valid: number;
  expired: number;
  byStatus: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  compliancePercentage: number;
}
