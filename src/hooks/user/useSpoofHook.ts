import { useMutation } from "@tanstack/react-query";
import { impersonateUser } from "@/services/userService";
import { ImpersonateResponse } from "@/types/Impersonate";

export function useSpoofHook() {
  return useMutation<ImpersonateResponse, Error, string>({
    mutationFn: (targetUserId: string) => impersonateUser(targetUserId),
    onSuccess: (data) => {
      // store new tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // reload as impersonated user
      window.location.href = "/auth";
    },
  });
}
