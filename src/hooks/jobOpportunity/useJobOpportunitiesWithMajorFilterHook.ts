import { useState, useMemo } from 'react';
import { useGetAllJobOpportunities } from './useGetAllJobOpportunitiesHook';
import { useGetJobOpportunitiesByMajor } from './useGetJobOpportunitiesByMajorHook';
import { filterJobOpportunities } from '@/services/jobOpportunityService';
import { JobOpportunity, JobOpportunityFilters } from '@/types/jobOpportunityType';

/**
 * Hook personalizado para manejar salidas laborales con filtrado completo
 * @param {JobOpportunityFilters} initialFilters - Filtros iniciales
 * @returns {Object} - Objeto con salidas laborales filtradas y funciones de control
 */
export const useJobOpportunitiesWithMajorFilter = (initialFilters: JobOpportunityFilters = {}) => {
  const [filters, setFilters] = useState<JobOpportunityFilters>(initialFilters);
  
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
  } = useGetJobOpportunitiesByMajor(filters.majorId);
  
  // Determinar qué datos usar como base
  const baseJobOpportunities = useMemo(() => {
    if (filters.majorId && filters.majorId.length > 0) {
      console.log('🎯 Usando jobs filtradas por carrera:', jobsByMajor?.length || 0);
      return jobsByMajor || [];
    } else {
      console.log('📋 Usando todas las jobs:', allJobs?.length || 0);
      return allJobs || [];
    }
  }, [filters.majorId, allJobs, jobsByMajor]);
  
  // Aplicar filtros adicionales (nombre, salario) sobre los datos base
  const filteredJobOpportunities = useMemo(() => {
    const filtersWithoutMajor = { ...filters };
    delete filtersWithoutMajor.majorId;
    
    // Si no hay otros filtros, retornar los datos base
    const hasOtherFilters = Object.keys(filtersWithoutMajor).some(
      key => filtersWithoutMajor[key as keyof JobOpportunityFilters] !== undefined && 
             filtersWithoutMajor[key as keyof JobOpportunityFilters] !== ''
    );
    
    if (!hasOtherFilters) {
      return baseJobOpportunities;
    }
    
    // Aplicar filtros adicionales
    return filterJobOpportunities(baseJobOpportunities, filtersWithoutMajor);
  }, [baseJobOpportunities, filters]);
  
  // Función para actualizar filtros
  const updateFilters = (newFilters: JobOpportunityFilters) => {
    console.log('🔄 Actualizando filtros en hook:', newFilters);
    setFilters(newFilters);
  };
  
  // Función para resetear filtros
  const resetFilters = () => {
    const resetFilters = {};
    setFilters(resetFilters);
  };
  
  // Determinar el estado de carga y error
  const isLoading = filters.majorId ? loadingByMajor : loadingAll;
  const isError = filters.majorId ? errorByMajor : errorAll;
  const error = filters.majorId ? errorByMajorMessage : errorAllMessage;
  
  console.log('📊 Hook final result:', {
    hasMajorFilter: !!filters.majorId,
    baseJobsCount: baseJobOpportunities.length,
    filteredCount: filteredJobOpportunities.length,
    isLoading,
    isError,
    filters
  });
  
  return {
    jobOpportunities: filteredJobOpportunities,
    filters,
    updateFilters,
    resetFilters,
    isLoading,
    isError,
    error
  };
};