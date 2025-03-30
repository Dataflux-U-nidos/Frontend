import { LoginInput, LoginResponse } from '../types';
import { authApi } from '../lib/api/authApi';



export const login = async (credentials: LoginInput): Promise<{ userType: string }> => {
    const { data } = await authApi.post<LoginResponse>('/auth/login', credentials);
    return { userType: data.userType };
};

export const getSession = async (): Promise<{ userType: string }> => {
    const { data } = await authApi.get("/auth/me")
    return { userType: data.userType }
}

export const logout = async () => {
    await authApi.post("/auth/logout")
}