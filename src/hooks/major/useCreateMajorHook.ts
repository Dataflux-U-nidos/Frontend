// src/hooks/major/useCreateMajorHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMajor } from "@/services/majorService";
import { CreateMajorInput } from "@/types/majorType";

export const useCreateMajor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMajor: CreateMajorInput) => createMajor(newMajor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["majors"] });
    },
  });
};