// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/api";
import {  getTotalIncome } from "@/services/financeService";

export function useGetTotalIncome(start: string, end: string) {
  const queryClient = useQueryClient();
  return useMutation<number, Error>({
    mutationFn: async () => {
      return await getTotalIncome(start, end);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
