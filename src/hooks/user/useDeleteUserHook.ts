import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/api';
import { deleteUserById } from '@/services/userService';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteUserById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}

