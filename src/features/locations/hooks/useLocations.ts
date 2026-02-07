import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { locationsService } from "@/services/locations.service";
import { CreateLocationData } from "@/types/location.types";
import { QUERY_KEYS } from "@/config/constants";

export function useLocations() {
  return useQuery({
    queryKey: QUERY_KEYS.LOCATIONS,
    queryFn: locationsService.getAll,
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLocationData) => locationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOCATIONS });
    },
  });
}
