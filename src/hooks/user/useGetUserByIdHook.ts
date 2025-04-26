import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../lib/api';
import { User } from '../../types';
import { getUserById } from '@/services/userService';



export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}
