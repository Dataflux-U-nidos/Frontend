import { TestTemplate } from "@/components/templates/TestTemplate";
import { useNavigate } from "react-router-dom";
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { useCallback, useEffect } from "react";
import { useVocationalTest } from "@/hooks/studentTests/useGetVocationalTestHook";
import { usePatchTestResult } from "@/hooks/studentTests/useUpdateTestResultsHook";
import type { CompetencyAverages } from "@/types/testResultType";
import { useNotify } from "@/hooks/useNotify";

export default function TestVocationalScreen() {
    const navigate = useNavigate();
    const { answers } = useSurveyStore();
    const { data, loading, error } = useVocationalTest();
    const { submit, loading: submitting, error: submitError } = usePatchTestResult();
    const { notifyError } = useNotify();
  
    const calculateAverages = (): CompetencyAverages => {
        type SumCount = { sum: number; count: number };
        const acc: Record<string, SumCount> = {};
    
        Object.entries(answers).forEach(([key, val]) => {
          if (val == null) return;
          const comp = key.split("_")[0]; // ej. "cc", "le", "ma", ...
          if (!acc[comp]) acc[comp] = { sum: 0, count: 0 };
          acc[comp].sum += val;
          acc[comp].count += 1;
        });
    
        const averages: CompetencyAverages = {};
        Object.entries(acc).forEach(([comp, { sum, count }]) => {
          averages[comp] = parseFloat((sum / count).toFixed(2));
        });
    
        return averages;
      };

    useEffect(() => {

    }, [answers, navigate]);
    
    
    const handleSubmit = useCallback(async () => {
        const totalItems = 30;
        const answeredItems = Object.values(answers).filter((v) => v != null).length;
        console.log("Answered items:", answeredItems, "Total items:", totalItems);
        if (answeredItems < totalItems) {
          notifyError({
            title: "Completa el test",
            description:  "No has respondido todas las preguntas.",
            icon: "🚫",
            closeButton: true,
        });
          return;
        }
    
        const results = calculateAverages();
        try {
          await submit(results);
          navigate("/student-profile");
        } catch {
        }
      }, [answers, navigate, submit]);
      
      
      if (loading) return <div>Cargando test...</div>;
      if (error) return <div>{error}</div>;
      if (!data) return <div>No se pudo cargar el test.</div>;
      console.log("Info:", data);
  
      return (
        <>
          {submitting && <div>Enviando resultados…</div>}
          {submitError && <div className="text-red-600">Error: {submitError}</div>}
          <TestTemplate
            data={data}
            pageTitle="Test Vocacional"
            onSubmit={handleSubmit}
          />
        </>
      );
}