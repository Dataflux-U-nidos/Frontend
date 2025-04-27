// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSupportUsersByAdmin } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetSupportByAdmin() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      return await getSupportUsersByAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
