// src/services/userService.ts
import { Major } from "@/types/majorType";
import { userApi } from "../lib/api";
import {
  CreateUserInput,
  UpdateUserInput,
  User,
  ImpersonateResponse,
  ImpersonateUserDto,
  PaginatedUsers,
} from "../types";

export const createUser = async (newUser: CreateUserInput): Promise<User> => {
  const response = await userApi.post<User>("/user", newUser);

  // Print headers for debugging

  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>("/user");
  return data;
};

// Obtener recomendaciones de carreras
export const getAllRecomendations = async (): Promise<Major[]> => {
  const { data } = await userApi.get<Major[]>("/user/recommendations");
  return data;
};

export const getStudentsByTutor = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/students`);
  return data;
};

export const getViewersByUniversity = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/viewers`);
  return data;
};

export const getManagersByUniversity = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/infomanagers`);
  return data;
};

export const getSupportUsersByAdmin = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/support`);
  return data;
};

export const getUsersBySupport = async (
  filters: { search?: string; userType?: string },
  pagination: { page: number; limit: number }
): Promise<PaginatedUsers> => {
  const { data } = await userApi.get<PaginatedUsers>("/user/support-users", {
    params: { ...filters, page: pagination.page, limit: pagination.limit },
  });
  return data;
};

export const impersonateUser = async (
  targetUserId: string
): Promise<ImpersonateResponse> => {
  const payload: ImpersonateUserDto = { targetUserId };
  const { data } = await userApi.post<ImpersonateResponse>(
    "/auth/impersonate",
    payload
  );
  console.log("Impersonation result:", data);
  return data;
};

export const getFinanceUsersByAdmin = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/finances`);
  return data;
};

export const getMarketingUsersByAdmin = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/marketing`);
  return data;
};

export const deleteUser = async (cascade: boolean = false): Promise<void> => {
  await userApi.delete(`/user?cascade=${cascade}`);
};

// Y agregar un nuevo método para eliminar otros usuarios por ID si es necesario
export const deleteUserById = async (id: string): Promise<void> => {
  await userApi.delete(`/user/${id}`);
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await userApi.get<User>(`/user/${id}`);
  return data;
};

export const updateUser = async ({
  ...updates
}: UpdateUserInput): Promise<User> => {
  const { data } = await userApi.patch<User>(`/user/`, updates);
  return data;
};

export const updateUserByEmail = async ({
  email,
  ...updates
}: { email: string } & UpdateUserInput): Promise<User> => {
  const { data } = await userApi.patch<User>(
    `/user/by-email/${email}`,
    updates
  );
  return data;
};
