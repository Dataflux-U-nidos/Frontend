import { useQuery } from '@tanstack/react-query';
import { getJobOpportunitiesByMajor } from '@/services/jobOpportunityService';

/**
 * Hook para obtener salidas laborales filtradas por carrera
 * @param {string} majorId - El ID de la carrera
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetJobOpportunitiesByMajor = (majorId: string | undefined) => {
  return useQuery({
    queryKey: ['jobOpportunities', 'major', majorId],
    queryFn: () => getJobOpportunitiesByMajor(majorId!),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!majorId && majorId.length > 0, // Solo ejecuta si majorId existe y no está vacío
    retry: 2,
    retryDelay: 1000,
  });
};