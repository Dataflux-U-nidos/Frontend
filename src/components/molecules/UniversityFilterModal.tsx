// src/components/molecules/UniversityFilterModal.tsx
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { UniversityFilters } from "@/types/universityType";

interface UniversityFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: UniversityFilters) => void;
  currentFilters: UniversityFilters;
}

// Opciones predefinidas para zonas y localidades de Bogotá
const zoneOptions = [
  { value: 'Norte', label: 'Norte' },
  { value: 'Sur', label: 'Sur' },
  { value: 'Oriente', label: 'Oriente' },
  { value: 'Occidente', label: 'Occidente' },
  { value: 'Centro', label: 'Centro' }
];

const localityOptions = [
  { value: 'Chapinero', label: 'Chapinero' },
  { value: 'Suba', label: 'Suba' },
  { value: 'Usaquén', label: 'Usaquén' },
  { value: 'Engativá', label: 'Engativá' },
  { value: 'Kennedy', label: 'Kennedy' },
  { value: 'Bosa', label: 'Bosa' },
  { value: 'Ciudad Bolívar', label: 'Ciudad Bolívar' },
  { value: 'Soacha', label: 'Soacha' },
  { value: 'La Candelaria', label: 'La Candelaria' },
  { value: 'San Cristóbal', label: 'San Cristóbal' },
  { value: 'Usme', label: 'Usme' },
  { value: 'Tunjuelito', label: 'Tunjuelito' },
  { value: 'Bosa', label: 'Bosa' },
  { value: 'Puente Aranda', label: 'Puente Aranda' },
  { value: 'La Candelaria', label: 'La Candelaria' },
  { value: 'Teusaquillo', label: 'Teusaquillo' },
  { value: 'Barrios Unidos', label: 'Barrios Unidos' },
  { value: 'Fontibón', label: 'Fontibón' },
  { value: 'Rafael Uribe Uribe', label: 'Rafael Uribe Uribe' },
  { value: 'Antonio Nariño', label: 'Antonio Nariño' }
];

export function UniversityFilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}: UniversityFilterModalProps) {
  const [filters, setFilters] = React.useState<UniversityFilters>(currentFilters);

  // Actualizar el estado local cuando cambian los filtros actuales
  React.useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  const handleInputChange = (field: keyof UniversityFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value || undefined
    }));
  };

  const handleApplyFilters = () => {
    // Filtrar los valores vacíos antes de aplicar
    const cleanFilters: UniversityFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        cleanFilters[key as keyof UniversityFilters] = value;
      }
    });
    
    onApplyFilters(cleanFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: UniversityFilters = {};
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Filtrar Universidades
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Filtro por zona */}
          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
              Zona
            </label>
            <select
              id="zone"
              value={filters.zone || ''}
              onChange={(e) => handleInputChange('zone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las zonas</option>
              {zoneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por localidad */}
          <div>
            <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-1">
              Localidad
            </label>
            <select
              id="locality"
              value={filters.locality || ''}
              onChange={(e) => handleInputChange('locality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las localidades</option>
              {localityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              placeholder="Buscar por dirección..."
              value={filters.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ej: Carrera 7, Calle 100, etc.
            </p>
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