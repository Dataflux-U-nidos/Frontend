import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../lib/api';

const deleteUser = async (id: string): Promise<void> => {
  try {
    await userApi.delete(`/user/${id}`);
  } catch (error) {
    console.error(`Error eliminando usuario con ID ${id}:`, error);
    throw error;
  }
};

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
