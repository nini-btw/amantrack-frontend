import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assetsService } from "@/services/assets.service";
import { CreateAssetData, UpdateAssetData } from "@/types/asset.types";
import { QUERY_KEYS } from "@/config/constants";

export function useAssets() {
  return useQuery({
    queryKey: QUERY_KEYS.ASSETS,
    queryFn: assetsService.getAll,
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ASSET(id),
    queryFn: () => assetsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAssetData) => assetsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ASSETS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}

export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssetData }) =>
      assetsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ASSETS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ASSET(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => assetsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ASSETS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    },
  });
}
