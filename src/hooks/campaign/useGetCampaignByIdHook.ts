// src/hooks/campaign/useGetCampaignByIdHook.ts
import { useQuery } from "@tanstack/react-query";
import { getCampaignById } from "@/services/campaignService";

export const useGetCampaignById = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["campaign", id],
        queryFn: () => getCampaignById(id),
        enabled: enabled && !!id,
    });
};