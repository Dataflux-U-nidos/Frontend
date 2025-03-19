import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../lib/api';
import { CreateUserInput, User } from '../../types/userType';
import { QUERY_KEYS } from '../../lib/api/constants';

const createUser = async (newUser: CreateUserInput): Promise<User> => {
  const { data } = await userApi.post<User>('/user', newUser);
  return data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
