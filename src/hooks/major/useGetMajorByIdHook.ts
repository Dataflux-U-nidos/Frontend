import { useQuery } from '@tanstack/react-query';
import { getMajorById } from '@/services/majorService';

/**
 * Hook para obtener una carrera específica por su ID
 * @param {string} id - El ID de la carrera a obtener
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetMajorById = (id: string) => {
  return useQuery({
    queryKey: ['major', id],
    queryFn: () => getMajorById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  });
};