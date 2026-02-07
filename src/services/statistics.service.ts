import { apiClient } from "@/lib/api-client";
import { Statistics } from "@/types/statistics.types";

export const statisticsService = {
  get: async (): Promise<Statistics> => {
    const { data } = await apiClient.get("/statistics");
    return data;
  },
};
