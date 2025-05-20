// src/hooks/major/useUpdateMajorHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMajor } from "@/services/majorService";
import { UpdateMajorInput } from "@/types/majorType";

export const useUpdateMajor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateMajorInput }) => {
      console.log('Updating major with id:', id, 'and updates:', updates);
      return updateMajor(id, updates);
    },
    onSuccess: (_data, variables) => {
      console.log('Major updated successfully');
      // Invalidar todas las queries de majors
      queryClient.invalidateQueries({ queryKey: ["majors"] });
      // Invalidar la query específica del major
      queryClient.invalidateQueries({ queryKey: ["major", variables.id] });
    },
    onError: (error) => {
      console.error("Error en useUpdateMajor:", error);
    }
  });
};