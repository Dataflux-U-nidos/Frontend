import { useState, useMemo } from 'react';
import { JobOpportunity, JobOpportunityFilters } from '@/types/jobOpportunityType';
import { filterJobOpportunities } from '@/services/jobOpportunityService';

/**
 * Hook para filtrar salidas laborales en el cliente
 * @param {JobOpportunity[]} jobOpportunities - Lista de salidas laborales a filtrar
 * @param {JobOpportunityFilters} initialFilters - Filtros iniciales (opcional)
 * @returns {Object} - Objeto con salidas laborales filtradas y funciones para actualizar filtros
 */
export const useFilterJobOpportunities = (
  jobOpportunities: JobOpportunity[], 
  initialFilters: JobOpportunityFilters = {}
) => {
  const [filters, setFilters] = useState<JobOpportunityFilters>(initialFilters);

  // Usar useMemo para evitar re-renders innecesarios
  const filteredJobOpportunities = useMemo(() => {
    if (!jobOpportunities || jobOpportunities.length === 0) {
      return [];
    }
    return filterJobOpportunities(jobOpportunities, filters);
  }, [jobOpportunities, filters]);

  // Función para actualizar filtros
  const updateFilters = (newFilters: JobOpportunityFilters) => {
    setFilters(newFilters);
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setFilters({});
  };

  return {
    filteredJobOpportunities,
    filters,
    updateFilters,
    resetFilters
  };
};