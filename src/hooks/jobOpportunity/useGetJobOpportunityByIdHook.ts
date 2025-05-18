// src/hooks/jobOpportunity/useGetJobOpportunityByIdHook.ts
import { useQuery } from '@tanstack/react-query';
import { getJobOpportunityById } from '@/services/jobOpportunityService';

/**
 * Hook para obtener una salida laboral específica por su ID
 * @param {string} id - El ID de la salida laboral a obtener
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetJobOpportunityById = (id: string) => {
  return useQuery({
    queryKey: ['jobOpportunity', id],
    queryFn: () => getJobOpportunityById(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Solo ejecuta la consulta si hay un ID
  });
};