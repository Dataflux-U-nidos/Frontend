import { useQuery } from '@tanstack/react-query';
import { getAllRecomendations } from '@/services/userService';

/**
 * Hook para obtener todas las carreras universitarias
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetAllRecomendations = () => {
  return useQuery({
    queryKey: ['majors'],
    queryFn: getAllRecomendations,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
};