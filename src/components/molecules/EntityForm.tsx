import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/ui/dialog";

export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // Para select
  placeholder?: string;
  defaultValue?: any;
}

interface EntityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  fields: FormField[];
  title: string;
  description?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  description = "",
  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
}) => {
  // Estado para gestionar todos los campos de forma dinámica
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  // Inicializar el formulario con valores por defecto
  React.useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, any> = {};
      fields.forEach(field => {
        initialData[field.name] = field.defaultValue || "";
      });
      setFormData(initialData);
    }
  }, [isOpen, fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Manejar checkboxes
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const { name, label, type, required, options, placeholder } = field;

    switch (type) {
      case 'select':
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <select
              id={name}
              name={name}
              required={required}
              value={formData[name] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleccione...</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <textarea
              id={name}
              name={name}
              required={required}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2" key={name}>
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={formData[name] || false}
              onChange={handleChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
          </div>
        );
        
      default:
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        );
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Renderizar campos en una o dos columnas dependiendo del número */}
          <div className={`grid ${fields.length > 5 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            {fields.map(field => renderField(field))}
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {submitButtonText}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};