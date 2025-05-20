// src/types/recommendationType.ts

export interface University {
  id: string;
  name: string;
  email: string;
  zone: string;
  locality: string;
  address: string;
  description: string;
  link: string;
  price_range: 'LOW' | 'MEDIUM' | 'HIGH';
  aceptation_difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  events: Array<{
    name: string;
    description: string;
    date: string;
    location: string;
  }>;
}

export interface RecommendationWithUniversity {
  // Campos del Major (carrera)
  _id: string;
  name: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  price: number;
  focus: string;
  institutionId: string;
  pensumLink: string;
  jobOpportunityIds?: string[];
  preferences: string[];
  createdAt: string;
  updatedAt: string;
  
  // Universidad asociada con información completa
  university: University;
  
  // Campos adicionales para la UI
  color?: string; // Para la UI de TopCareersCard
}