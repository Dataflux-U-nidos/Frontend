// src/services/subscriptionService.ts
import { userApi } from "@/lib/api";
import { Subscription, UpdateSubscriptionInput } from "@/types/SubscriptionType";

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  const { data } = await userApi.get<Subscription[]>("/subscription-plan");
  return data;
};

export const getSubscriptionById = async ( id: string): Promise<Subscription> => {
  const { data } = await userApi.get<Subscription>(`/subscription-plan/${id}`);
  return data;
};

export const updateSubscription = async ( id: string, updates: UpdateSubscriptionInput): Promise<Subscription> => {
  const { data } = await userApi.patch<Subscription>(`/subscription-plan/${id}`,updates);
  return data;
};
