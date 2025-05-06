import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";

// Interfaz genérica para los filtros
export interface FilterField<T = any> {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'range' | 'boolean' | 'date';
  options?: { value: string | number; label: string }[];
  defaultValue?: T;
  min?: number;
  max?: number;
  placeholder?: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Record<string, any>) => void;
  currentFilters: Record<string, any>;
  filterFields: FilterField[];
  title?: string;
  description?: string;
  applyButtonText?: string;
  resetButtonText?: string;
  cancelButtonText?: string;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
  filterFields,
  title = "Filtrar",
  description = "Selecciona los filtros que deseas aplicar",
  applyButtonText = "Aplicar Filtros",
  resetButtonText = "Limpiar Filtros",
  cancelButtonText = "Cancelar",
}) => {
  const [filters, setFilters] = useState<Record<string, any>>(currentFilters);

  // Resetear los filtros cuando se abre el modal o cambian los filtros actuales
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
    const resetFilters: Record<string, any> = {};
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  // Render un campo de filtro según su tipo
  const renderFilterField = (field: FilterField) => {
    switch (field.type) {
      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              id={field.id}
              name={field.id}
              value={filters[field.id] || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Todos</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'range':
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${field.id}Min`} className="block text-xs text-gray-500 mb-1">
                  Mínimo
                </label>
                <input
                  type="number"
                  id={`${field.id}Min`}
                  name={`${field.id}Min`}
                  value={filters[`${field.id}Min`] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                />
              </div>
              <div>
                <label htmlFor={`${field.id}Max`} className="block text-xs text-gray-500 mb-1">
                  Máximo
                </label>
                <input
                  type="number"
                  id={`${field.id}Max`}
                  name={`${field.id}Max`}
                  value={filters[`${field.id}Max`] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          </div>
        );
      
      case 'number':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="number"
              id={field.id}
              name={field.id}
              value={filters[field.id] || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              min={field.min}
              max={field.max}
              placeholder={field.placeholder}
            />
          </div>
        );
      
      case 'boolean':
        return (
          <div key={field.id} className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={field.id}
              name={field.id}
              checked={!!filters[field.id]}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  [field.id]: e.target.checked,
                });
              }}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor={field.id} className="ml-2 block text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        );
      
      // Por defecto, campo de texto
      default:
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              id={field.id}
              name={field.id}
              value={filters[field.id] || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder={field.placeholder}
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-2 py-4 max-h-[60vh] overflow-y-auto">
          {filterFields.map((field) => renderFilterField(field))}
        </div>
        
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {resetButtonText}
          </Button>
          <Button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            {applyButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};