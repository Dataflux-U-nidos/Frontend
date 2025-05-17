// src/services/jobOpportunityService.ts
import { jobOpportunityApi } from "../lib/api/jobOpportunityApi";
import { JobOpportunity, JobOpportunityFilters } from "../types/jobOpportunityType";

// Obtener todas las salidas laborales
export const getAllJobOpportunities = async (): Promise<JobOpportunity[]> => {
  const { data } = await jobOpportunityApi.get<JobOpportunity[]>("/opportunity");
  console.log('📡 API - Todas las jobs:', data.length);
  return data;
};

// Obtener una salida laboral por su ID
export const getJobOpportunityById = async (id: string): Promise<JobOpportunity> => {
  const { data } = await jobOpportunityApi.get<JobOpportunity>(`/opportunity/${id}`);
  return data;
};

// Obtener salidas laborales relacionadas con una carrera específica
export const getJobOpportunitiesByMajor = async (majorId: string): Promise<JobOpportunity[]> => {
  console.log('📡 API - Buscando jobs para carrera:', majorId);
  const { data } = await jobOpportunityApi.get<JobOpportunity[]>(`/opportunity/major/${majorId}`);
  console.log('📡 API - Jobs encontradas para carrera:', data.length);
  return data;
};

// Función para filtrar salidas laborales en el cliente
export const filterJobOpportunities = (
  jobOpportunities: JobOpportunity[],
  filters: JobOpportunityFilters
): JobOpportunity[] => {
  return jobOpportunities.filter(job => {
    // Filtro por nombre
    if (filters.name && !job.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    
    // Filtro por salario mínimo
    if (filters.salaryMin !== undefined && job.salary < filters.salaryMin) {
      return false;
    }
    
    // Filtro por salario máximo
    if (filters.salaryMax !== undefined && job.salary > filters.salaryMax) {
      return false;
    }
    
    return true;
  });
};