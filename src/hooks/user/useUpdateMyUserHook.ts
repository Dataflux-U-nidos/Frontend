// hooks/useUserHooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "@/services/userService";
import { UpdateUserInput, User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

interface JwtPayload {
  id: string /* otros campos… */;
}

export function useUpdateMyUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: async (updates) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No auth token found");
      const { id } = jwtDecode<JwtPayload>(token);
      return await updateUser(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
