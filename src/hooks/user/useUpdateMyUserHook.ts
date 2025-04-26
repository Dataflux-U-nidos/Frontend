// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/userService";
import { UpdateUserInput, User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";
import { getUserId } from "@/lib/api/authApi";

export function useUpdateMyUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: async (updates: UpdateUserInput) => {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID is null");
      }
      return await updateUser({ id: userId, ...updates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
