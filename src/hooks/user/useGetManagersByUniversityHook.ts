// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getManagersByUniversity } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetManagersByUniversity() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      return await getManagersByUniversity();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
