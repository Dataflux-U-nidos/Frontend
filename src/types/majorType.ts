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
    jobId: string;
    focus: string;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type CreateMajorInput = Omit<Major, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateMajorInput = Partial<Omit<Major, '_id' | 'id' | 'createdAt' | 'updatedAt'>>;
  
  export interface MajorFilters {
    name?: string;
    institutionId?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    priceMin?: number;
    priceMax?: number;
    focus?: string;
  }