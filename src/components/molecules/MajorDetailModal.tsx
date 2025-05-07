import React, { useState, useEffect } from 'react';
import { MajorFilters } from '../../types/majorType';

interface MajorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MajorFilters) => void;
  currentFilters: MajorFilters;
}

export const MajorFilterModal: React.FC<MajorFilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<MajorFilters>(currentFilters);

  // Resetear los filtros cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Convertir a número los campos numéricos
    if (type === 'number') {
      setFilters({
        ...filters,
        [name]: value ? Number(value) : undefined,
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: MajorFilters = {};
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Filtrar Carreras</h2>
        
        <div className="space-y-4">
          {/* Filtro por dificultad */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Dificultad
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={filters.difficulty || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Todas</option>
              <option value="EASY">Fácil</option>
              <option value="MEDIUM">Media</option>
              <option value="HARD">Difícil</option>
            </select>
          </div>
          
          {/* Filtro por rango de precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-1">
                Precio Mínimo
              </label>
              <input
                type="number"
                id="priceMin"
                name="priceMin"
                value={filters.priceMin || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-1">
                Precio Máximo
              </label>
              <input
                type="number"
                id="priceMax"
                name="priceMax"
                value={filters.priceMax || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>
          </div>
          
          {/* Filtro por enfoque */}
          <div>
            <label htmlFor="focus" className="block text-sm font-medium text-gray-700 mb-1">
              Enfoque
            </label>
            <input
              type="text"
              id="focus"
              name="focus"
              value={filters.focus || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ej: Publicidad, Marketing, etc."
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Limpiar Filtros
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};