// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/services/userService";
import { UpdateUserInput, User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useUpdateMyUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: async (updates: UpdateUserInput) => {
      //@ts-ignore
      return await updateUser({ ...updates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
