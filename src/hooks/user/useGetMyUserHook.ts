// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";
import { getUserId } from "@/lib/api/authApi";

export function useGetMyUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, void>({
    mutationFn: async () => {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID is null");
      }
      return await getUserById(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
