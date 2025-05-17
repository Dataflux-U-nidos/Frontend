import { useState, useEffect } from 'react';
import { useGetAllJobOpportunities } from './useGetAllJobOpportunitiesHook';
import { useGetJobOpportunitiesByMajor } from './useGetJobOpportunitiesByMajorHook';
import { useFilterJobOpportunities } from './useFilterJobOpportunitiesHook';
import { JobOpportunity, JobOpportunityFilters } from '@/types/jobOpportunityType';

/**
 * Hook personalizado para manejar salidas laborales con filtrado por carrera
 * @param {JobOpportunityFilters} initialFilters - Filtros iniciales
 * @returns {Object} - Objeto con salidas laborales filtradas y funciones de control
 */
export const useJobOpportunitiesWithMajorFilter = (initialFilters: JobOpportunityFilters = {}) => {
  const [filters, setFilters] = useState<JobOpportunityFilters>(initialFilters);
  const [allJobOpportunities, setAllJobOpportunities] = useState<JobOpportunity[]>([]);
  
  // Hook para obtener todas las salidas laborales
  const { 
    data: allJobs, 
    isLoading: loadingAll, 
    isError: errorAll, 
    error: errorAllMessage 
  } = useGetAllJobOpportunities();
  
  // Hook para obtener salidas laborales por carrera (solo cuando hay filtro de carrera)
  const { 
    data: jobsByMajor, 
    isLoading: loadingByMajor, 
    isError: errorByMajor, 
    error: errorByMajorMessage 
  } = useGetJobOpportunitiesByMajor(filters.majorId || '');
  
  // Hook para filtrado de otras propiedades (nombre, salario)
  // Solo se pasa los datos base y los filtros sin majorId
  const filtersWithoutMajor = { ...filters };
  delete filtersWithoutMajor.majorId;
  
  const { filteredJobOpportunities, updateFilters: updateLocalFilters } = useFilterJobOpportunities(
    allJobOpportunities,
    filtersWithoutMajor
  );
  
  // Efecto para actualizar las salidas laborales base según si hay filtro de carrera
  useEffect(() => {
    if (filters.majorId) {
      // Si hay filtro de carrera, usar las salidas específicas de esa carrera
      setAllJobOpportunities(jobsByMajor || []);
    } else {
      // Si no hay filtro de carrera, usar todas las salidas laborales
      setAllJobOpportunities(allJobs || []);
    }
  }, [filters.majorId, allJobs, jobsByMajor]);
  
  // Función para actualizar filtros
  const updateFilters = (newFilters: JobOpportunityFilters) => {
    setFilters(newFilters);
    
    // Si no hay filtro de carrera, aplicar filtros locales
    if (!newFilters.majorId) {
      const localFilters = { ...newFilters };
      delete localFilters.majorId;
      updateLocalFilters(localFilters);
    }
  };
  
  // Función para resetear filtros
  const resetFilters = () => {
    const resetFilters = {};
    setFilters(resetFilters);
    updateLocalFilters(resetFilters);
  };
  
  // Determinar datos finales y estado de carga
  const finalJobOpportunities = filters.majorId ? (jobsByMajor || []) : filteredJobOpportunities;
  const isLoading = filters.majorId ? loadingByMajor : loadingAll;
  const isError = filters.majorId ? errorByMajor : errorAll;
  const error = filters.majorId ? errorByMajorMessage : errorAllMessage;
  
  return {
    jobOpportunities: finalJobOpportunities,
    filters,
    updateFilters,
    resetFilters,
    isLoading,
    isError,
    error
  };
};