import { apiClient } from "@/lib/api-client";
import {
  LogInspectionData,
  LogInspectionResponse,
} from "@/types/inspection.types";

export const inspectionsService = {
  // Create / Log a new inspection
  log: async (
    inspectionData: LogInspectionData,
  ): Promise<LogInspectionResponse> => {
    const { data } = await apiClient.post("/inspections", inspectionData);
    return data;
  },

  // Get all inspections (optionally filtered by type)
  getAll: async (type?: string): Promise<LogInspectionResponse[]> => {
    const { data } = await apiClient.get("/inspections", {
      params: type ? { type } : {},
    });
    return data;
  },

  // Get an inspection by ID
  getById: async (id: string): Promise<LogInspectionResponse> => {
    const { data } = await apiClient.get(`/inspections/${id}`);
    return data;
  },

  // Delete an inspection by ID
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/inspections/${id}`);
  },
};
