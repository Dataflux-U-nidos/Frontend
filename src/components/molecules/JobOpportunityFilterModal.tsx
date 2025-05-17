import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { Slider } from "@/components/atoms/ui/slider";
import { JobOpportunityFilters } from "@/types/jobOpportunityType";
import { useGetAllMajors } from "@/hooks/major/useGetAllMajorsHook";

interface JobOpportunityFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: JobOpportunityFilters) => void;
  currentFilters: JobOpportunityFilters;
}

export function JobOpportunityFilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}: JobOpportunityFilterModalProps) {
  const [filters, setFilters] = React.useState<JobOpportunityFilters>(currentFilters);
  const [salaryRange, setSalaryRange] = React.useState<number[]>([
    currentFilters.salaryMin || 0,
    currentFilters.salaryMax || 100000000
  ]);

  // Obtener todas las carreras para el filtro
  const { data: majors, isLoading: majorsLoading, error: majorsError } = useGetAllMajors();

  // Debug log
  React.useEffect(() => {
    console.log('🎯 Modal Debug:', {
      majors: majors?.length || 0,
      majorsLoading,
      majorsError: majorsError?.message,
      currentFilters,
      filters
    });
  }, [majors, majorsLoading, majorsError, currentFilters, filters]);

  // Actualizar el estado local cuando cambian los filtros actuales
  React.useEffect(() => {
    setFilters(currentFilters);
    setSalaryRange([
      currentFilters.salaryMin || 0,
      currentFilters.salaryMax || 100000000
    ]);
  }, [currentFilters, isOpen]);

  const handleSalaryChange = (values: number[]) => {
    const [min, max] = values;
    setSalaryRange([min, max]);
    setFilters({ ...filters, salaryMin: min, salaryMax: max });
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const majorId = event.target.value;
    console.log('🎯 Carrera seleccionada:', majorId);
    setFilters({ 
      ...filters, 
      majorId: majorId || undefined 
    });
  };

  const handleApplyFilters = () => {
    console.log('🎯 Aplicando filtros:', filters);
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: JobOpportunityFilters = {};
    setFilters(resetFilters);
    setSalaryRange([0, 100000000]);
    onApplyFilters(resetFilters);
    onClose();
  };

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Filtrar Salidas Laborales
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Debug info - Temporal */}
          {process.env.NODE_ENV === 'development' && (
            <div className="p-2 bg-gray-100 rounded text-xs">
              <strong>Debug:</strong><br/>
              Carreras: {majors?.length || 0}<br/>
              Cargando: {majorsLoading ? 'Sí' : 'No'}<br/>
              Error: {majorsError?.message || 'No'}<br/>
              Filtro actual: {filters.majorId || 'Ninguno'}
            </div>
          )}

          {/* Filtro por carrera */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filtrar por carrera
            </h3>
            <select
              id="major"
              value={filters.majorId || ''}
              onChange={handleMajorChange}
              disabled={majorsLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Todas las carreras</option>
              {majors?.map((major) => (
                <option key={major._id || major.id} value={major._id || major.id}>
                  {major.name}
                </option>
              ))}
            </select>
            {majorsLoading && (
              <p className="text-xs text-gray-500 mt-1">Cargando carreras...</p>
            )}
            {majorsError && (
              <p className="text-xs text-red-500 mt-1">Error al cargar carreras: {majorsError.message}</p>
            )}
            {!majorsLoading && !majorsError && (!majors || majors.length === 0) && (
              <p className="text-xs text-yellow-600 mt-1">No se encontraron carreras disponibles</p>
            )}
          </div>

          {/* Filtro por rango de salario */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Rango de Salario Anual
            </h3>
            <div className="px-4">
              <Slider
                min={0}
                max={100000000}
                step={1000000}
                value={salaryRange}
                onValueChange={handleSalaryChange}
                className="mb-6"
              />
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{formatSalary(salaryRange[0])}</span>
                <span>{formatSalary(salaryRange[1])}</span>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="px-4 py-2 text-sm font-medium"
          >
            Limpiar Filtros
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="px-4 py-2 text-sm font-medium"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
          >
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}