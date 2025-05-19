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
    retry: 2, // Reintentar 2 veces en caso de error
    retryDelay: 1000, // Esperar 1 segundo entre reintentos
    // No mostrar errores en consola automáticamente, los manejaremos en el componente
    meta: {
      errorMessage: 'No se pudieron cargar las salidas laborales'
    }
  });
};