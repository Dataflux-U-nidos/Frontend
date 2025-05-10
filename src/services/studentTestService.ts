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


