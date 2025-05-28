import { useState, useEffect } from 'react';
import { Major, MajorFilters } from '@/types/majorType';
import { filterMajors } from '@/services/majorService';

/**
 * Hook para filtrar carreras en el cliente
 * @param {Major[]} majors - Lista de carreras a filtrar
 * @param {MajorFilters} initialFilters - Filtros iniciales
 * @returns {Object} - Objeto con majors filtrados y funciones para actualizar filtros
 */
export const useFilterMajors = (majors: Major[], initialFilters: MajorFilters = {}) => {
  const [filters, setFilters] = useState<MajorFilters>(initialFilters);
  const [filteredMajors, setFilteredMajors] = useState<Major[]>(majors);

  // Actualizar majors filtrados cuando cambian los majors o filtros
  useEffect(() => {
    setFilteredMajors(filterMajors(majors, filters));
  }, [majors, filters]);

  // Función para actualizar filtros
  const updateFilters = (newFilters: MajorFilters) => {
    setFilters(newFilters);
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setFilters({});
  };

  return {
    filteredMajors,
    filters,
    updateFilters,
    resetFilters
  };
};