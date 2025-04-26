// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getFinanceUsersByAdmin } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetFinanceByAdmin() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      return await getFinanceUsersByAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
