// src/services/auth.ts

import { authApi, setTokens, clearTokens } from '../lib/api/authApi';
import { LoginInput, LoginResponse } from '../types';

export const login = async (
  credentials: LoginInput
): Promise<{ userType: string }> => {
  // 1) Hacemos la llamada al servidor
  const { data } = await authApi.post<LoginResponse>(
    '/auth/login',
    credentials
  );

  // 2) Almacenamos ambos tokens (access + refresh)
  setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return { userType: data.userType };
};

export const getSession = async (): Promise<{ userType: string }> => {
  // El interceptor ya pone el header Authorization con el accessToken guardado
  const { data } = await authApi.get<{ userType: string }>('/auth/me');
  return { userType: data.userType };
};

export const logout = async (): Promise<void> => {
  // 1) Avisamos al backend (opcional, según tu flujo)
  await authApi.post('/auth/logout');
  // 2) Borramos los tokens localmente
  clearTokens();
};
