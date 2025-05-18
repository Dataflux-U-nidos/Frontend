// src/hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersBySupport } from "@/services/userService";
import { PaginatedUsers } from "@/types/pagination";
import { QUERY_KEYS } from "@/lib/api";

export function useGetSupportHook() {
  const queryClient = useQueryClient();
  return useMutation<
    PaginatedUsers,
    Error,
    { search?: string; userType?: string; page: number; limit: number }
  >({
    mutationFn: (vars) =>
      getUsersBySupport(
        { search: vars.search, userType: vars.userType },
        { page: vars.page, limit: vars.limit }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.USERS]);
    },
  });
}
