import { useQuery } from '@tanstack/react-query';
import { getMajorsByInstitution } from '@/services/majorService';

/**
 * Hook para obtener carreras filtradas por institución
 * @param {string | undefined} institutionId - El ID de la institución
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetMajorsByInstitution = (institutionId: string | undefined) => {
  return useQuery({
    queryKey: ['majors', 'institution', institutionId],
    queryFn: () => getMajorsByInstitution(institutionId!), // Usamos ! porque enabled garantiza que no sea undefined
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!institutionId, // Solo ejecuta la consulta si hay un ID de institución
    retry: 2, // Reintenta 2 veces en caso de error
    refetchOnWindowFocus: false, // No refresca automáticamente al volver al tab
  });
};