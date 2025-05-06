// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { campaingsCosts } from "../../types/campaingsCostsType";
import { QUERY_KEYS } from "@/lib/api";
import { getCampaingsCosts } from "@/services/financeService";

export function useGetCampaingsCosts() {
  const queryClient = useQueryClient();
  return useMutation<campaingsCosts, Error>({
    mutationFn: async () => {
      return await getCampaingsCosts();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
