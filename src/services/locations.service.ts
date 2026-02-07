import { apiClient } from "@/lib/api-client";
import { Location, CreateLocationData } from "@/types/location.types";

export const locationsService = {
  getAll: async (): Promise<Location[]> => {
    const { data } = await apiClient.get("/locations");
    return data;
  },

  create: async (locationData: CreateLocationData): Promise<Location> => {
    const { data } = await apiClient.post("/locations", locationData);
    return data;
  },
};
