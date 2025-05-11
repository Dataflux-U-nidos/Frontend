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
    <div className=" flex flex-col items-center bg-white  justify-center bg-gray-50 p-4">
      <h1 className="text-lg text-center mb-2 text-orange-500 ">
        Por favor, completa el formulario para continuar.
      </h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-center">
          Formulario de Calificaciones
        </h2>
        <p className="text-sm text-center mb-4">
          pon tus notas obtenidas al finalizar tus estudios en una escala de 0-5.
        </p>
        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}
        <GradesFormTemplate
          ref={formRef}
        />
        <Button
          className="mt-4 w-full"
          onClick={() => formRef.current?.handleSubmit(handleFormSubmit)()}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
};
