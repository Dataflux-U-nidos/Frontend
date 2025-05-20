// src/hooks/major/useDeleteMajorHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMajor } from "@/services/majorService";

export const useDeleteMajor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      console.log('Hook: Deleting major with id:', id);
      return deleteMajor(id);
    },
    onSuccess: () => {
      console.log('Hook: Major deleted successfully');
      queryClient.invalidateQueries({ queryKey: ["majors"] });
    },
    onError: (error) => {
      console.error("Error en useDeleteMajor:", error);
    }
  });
};