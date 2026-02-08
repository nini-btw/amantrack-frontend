import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { locationsService } from "@/services/locations.service";
import {
  Location,
  CreateLocationData,
  UpdateLocationData,
} from "@/types/location.types";
import { QUERY_KEYS } from "@/config/constants";

// Get all locations
export function useLocations() {
  return useQuery({
    queryKey: QUERY_KEYS.LOCATIONS,
    queryFn: locationsService.getAll,
  });
}

// Get a single location by ID
export function useLocation(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.LOCATION(id),
    queryFn: () => locationsService.getById(id),
    enabled: !!id,
  });
}

// Create a new location
export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLocationData) => locationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOCATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}

// Update a location
export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLocationData }) =>
      locationsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOCATIONS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.LOCATION(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}

// Delete a location
export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      // Validate that id is not undefined
      if (!id) {
        throw new Error("Location ID is required for deletion");
      }
      return locationsService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOCATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
    onError: (error) => {
      console.error("Delete location error:", error);
    },
  });
}
