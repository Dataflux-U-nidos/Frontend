// src/hooks/campaign/useCreateCampaignHook.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCampaign } from "@/services/campaignService";
import { CreateCampaignInput } from "@/types/campaingType";

export const useCreateCampaign = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newCampaign: CreateCampaignInput) => createCampaign(newCampaign),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["campaigns"] });
        },
    });

    return mutation;
};