// src/hooks/jobOpportunity/useFilterJobOpportunitiesHook.ts
import { useState, useEffect } from 'react';
import { JobOpportunity, JobOpportunityFilters } from '@/types/jobOpportunityType';
import { filterJobOpportunities } from '@/services/jobOpportunityService';

/**
 * Hook para filtrar salidas laborales en el cliente
 * @param {JobOpportunity[]} jobOpportunities - Lista de salidas laborales a filtrar
 * @param {JobOpportunityFilters} initialFilters - Filtros iniciales
 * @returns {Object} - Objeto con salidas laborales filtradas y funciones para actualizar filtros
 */
export const useFilterJobOpportunities = (
  jobOpportunities: JobOpportunity[], 
  initialFilters: JobOpportunityFilters = {}
) => {
  const [filters, setFilters] = useState<JobOpportunityFilters>(initialFilters);
  const [filteredJobOpportunities, setFilteredJobOpportunities] = useState<JobOpportunity[]>(jobOpportunities);

  // Actualizar salidas laborales filtradas cuando cambian las salidas laborales o filtros
  useEffect(() => {
    setFilteredJobOpportunities(filterJobOpportunities(jobOpportunities, filters));
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