// src/hooks/user/useUpdateUniversityHook.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api';
import { User, UpdateUserInput } from '@/types';

const updateUniversityById = async ({ id, updates }: { id: string; updates: UpdateUserInput }): Promise<User> => {
  console.log('Updating university with ID:', id, 'Updates:', updates);
  const { data } = await userApi.patch<User>(`/user/${id}`, updates);
  return data;
};

export function useUpdateUniversity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUniversityById,
    onSuccess: (data, variables) => {
      console.log('University updated successfully:', data);
      // Invalidar las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['university', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
    onError: (error) => {
      console.error('Error updating university:', error);
    }
  });
}