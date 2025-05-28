import { satisfactionType } from "@/types/satisfactionType";
import { userApi } from "../lib/api";
import { CompetencyAverages } from "../types/testResultType";
import { GradeFormType } from "@/types/gradeFormType";

export const getVocationalTest = async () => {
  const resp = await userApi.get<{ data: { vocational: Record<string, any> } }>(
    "/student-test/vocational"
  );
  return resp.data.data.vocational;
};

export const patchGradesResult = async (data: GradeFormType): Promise<void> => {
  const response = await userApi.patch<void>("/user/form-result", data);
  console.log("Response Headers:", response.headers);
};

export const patchTestResult = async (
  averages: CompetencyAverages
): Promise<void> => {
  console.info("Payload:", averages);
  const response = await userApi.patch<void>(
    "/user/final-result",
    averages
  );
  console.log("Response Headers:", response.headers);
};

// Obtener preguntas del cuestionario de satisfacción
export const getSatisfactionTest = async () => {
  const resp = await userApi.get<{ data: { satisfaction: Record<string, any> } }>(
    "/student-test/satisfaction"
  );
  return resp.data.data.satisfaction;
};

// Enviar respuestas del cuestionario de satisfacción
export const patchSatisfactionTest = async (
  satisfactionAnswers: satisfactionType
): Promise<void> => {
  console.log("Payload:", satisfactionAnswers);
  const response = await userApi.post<void>(
    "/satisfaction-survey",
    satisfactionAnswers
  );
  console.log("Response Headers:", response.headers);
};

/**
 * Función genérica para enviar resultados según tipo de test
 */
export const patchSurveyResult = async (
  type: "vocational" | "satisfaction",
  data: any
): Promise<void> => {
  if (type === "vocational") {
    // Puedes elegir cuál patch usar: patchGradesResult o patchTestResult según tus datos
    await patchGradesResult(data);
  } else if (type === "satisfaction") {
    await patchSatisfactionTest(data);
  }
};
