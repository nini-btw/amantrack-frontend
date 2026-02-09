import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inspectionsService } from "@/services/inspections.service";
import {
  LogInspectionData,
  LogInspectionResponse,
} from "@/types/inspection.types";
import { QUERY_KEYS } from "@/config/constants";

// Log / create a new inspection
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

// Get all inspections (optional filter by type)
export function useInspections(type?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.INSPECTIONS, type],
    queryFn: () => inspectionsService.getAll(type),
  });
}

// Get a single inspection by ID
export function useInspection(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.INSPECTION(id),
    queryFn: () => inspectionsService.getById(id),
    enabled: !!id,
  });
}

export function useDeleteInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inspectionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ASSETS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });

      // ✅ FIX: invalidate ALL inspections queries (any type filter)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSPECTIONS] });
    },
  });
}
