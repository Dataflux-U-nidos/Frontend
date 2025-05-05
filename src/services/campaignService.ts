// src/services/campaignService.ts
import { campaignApi } from "../lib/api/campaignApi";
import { Campaign, CreateCampaignInput, UpdateCampaignInput } from "../types/campaingType";

export const createCampaign = async (newCampaign: CreateCampaignInput): Promise<Campaign> => {
    const response = await campaignApi.post<Campaign>("/campaign", newCampaign);
    console.log("Response Headers:", response.headers);
    return response.data;
};

export const getAllCampaigns = async (): Promise<Campaign[]> => {
    const { data } = await campaignApi.get<Campaign[]>("/campaign");
    return data;
};

export const getCampaignsByUser = async (userId: string): Promise<Campaign[]> => {
    const { data } = await campaignApi.get<Campaign[]>(`/campaign/user/${userId}`);
    return data;
};

export const getCampaignById = async (id: string): Promise<Campaign> => {
    const { data } = await campaignApi.get<Campaign>(`/campaign/${id}`);
    return data;
};

export const updateCampaign = async (id: string, updates: UpdateCampaignInput): Promise<Campaign> => {
    const { data } = await campaignApi.patch<Campaign>(`/campaign/${id}`, updates);
    return data;
};

export const deleteCampaign = async (id: string): Promise<void> => {
    await campaignApi.delete(`/campaign/${id}`);
};

export const getTotalInvestment = async (): Promise<number> => {
    const { data } = await campaignApi.get<{ total: number }>("/campaign/total");
    return data.total;
};