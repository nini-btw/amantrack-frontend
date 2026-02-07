import { apiClient } from "@/lib/api-client";
import { Asset, CreateAssetData, UpdateAssetData } from "@/types/asset.types";

export const assetsService = {
  getAll: async (): Promise<Asset[]> => {
    const { data } = await apiClient.get("/assets");
    return data;
  },

  getById: async (id: string): Promise<Asset> => {
    const { data } = await apiClient.get(`/assets/${id}`);
    return data;
  },

  create: async (assetData: CreateAssetData): Promise<Asset> => {
    const { data } = await apiClient.post("/assets", assetData);
    return data;
  },

  update: async (id: string, assetData: UpdateAssetData): Promise<Asset> => {
    const { data } = await apiClient.put(`/assets/${id}`, assetData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/assets/${id}`);
  },
};
