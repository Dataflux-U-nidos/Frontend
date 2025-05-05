// src/hooks/campaign/useDeleteCampaignHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCampaign } from "@/services/campaignService";

export const useDeleteCampaign = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteCampaign(id),
        onSuccess: () => {
            // Invalidar todas las queries de campañas
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
        onError: (error) => {
            console.error("Error en useDeleteCampaign:", error);
        }
    });

    return mutation;
};