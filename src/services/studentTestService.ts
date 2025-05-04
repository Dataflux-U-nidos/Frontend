// src/services/passwordRecoveryService.ts
import { userApi } from '../lib/api';

export const getPsychometricTest = async (): Promise<any> => {
    const response = await userApi.get<any>("/student-test/psychometric");
    console.log("Psychometric Response Headers:", response.headers);
    return response.data;
  };
  
  // Vocacional completo
  export const getVocationalTest = async (): Promise<any> => {
    const response = await userApi.get<any>("/student-test/vocational");
    console.log("Vocational Response Headers:", response.headers);
    return response.data;
  };
  
  // Vocacional parcial
  export const getPartialVocationalTest = async (): Promise<any> => {
    const response = await userApi.get<any>(
      "/student-test/vocational-partial"
    );
    console.log("Partial Vocational Response Headers:", response.headers);
    return response.data;
  };