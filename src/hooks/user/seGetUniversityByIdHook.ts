// src/hooks/user/useGetUniversityByIdHook.ts
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api';
import { User } from '@/types';

const getUniversityById = async (id: string): Promise<User> => {
  console.log('Fetching university with ID:', id);
  const { data } = await userApi.get<User>(`/user/${id}`);
  
  // Mapear _id a id si es necesario para compatibilidad
  if (data._id && !data.id) {
    data.id = data._id;
  }
  
  console.log('University data received:', data);
  return data;
};

export function useGetUniversityById(id: string) {
  return useQuery({
    queryKey: ['university', id],
    queryFn: () => getUniversityById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
    retry: 1, // Solo reintentar una vez
    refetchOnWindowFocus: false
  });
}