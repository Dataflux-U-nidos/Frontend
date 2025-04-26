import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, QUERY_KEYS } from "../../lib/api";
import { CreateUserInput, User } from "../../types";

const createUser = async (newUser: CreateUserInput): Promise<User> => {
  const response = await userApi.post<User>("/user", newUser);

  // Print headers for debugging
  console.log("Response Headers:", response.headers);

  return response.data;
};

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
