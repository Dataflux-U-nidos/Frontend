// src/services/universityService.ts
import { universityApi } from "../lib/api/universityApi";
import { University, UniversityFilters } from "../types/universityType";

// Obtener todas las universidades
export const getAllUniversities = async (): Promise<University[]> => {
  const { data } = await universityApi.get<University[]>("/user/universities");
  return data;
};

// Obtener una universidad por su ID
export const getUniversityById = async (id: string): Promise<University> => {
  const { data } = await universityApi.get<University>(`/user/universities/${id}`);
  return data;
};

// Función para filtrar universidades en el cliente
export const filterUniversities = (universities: University[], filters: UniversityFilters): University[] => {
  return universities.filter(university => {
    // Filtro por nombre
    if (filters.name && !university.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    
    // Filtro por zona
    if (filters.zone && !university.zone?.toLowerCase().includes(filters.zone.toLowerCase())) {
      return false;
    }
    
    // Filtro por localidad
    if (filters.locality && !university.locality?.toLowerCase().includes(filters.locality.toLowerCase())) {
      return false;
    }
    
    // Filtro por dirección
    if (filters.address && !university.address.toLowerCase().includes(filters.address.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};