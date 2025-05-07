import { useQuery } from '@tanstack/react-query';
import { getMajorsByInstitution } from '@/services/majorService';

/**
 * Hook para obtener carreras filtradas por institución
 * @param {string} institutionId - El ID de la institución
 * @returns {Object} Query object con datos, estado de carga y error
 */
export const useGetMajorsByInstitution = (institutionId: string) => {
  return useQuery({
    queryKey: ['majors', 'institution', institutionId],
    queryFn: () => getMajorsByInstitution(institutionId),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!institutionId, // Solo ejecuta la consulta si hay un ID de institución
  });
};