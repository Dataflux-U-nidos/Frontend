import { FormField } from "@/types/formTypes";
import AccountForm from "@/components/organisms/Account-form";
import { ArrowLeft } from "lucide-react";

interface AccountTemplateProps {
  accountFields: FormField[];
  initialValues: any; // Cambiado a any para evitar dependencias con el tipo User
  onSubmit: (values: any) => void;
  onCancel: () => void;
  onDeleteAccount?: () => void; // Nuevo prop para manejar la eliminación de cuenta
  loading: boolean;
  deleteLoading?: boolean; // Estado de carga para la eliminación
  error: string | null;
  success: string | null;
}

export default function AccountTemplate({
  accountFields,
  initialValues,
  onSubmit,
  onCancel,
  onDeleteAccount,
  loading,
  deleteLoading,
  error,
  success
}: AccountTemplateProps) {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={onCancel}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {success}
            </div>
          )}
          
          <AccountForm
            fields={accountFields}
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onDeleteAccount={onDeleteAccount}
            loading={loading}
            deleteLoading={deleteLoading}
          />
        </div>
      </div>
    </main>
  );
}