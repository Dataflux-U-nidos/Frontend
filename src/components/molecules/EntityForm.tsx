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
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: any;
  helpText?: string;
  validation?: {
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
    validate?: (value: any) => boolean | string;
  };
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
  isLoading?: boolean;
  error?: string | null;
  defaultValues?: Record<string, any> | null;
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
  isLoading = false,
  error = null,
  defaultValues
}) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, any> = {};
      fields.forEach(field => {
        initialData[field.name] = 
          (defaultValues && defaultValues[field.name] !== undefined) 
            ? defaultValues[field.name] 
            : (field.defaultValue ?? "");
      });
      setFormData(initialData);
      // Limpiar errores al abrir
      setValidationErrors({});
    }
  }, [isOpen, fields, defaultValues, defaultValues]); 

  const validateField = (field: FormField, value: any): string => {
    // Validar si es requerido
    if (field.required && (!value || value.toString().trim() === "")) {
      return `El campo ${field.label} es obligatorio`;
    }

    // Si no hay validaciones adicionales o el campo está vacío (y no es requerido), no hay error
    if (!field.validation || (!value && !field.required)) {
      return "";
    }

    const validation = field.validation;
    const numericValue = (field.type === "number" && typeof value !== "number")
      ? parseFloat(value)
      : value;

    // Validar patrón (regex)
    if (validation.pattern && value) {
      if (!validation.pattern.value.test(value)) {
        return validation.pattern.message;
      }
    }

    // Validar longitud mínima
    if (validation.minLength && value && value.length < validation.minLength.value) {
      return validation.minLength.message;
    }

    // Validar longitud máxima
    if (validation.maxLength && value && value.length > validation.maxLength.value) {
      return validation.maxLength.message;
    }

    // Validar valor mínimo (para números)
    if (validation.min !== undefined && !isNaN(numericValue) && numericValue < validation.min.value) {
      return validation.min.message;
    }
    if (validation.max !== undefined && !isNaN(numericValue) && numericValue > validation.max.value) {
      return validation.max.message;
    }
    
    // Función de validación personalizada
    if (validation.validate && value) {
      const validationResult = validation.validate(value);
      if (typeof validationResult === 'string') {
        return validationResult;
      } else if (validationResult === false) {
        return `El campo ${field.label} no es válido`;
      }
    }

    return ""; // No hay error
  };

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
    
    // Manejar cambios normales
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validar el campo al cambiar
    const field = fields.find(f => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });
    
    setValidationErrors(newErrors);
    
    // Si no hay errores, enviar el formulario
    if (!hasErrors) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, required, options, placeholder, helpText } = field;
    const hasError = validationErrors[name] && validationErrors[name].length > 0;

    switch (type) {
      case 'select':
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              required={required}
              value={formData[name] || ""}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                hasError 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-orange-500"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
              <option value="">Seleccione...</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="text-xs text-red-500 mt-1">{validationErrors[name]}</p>
            )}
            {helpText && !hasError && (
              <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              required={required}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              disabled={isLoading}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                hasError 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-orange-500"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {hasError && (
              <p className="text-xs text-red-500 mt-1">{validationErrors[name]}</p>
            )}
            {helpText && !hasError && (
              <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
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
              disabled={isLoading}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
            {hasError && (
              <p className="text-xs text-red-500 ml-6">{validationErrors[name]}</p>
            )}
          </div>
        );
        
      default:
        return (
          <div className="space-y-2" key={name}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                hasError 
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-orange-500"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {hasError && (
              <p className="text-xs text-red-500 mt-1">{validationErrors[name]}</p>
            )}
            {helpText && !hasError && (
              <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
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
          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}
          
          {/* Renderizar campos en una o dos columnas dependiendo del número */}
          <div className={`grid ${fields.length > 5 ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            {fields.map(field => renderField(field))}
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {submitButtonText}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};