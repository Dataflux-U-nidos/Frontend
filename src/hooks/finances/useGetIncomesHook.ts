// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/api";
import { getIncomes } from "@/services/financeService";
import { financeIncomesType } from "@/types/financeIncomesType";

export function useGetIncomes() {
  const queryClient = useQueryClient();
  return useMutation<financeIncomesType, Error>({
    mutationFn: async () => {
      return await getIncomes();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
