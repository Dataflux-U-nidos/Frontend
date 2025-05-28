// src/types/majorType.ts
export interface Major {
  _id?: string;
  id?: string;
  name: string;
  institutionId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  price: number;
  description: string;
  pensumLink: string;
  jobOpportunityIds?: string[];
  focus: string;
  preferences?: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateMajorInput = Omit<Major, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>;
export type UpdateMajorInput = Partial<Omit<Major, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>;

export interface MajorFilters {
  name?: string;
  institutionId?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  priceMin?: number;
  priceMax?: number;
  focus?: string;
  preferences?: string[];
}