// src/hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersBySupport } from "@/services/userService";
import { User } from "@/types/userType";
import { QUERY_KEYS } from "@/lib/api";

export function useGetSupportHook() {
  const queryClient = useQueryClient();

  return useMutation<User[], Error, { search?: string; userType?: string }>({
    mutationFn: async (filters) => {
      return await getUsersBySupport(filters);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USERS]);
    },
  });
}
