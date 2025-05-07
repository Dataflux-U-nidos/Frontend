import { userApi } from '../lib/api';

export const getPsychometricTest = async () => {
  const resp = await userApi.get<{ data: { psicometric: Record<string, any> } }>("/student-test/psychometric");
  return resp.data.data.psicometric;
};

  
  export const getVocationalTest = async () => {
    const resp = await userApi.get<{ data: { vocational: Record<string, any> } }>("/student-test/vocational");
    return resp.data.data.vocational;
  };
  
  export const getPartialVocationalTest = async () => {
    const resp = await userApi.get<any>("/student-test/vocational-partial");
    return resp.data.data.vocational;
  };