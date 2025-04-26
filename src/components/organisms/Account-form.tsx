import { FormField } from "@/types/formTypes";
import { useForm, Controller } from "react-hook-form";
import { 
  User as UserIcon,
  Mail,
  Book,
  Building,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface AccountFormValues {
  name: string;
  program: string;
  institution: string;
  email?: string;
}

interface AccountFormProps {
  fields: FormField[];
  initialValues: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onCancel: () => void;
  onDeleteAccount?: () => void;
  loading: boolean;
  deleteLoading?: boolean;
}

export default function AccountForm({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  onDeleteAccount,
  loading
}: AccountFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<AccountFormValues>({
    defaultValues: {
      ...initialValues,
    }
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getIconForField = (type: string) => {
    switch(type) {
      case 'email':
        return <Mail className="h-5 w-5 text-gray-400" />;
      case 'user':
        return <UserIcon className="h-5 w-5 text-gray-400" />;
      case 'program':
        return <Book className="h-5 w-5 text-gray-400" />;
      case 'institution':
        return <Building className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDeleteAccount && onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="relative">              
              <div className="relative rounded-lg shadow-sm">
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
                        className="
                          pl-4 pr-4 py-3
                          block w-full rounded-lg border border-gray-200 
                          shadow-sm focus:border-blue-500 focus:ring-blue-500 
                          sm:text-md bg-white
                          transition duration-200
                        "
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
        
        <div className="mt-8 flex flex-col space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex justify-center items-center
              py-3 px-4 
              border border-transparent 
              shadow-sm text-md font-medium rounded-lg 
              text-white bg-orange-400 hover:bg-orange-500 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400
              transition duration-200
              w-full
            "
          >
            {loading ? 'Enviando...' : 'Guardar cambios'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              inline-flex justify-center py-3 px-4 
              border border-gray-300 
              shadow-sm text-md font-medium rounded-lg 
              text-gray-700 bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
              transition duration-200
              w-full
            "
          >
            Cancelar
          </button>
          
          {onDeleteAccount && (
            <button
              type="button"
              onClick={handleDeleteClick}
              className="
                inline-flex justify-center items-center
                py-3 px-4 mt-4
                border border-red-300
                shadow-sm text-md font-medium rounded-lg
                text-red-600 bg-white hover:bg-red-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300
                transition duration-200
                w-full
              "
            >
              <Trash2 className="h-5 w-5 mr-2" />
              {showDeleteConfirm ? '¿Estás seguro? Haz clic de nuevo para confirmar' : 'Eliminar cuenta'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}