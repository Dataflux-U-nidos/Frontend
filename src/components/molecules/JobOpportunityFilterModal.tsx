import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { Slider } from "@/components/atoms/ui/slider";
import { JobOpportunityFilters } from "@/types/jobOpportunityType";

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

  const handleApplyFilters = () => {
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