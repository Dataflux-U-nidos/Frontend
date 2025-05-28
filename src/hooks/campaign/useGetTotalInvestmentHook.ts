// src/hooks/campaign/useGetTotalInvestmentHook.ts
import { useQuery } from "@tanstack/react-query";
import { getTotalInvestment } from "@/services/campaignService";

export const useGetTotalInvestment = () => {
    return useQuery({
        queryKey: ["campaigns", "total-investment"],
        queryFn: getTotalInvestment,
    });
};