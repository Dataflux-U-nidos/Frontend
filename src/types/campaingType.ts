// /src/types/campaignType.ts
export interface Campaign {
    _id: string;
    name: string;
    description: string;
    date: string;
    cost: number;
    type: "scholar" | "university";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export type CreateCampaignInput = Omit<Campaign, '_id' | 'createdAt' | 'updatedAt'>;
  export type UpdateCampaignInput = Partial<Omit<Campaign, '_id' | 'createdAt' | 'updatedAt'>>;