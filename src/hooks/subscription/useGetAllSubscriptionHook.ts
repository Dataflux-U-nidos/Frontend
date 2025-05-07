// src/hooks/subscription/useGetAllSubscriptions.ts
import { useQuery } from "@tanstack/react-query";
import { getAllSubscriptions } from "@/services/subscriptionService";

export const useGetAllSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllSubscriptions,
  });
};
