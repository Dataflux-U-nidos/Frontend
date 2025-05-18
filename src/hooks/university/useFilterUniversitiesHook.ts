// src/hooks/university/useFilterUniversitiesHook.ts
import { useState, useEffect } from 'react';
import { University, UniversityFilters } from '@/types/universityType';
import { filterUniversities } from '@/services/universityService';

/**
 * Hook para filtrar universidades en el cliente
 * @param {University[]} universities - Lista de universidades a filtrar
 * @param {UniversityFilters} initialFilters - Filtros iniciales
 * @returns {Object} - Objeto con universidades filtradas y funciones para actualizar filtros
 */
export const useFilterUniversities = (universities: University[], initialFilters: UniversityFilters = {}) => {
  const [filters, setFilters] = useState<UniversityFilters>(initialFilters);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>(universities);

  // Actualizar universidades filtradas cuando cambian las universidades o filtros
  useEffect(() => {
    setFilteredUniversities(filterUniversities(universities, filters));
  }, [universities, filters]);

  // Función para actualizar filtros
  const updateFilters = (newFilters: UniversityFilters) => {
    setFilters(newFilters);
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setFilters({});
  };

  return {
    filteredUniversities,
    filters,
    updateFilters,
    resetFilters
  };
};