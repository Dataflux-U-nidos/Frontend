// /src/types/campaingType.ts
export interface Campaign {
  // Permitir tanto _id como id para manejar diferentes formatos de datos
  _id?: string;
  id?: string;
  name: string;
  description: string;
  date: string;
  cost: number;
  type: "scholar" | "university";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateCampaignInput = Omit<Campaign, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCampaignInput = Partial<Omit<Campaign, '_id' | 'id' | 'createdAt' | 'updatedAt'>>;