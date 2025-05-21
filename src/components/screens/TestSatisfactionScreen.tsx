// src/pages/TestSatisfactionScreen.tsx
import { TestTemplate } from "@/components/templates/TestTemplate";
import { useNavigate } from "react-router-dom";
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { useCallback, useEffect } from "react";
import { useSatisfactionTest } from "@/hooks/studentTests/useGetSatisfactionTestHook";
import { usePatchTestResult } from "@/hooks/studentTests/useUpdateSatisfactionHooks";
import { useNotify } from "@/hooks/useNotify";
import { notifySuccess } from "@/lib/utils/notify";

export default function TestSatisfactionScreen() {
  const navigate = useNavigate();
  const { answers } = useSurveyStore();
  const { data, loading, error } = useSatisfactionTest();
  const { submit, loading: submitting, error: submitError } = usePatchTestResult();
  const { notifyError } = useNotify();

  const totalItems = 4;

  const handleSubmit = useCallback(async () => {
    const answeredItems = Object.values(answers).filter((v) => v != null).length;

    if (answeredItems < totalItems) {
      notifyError({
        title: "Test incompleto",
        description: "Por favor responde todas las preguntas antes de enviar.",
        icon: "⚠️",
        closeButton: true,
      });
      return;
    }

    const results = {
      bucket_id : "feedback-Q3-2024",
      responses: [
        answers["sat_1"] as number,
        answers["sat_2"] as number,
        answers["sat_3"] as number,
        answers["sat_4"] as number,
      ],
    };

    try {
      await submit(results);
      navigate("/student-profile");
      notifySuccess({
        title: "¡Gracias!",
        description: "Tu test fue enviado con éxito.",
        icon: "✅",
        closeButton: true,
      });
    } catch {
      notifyError({
        title: "Error",
        description: "No se pudo enviar el test. Intenta de nuevo.",
        icon: "❌",
        closeButton: true,
      });
    }
  }, [answers, navigate, submit, notifyError]);

  useEffect(() => {
    // Si deseas hacer validaciones al cambiar respuestas, puedes usarlas aquí
  }, [answers]);

  if (loading) return <div>Cargando cuestionario...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No se pudo cargar el cuestionario.</div>;

  return (
    <>
      {submitting && <div>Enviando respuestas…</div>}
      {submitError && <div className="text-red-600">Error: {submitError}</div>}
      <TestTemplate
        data={data}
        pageTitle="Cuestionario de Satisfacción"
        onSubmit={handleSubmit}
      />
    </>
  );
}
