// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMarketingUsersByAdmin } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetMarketingByAdmin() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      return await getMarketingUsersByAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
