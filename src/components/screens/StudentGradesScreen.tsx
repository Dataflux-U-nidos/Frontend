import { useRef } from "react";
import { Button } from "@/components/atoms/ui/button";
import { GradesFormTemplate } from "@/components/templates/GradesFormTemplate";
import type { DynamicFormHandles } from "@/components/molecules/Dynamic-form";
import { useUpdateMyUser, usePatchGradesResult } from "@/hooks/";
import type { GradeFormType } from "@/types/gradeFormType";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "@/lib/utils/notify";
import { useAuthContext } from "@/context/AuthContext";

export default function StudentGradesScreen() {
  const navigate = useNavigate(); const formRef = useRef<DynamicFormHandles>(null);
  const { submit, loading, error } = usePatchGradesResult();
  const { mutateAsync: updateUser } = useUpdateMyUser();
  const { refreshUser } = useAuthContext();


  const handleFormSubmit = async (values: Record<string, any>) => {
    const payload: GradeFormType = {
      zone: values.zone,
      locality: values.locality,
      le: Number(values.lenguaje),
      ma: Number(values.matematicas),
      ci: Number(values.cienciasNaturales),
      cc: Number(values.cienciasSociales),
      idi: Number(values.idiomas),
      ar: Number(values.artes),
    };

    try {
      await submit(payload);
      notifySuccess({
        title: "Perfecto!",
        description: "Tus notas se han guardado.",
        icon: "✅",
        closeButton: true,
      });
      const updateTestCompleted = {
      testCompleted: true,
    };

      await updateUser(updateTestCompleted);

      await refreshUser();
      navigate("/student-vocationalTest");
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-60 to-orange-100 relative overflow-hidden">
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 
            bg-clip-text text-transparent mb-4 leading-tight">
            Formulario de Calificaciones
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Por favor, completa el formulario para continuar con tu evaluación vocacional
          </p>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-2xl">
          {/* Glass Card Effect */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl 
            p-8 md:p-12 transition-all duration-500 hover:shadow-3xl hover:bg-white/90">

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="space-y-8">
              <GradesFormTemplate ref={formRef} />
              
              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  className={`w-full py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300 
                    transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
                    ${loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-300 to-orange-500 hover:from-orange-400 hover:to-orange-600'
                    } text-white relative overflow-hidden group`}
                  onClick={() => formRef.current?.handleSubmit(handleFormSubmit)()}
                  disabled={loading}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Continuar
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};