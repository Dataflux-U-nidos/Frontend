import { TestTemplate } from "@/components/templates/TestTemplate";
import { useNavigate } from "react-router-dom";
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { useEffect } from "react";
import { usePsychometricTest } from "@/hooks/studentTests/useGetPyschometricTestHook";

export default function TestPsicometricoScreen() {
    const navigate = useNavigate();
    const { answers } = useSurveyStore();
    const { data, loading, error } = usePsychometricTest();
  
    useEffect(() => {
    
    }, [answers, navigate]);
  
    if (loading) return <div>Cargando test...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No se pudo cargar el test.</div>;
    console.log("Data:", data);
  
    return <TestTemplate data={data} 
    pageTitle="Test Psicométrico" />;
}