// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/api';
import { getUserId } from '@/lib/api/authApi';

const deleteUser = async (id: string): Promise<void> => {
  await userApi.delete(`/user/${id}`);
};

export function useDeleteMyUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID is null");
      }
      await deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
