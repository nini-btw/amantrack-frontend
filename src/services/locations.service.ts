import { apiClient } from "@/lib/api-client";
import {
  Location,
  CreateLocationData,
  UpdateLocationData,
} from "@/types/location.types";

export const locationsService = {
  // Get all locations
  getAll: async (): Promise<Location[]> => {
    const { data } = await apiClient.get("/locations");
    return data;
  },

  // Get a location by ID
  getById: async (id: string): Promise<Location> => {
    const { data } = await apiClient.get(`/locations/${id}`);
    return data;
  },

  // Create a new location
  create: async (locationData: CreateLocationData): Promise<Location> => {
    const { data } = await apiClient.post("/locations", locationData);
    return data;
  },

  // Update a location by ID
  update: async (
    id: string,
    locationData: UpdateLocationData,
  ): Promise<Location> => {
    const { data } = await apiClient.put(`/locations/${id}`, locationData);
    return data;
  },

  // Delete a location by ID
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/locations/${id}`);
  },
};
