import { apiClient } from "@/lib/api-client";
import {
  LogInspectionData,
  LogInspectionResponse,
} from "@/types/inspection.types";

export const inspectionsService = {
  log: async (
    inspectionData: LogInspectionData,
  ): Promise<LogInspectionResponse> => {
    const { data } = await apiClient.post("/inspections", inspectionData);
    return data;
  },
};
