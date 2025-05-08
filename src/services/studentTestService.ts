import { userApi } from "../lib/api";
import { CompetencyAverages } from "../types/testResultType";

export const getVocationalTest = async () => {
  const resp = await userApi.get<{ data: { vocational: Record<string, any> } }>(
    "/student-test/vocational"
  );
  return resp.data.data.vocational;
};

export const patchTestResult = async (
  averages: CompetencyAverages
): Promise<void> => {
  const response = await userApi.patch<void>("/user/test-result", averages);
  console.log("Response Headers:", response.headers);
};
