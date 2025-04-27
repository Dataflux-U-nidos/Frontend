import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, QUERY_KEYS } from '../../lib/api';
import { CreateUserInput, User } from '../../types';

const registerUser = async (newUser: CreateUserInput): Promise<User> => {
  const { data } = await userApi.post<User>('/user/registry', newUser);
  return data;
};

export function useRegisterUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
