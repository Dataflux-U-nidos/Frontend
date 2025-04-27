import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserByEmail } from "@/services/userService";
import { User } from "@/types";
import { QUERY_KEYS } from "@/lib/api";

type Input = { email: string; password: string;};

export function useUpdateUserByEmail() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Input>({
    mutationFn: updateUserByEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
}
