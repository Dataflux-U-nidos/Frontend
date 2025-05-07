import { useQuery } from '@tanstack/react-query';
import { getAllMajors } from '@/services/majorService';

/**
 * Hook para obtener todas las carreras universitarias
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetAllMajors = () => {
  return useQuery({
    queryKey: ['majors'],
    queryFn: getAllMajors,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
};