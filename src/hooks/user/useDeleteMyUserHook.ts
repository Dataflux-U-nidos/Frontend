// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/api';
import { deleteUser } from '@/services/userService';
import { useAuthContext } from '@/context/AuthContext';



export function useDeleteMyUser() {
  const queryClient = useQueryClient();
  const { userType } = useAuthContext();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Si es un tutor o admin, indicamos que queremos eliminar en cascada
      const cascade = userType === "TUTOR" || userType === "ADMIN" || userType === "UNIVERSITY";
      await deleteUser(cascade);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}

