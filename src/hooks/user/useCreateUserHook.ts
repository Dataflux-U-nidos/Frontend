import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../lib/api';
import { CreateUserInput, User } from '../../types';

const createUser = async (newUser: CreateUserInput): Promise<User> => {
  try {
    const { data } = await userApi.post<User>('/user', newUser);
    return data;
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  }); 
}
