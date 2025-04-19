import { FormField } from "@/types/formTypes";
import { useForm, Controller } from "react-hook-form";
import { 
  User as UserIcon,
  Mail
} from "lucide-react";
import { useState } from "react";

interface AccountFormValues {
  name: string;
  last_name: string;
  email: string;
}

interface AccountFormProps {
  fields: FormField[];
  initialValues: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function AccountForm({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  loading
}: AccountFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<AccountFormValues>({
    defaultValues: {
      ...initialValues,
    }
  });

  const getIconForField = (type: string) => {
    switch(type) {
      case 'email':
        return <Mail className="h-5 w-5 text-gray-400" />;
      case 'user':
        return <UserIcon className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="relative">
            <label 
              htmlFor={field.key} 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.placeholder}
            </label>
            
            <div className="relative rounded-md shadow-sm">
              {getIconForField(field.type) && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getIconForField(field.type)}
                </div>
              )}
              
              <Controller
                name={field.key as keyof AccountFormValues}
                control={control}
                rules={{ required: field.required ? `${field.placeholder} es requerido` : false }}
                render={({ field: fieldProps }) => {
                  const inputType = field.type === 'email' ? 'email' : 'text';

                  return (
                    <input
                      {...fieldProps}
                      type={inputType}
                      id={field.key}
                      placeholder={field.placeholder}
                      className={`
                        ${getIconForField(field.type) ? 'pl-10' : 'pl-4'}
                        pr-4
                        block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                        ${errors[field.key as keyof AccountFormValues] ? 'border-red-300' : ''}
                      `}
                    />
                  );
                }}
              />
            </div>
            
            {(errors as Record<string, any>)[field.key] && (
              <p className="mt-2 text-sm text-red-600">
                {(errors as Record<string, any>)[field.key]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
}
