// src/hooks/university/useGetAllUniversitiesHook.ts
import { useQuery } from '@tanstack/react-query';
import { getAllUniversities } from '@/services/universityService';

/**
 * Hook para obtener todas las universidades
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetAllUniversities = () => {
  return useQuery({
    queryKey: ['universities'],
    queryFn: getAllUniversities,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
};