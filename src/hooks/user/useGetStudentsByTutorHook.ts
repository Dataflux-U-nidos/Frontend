// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentsByTutor } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";
import { getUserId } from "@/lib/api/authApi";

export function useGetStudentsByTutor() {
  const queryClient = useQueryClient();
  return useMutation<User[], Error>({
    mutationFn: async () => {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID is null");
      }
      return await getStudentsByTutor(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STUDENTS_BY_TUTOR],
      });
    },
  });
}
