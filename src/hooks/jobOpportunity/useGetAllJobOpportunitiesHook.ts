// src/hooks/jobOpportunity/useGetAllJobOpportunitiesHook.ts
import { useQuery } from '@tanstack/react-query';
import { getAllJobOpportunities } from '@/services/jobOpportunityService';

/**
 * Hook para obtener todas las salidas laborales
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetAllJobOpportunities = () => {
  return useQuery({
    queryKey: ['jobOpportunities'],
    queryFn: getAllJobOpportunities,
    staleTime: 1000 * 60 * 5, // 5 minutos de caché fresca
  });
};