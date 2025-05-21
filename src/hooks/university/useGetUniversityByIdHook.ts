// src/hooks/university/useGetUniversityByIdHook.ts
import { useQuery } from '@tanstack/react-query';
import { getUniversityById } from '@/services/universityService';

/**
 * Hook para obtener una universidad específica por su ID
 * @param {string} id - El ID de la universidad a obtener
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetUniversityById = (id: string) => {
  return useQuery({
    queryKey: ['university', id],
    queryFn: () => getUniversityById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  });
};