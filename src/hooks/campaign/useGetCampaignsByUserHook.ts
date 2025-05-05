// src/hooks/campaign/useGetCampaignsByUserHook.ts
import { useQuery } from "@tanstack/react-query";
import { getCampaignsByUser } from "@/services/campaignService";

export const useGetCampaignsByUser = (userId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["campaigns", "user", userId],
        queryFn: () => getCampaignsByUser(userId),
        enabled: enabled && !!userId,
    });
};