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
  }
  
  export type CreateMajorInput = Omit<Major, '_id' | 'id'>;
  export type UpdateMajorInput = Partial<Omit<Major, '_id' | 'id'>>;
  
  export interface MajorFilters {
    name?: string;
    institutionId?: string;
    difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
    priceMin?: number;
    priceMax?: number;
    focus?: string;
  }