// src/services/userService.ts
import { userApi } from "../lib/api";
import { CreateUserInput, UpdateUserInput, User } from "../types";

export const createUser = async (newUser: CreateUserInput): Promise<User> => {
  const response = await userApi.post<User>("/user", newUser);

  // Print headers for debugging
  console.log("Response Headers:", response.headers);
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>("/user");
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

export const getFinanceUsersByAdmin = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/finances`);
  return data;
};

export const getMarketingUsersByAdmin = async (): Promise<User[]> => {
  const { data } = await userApi.get<User[]>(`/user/marketing`);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
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
