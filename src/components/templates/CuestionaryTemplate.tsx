// components/templates/SendEmailTemplate.tsx

import { FormField } from "@/types/formTypes";
import AccountForm from "@/components/organisms/Account-form";

interface SendEmailTemplateProps {
  fields: FormField[];
  initialValues: any;
  onSubmit: (values: any) => void;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function SendEmailTemplate({
  fields,
  initialValues,
  onSubmit,
  loading,
  error,
  success
}: SendEmailTemplateProps) {
  return (
    <main
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/7683685/pexels-photo-7683685.jpeg?cs=srgb&dl=pex')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          ¡Comparte tu experiencia! Llena nuestra encuesta de satisfacción
        </h1>

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
          modo="encuesta" // 👈 Aquí está el cambio
          fields={fields}
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={() => { }}
          loading={loading}
        />
      </div>
    </main>
  );
}
