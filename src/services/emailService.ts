// src/services/passwordRecoveryService.ts
import { userApi } from '../lib/api';

export const sendPasswordRecoveryEmail = async (email: string): Promise<void> => {
  await userApi.post('/email/recover', { email });
};
