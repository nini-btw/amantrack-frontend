import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionsService } from "@/services/inspections.service";
import { LogInspectionData } from "@/types/inspection.types";
import { QUERY_KEYS } from "@/config/constants";

export function useLogInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LogInspectionData) => inspectionsService.log(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ASSETS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}
