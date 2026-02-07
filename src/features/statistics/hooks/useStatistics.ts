import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "@/services/statistics.service";
import { QUERY_KEYS } from "@/config/constants";

export function useStatistics() {
  return useQuery({
    queryKey: QUERY_KEYS.STATISTICS,
    queryFn: statisticsService.get,
  });
}
