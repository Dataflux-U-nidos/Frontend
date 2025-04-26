// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentsByTutor } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

export function useGetStudentsByTutor() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      return await getStudentsByTutor();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
}
