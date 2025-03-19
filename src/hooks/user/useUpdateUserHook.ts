import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../lib/api';
import { UpdateUserInput, User } from '../../types/userType';
import { QUERY_KEYS } from '../../lib/api/constants';

const updateUser = async ({ id, ...updates }: { id: string } & UpdateUserInput): Promise<User> => {
  const { data } = await userApi.patch<User>(`/user/${id}`, updates);
  return data;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { id: string } & UpdateUserInput>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
