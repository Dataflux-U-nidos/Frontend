import { TestTemplate } from "@/components/templates/TestTemplate";
import { useNavigate } from "react-router-dom";
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { useEffect } from "react";
import { useVocationalTest } from "@/hooks/studentTests/useGetVocationalTestHook";

export default function TestVocationalScreen() {
    const navigate = useNavigate();
    const { answers } = useSurveyStore();
    const { data, loading, error } = useVocationalTest();
  
    useEffect(() => {
      const totalItems = Object.keys(answers).length;
      const filled = Object.values(answers).filter(Boolean).length;
    }, [answers, navigate]);
  
    if (loading) return <div>Cargando test...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No se pudo cargar el test.</div>;
    console.log("Info:", data);
  
    return <TestTemplate data={data} 
    pageTitle="Test Vocacional"/>;
}