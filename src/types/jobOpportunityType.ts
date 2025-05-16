// src/types/jobOpportunityType.ts
export interface JobOpportunity {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  jobId?: string;
  salary: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateJobOpportunityInput = Omit<JobOpportunity, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateJobOpportunityInput = Partial<Omit<JobOpportunity, '_id' | 'id' | 'createdAt' | 'updatedAt'>>;

export interface JobOpportunityFilters {
  name?: string;
  salaryMin?: number;
  salaryMax?: number;
}