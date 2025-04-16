// hooks/useUpdateUserByEmail.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserByEmail } from '@/services/userService';
import { UpdateUserInput, User } from '@/types';
import { QUERY_KEYS } from '@/lib/api';

export function useUpdateUserByEmail() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { email: string } & UpdateUserInput>({
    mutationFn: updateUserByEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
