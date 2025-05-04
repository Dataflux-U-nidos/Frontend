import testData from "@/data/testPsicometrico.json";
import { TestTemplate } from "@/components/templates/TestTemplate";
import { useNavigate } from "react-router-dom";
import { useSurveyStore } from "@/lib/Likert/useSurveyStore";
import { useEffect } from "react";

export default function TestPsicometricoScreen() {
    const navigate = useNavigate();
    const { answers } = useSurveyStore();

    useEffect(() => {
        //const totalItems = Object.keys(answers).length;
        //const filled = Object.values(answers).filter(Boolean).length;
    }, [answers, navigate]);
    console.log("TestPsicometricoScreen", testData);
    return <TestTemplate data={testData} />;
}
