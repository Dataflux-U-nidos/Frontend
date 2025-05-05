// src/hooks/campaign/useGetAllCampaignsHook.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCampaigns } from "@/services/campaignService";

export const useGetAllCampaigns = () => {
    return useQuery({
        queryKey: ["campaigns"],
        queryFn: getAllCampaigns,
    });
};