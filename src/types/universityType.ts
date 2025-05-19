// src/types/universityType.ts
export interface University {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  address: string;
  userType: 'UNIVERSITY';
  zone?: string;
  locality?: string;
  subscriptionPlanId?: string;
  infomanagers?: string[];
  viewers?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UniversityFilters {
  name?: string;
  zone?: string;
  locality?: string;
  address?: string;
}

export type CreateUniversityInput = Omit<University, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'userType'>;
export type UpdateUniversityInput = Partial<Omit<University, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'userType'>>;