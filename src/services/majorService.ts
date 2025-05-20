// src/services/majorService.ts
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

// Función para filtrar majors en el cliente (útil mientras se implementa la API)
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

    return true;
  });
};

// Métodos que se implementarán en el futuro cuando se requiera el CRUD completo

// Crear una nueva carrera
export const createMajor = async (newMajor: CreateMajorInput): Promise<Major> => {
  const response = await majorApi.post<Major>("/major", newMajor);
  return response.data;
};

// Actualizar una carrera existente
export const updateMajor = async (id: string, updates: UpdateMajorInput): Promise<Major> => {
  const { data } = await majorApi.patch<Major>(`/major/${id}`, updates);
  return data;
};

// Eliminar una carrera
export const deleteMajor = async (id: string): Promise<void> => {
  await majorApi.delete(`/major/${id}`);
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