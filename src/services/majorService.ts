// src/services/majorService.ts (Actualizado)
import { majorApi } from "../lib/api/majorApi";
import { Major, CreateMajorInput, UpdateMajorInput, MajorFilters } from "../types/majorType";

// Obtener todas las carreras
export const getAllMajors = async (): Promise<Major[]> => {
  const { data } = await majorApi.get<Major[]>("/major");
  return data;
};

// Obtener una carrera por su ID
export const getMajorById = async (id: string): Promise<Major> => {
  const { data } = await majorApi.get<Major>(`/major/${id}`);
  return data;
};

// Obtener carreras por institución
export const getMajorsByInstitution = async (institutionId: string): Promise<Major[]> => {
  const { data } = await majorApi.get<Major[]>(`/major/university/${institutionId}`);
  return data;
};

// Función para filtrar majors en el cliente
export const filterMajors = (majors: Major[], filters: MajorFilters): Major[] => {
  return majors.filter(major => {
    // Filtro por nombre
    if (filters.name && !major.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Filtro por institución
    if (filters.institutionId && major.institutionId !== filters.institutionId) {
      return false;
    }

    // Filtro por dificultad
    if (filters.difficulty && major.difficulty !== filters.difficulty) {
      return false;
    }

    // Filtro por precio mínimo
    if (filters.priceMin !== undefined && major.price < filters.priceMin) {
      return false;
    }

    // Filtro por precio máximo
    if (filters.priceMax !== undefined && major.price > filters.priceMax) {
      return false;
    }

    // Filtro por enfoque
    if (filters.focus && !major.focus.toLowerCase().includes(filters.focus.toLowerCase())) {
      return false;
    }
    
    // Filtro por preferencias
    if (filters.preferences && filters.preferences.length > 0) {
      const majorPrefs = major.preferences || [];
      const hasMatchingPreference = filters.preferences.some(filterPref => 
        majorPrefs.includes(filterPref)
      );
      if (!hasMatchingPreference) {
        return false;
      }
    }
    
    return true;
  });
};

// Crear una nueva carrera
export const createMajor = async (newMajor: CreateMajorInput): Promise<Major> => {
  const response = await majorApi.post<Major>("/major", newMajor);
  return response.data;
};

// Actualizar una carrera existente
export const updateMajor = async (id: string, updates: UpdateMajorInput): Promise<Major> => {
  console.log('Service: Updating major with ID:', id);
  console.log('Service: Updates to send:', updates);
  
  try {
    const { data } = await majorApi.patch<Major>(`/major/${id}`, updates);
    console.log('Service: Update response:', data);
    return data;
  } catch (error) {
    console.error('Service: Error updating major:', error);
    throw error;
  }
};

// Eliminar una carrera
export const deleteMajor = async (id: string): Promise<void> => {
  console.log('Service: Deleting major with ID:', id);
  
  try {
    await majorApi.delete(`/major/${id}`);
    console.log('Service: Major deleted successfully');
  } catch (error) {
    console.error('Service: Error deleting major:', error);
    throw error;
  }
};

export const getMajorComments = async (majorId: string): Promise<Comment[]> => {
  const { data } = await majorApi.get<Comment[]>(`/comment/major/${majorId}`)
  return data
}

export const createComment = async (payload: {
  majorId: string
  text: string
}): Promise<Comment> => {
  const { data } = await majorApi.post<Comment>("/comment", payload)
  return data
}