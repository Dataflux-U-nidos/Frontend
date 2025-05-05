// src/hooks/campaign/useUpdateCampaignHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCampaign } from "@/services/campaignService";
import { UpdateCampaignInput } from "@/types/campaingType";

export const useUpdateCampaign = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateCampaignInput }) => 
            updateCampaign(id, updates),
        onSuccess: ( variables) => {
            // Invalidar todas las queries de campañas
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
            // También invalidar la query específica
            queryClient.invalidateQueries({ queryKey: ["campaign", variables.id] });
        },
        onError: (error) => {
            console.error("Error en useUpdateCampaign:", error);
        }
    });

    return mutation;
};