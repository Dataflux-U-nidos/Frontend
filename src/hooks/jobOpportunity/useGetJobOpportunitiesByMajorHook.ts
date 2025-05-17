import { useQuery } from '@tanstack/react-query';
import { getJobOpportunitiesByMajor } from '@/services/jobOpportunityService';

/**
 * Hook para obtener salidas laborales filtradas por carrera
 * @param {string} majorId - El ID de la carrera
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetJobOpportunitiesByMajor = (majorId: string) => {
  return useQuery({
    queryKey: ['jobOpportunities', 'major', majorId],
    queryFn: () => getJobOpportunitiesByMajor(majorId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!majorId, // Solo ejecuta la consulta si hay un ID de carrera
    retry: 2, // Reintentar 2 veces en caso de error
    retryDelay: 1000, // Esperar 1 segundo entre reintentos
  });
};