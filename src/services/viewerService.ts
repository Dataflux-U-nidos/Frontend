// src/services/viewerService.ts
import { userApi } from "../lib/api";
import { User } from "../types";

// Define types for the dashboard data
export interface UniversidadData {
  name: string;
  total: number;
}

export interface CarreraData {
  name: string;
  total: number;
}

export interface UniversidadBuscadaData {
  name: string;
  Javeriana: number;
  Andes: number;
  Rosario: number;
  Externado: number;
  UDCA: number;
  ECI: number;
  [key: string]: number | string; // Para permitir acceso dinámico a las propiedades
}

export interface UserData {
  Nombre: string;
  Apellidos: string;
  TipoDocumento: string;
  NoDocumento: string;
  Edad: number;
  NombreAcudiente: string;
  CelularContacto: string;
  EmailContacto: string;
}

// Function to get universidades
export const getUniversidades = async (): Promise<UniversidadData[]> => {
  const { data } = await userApi.get<UniversidadData[]>("/dashboard/universidades");
  return data;
};

// Function to get carreras
export const getCarreras = async (): Promise<CarreraData[]> => {
  const { data } = await userApi.get<CarreraData[]>("/dashboard/carreras");
  return data;
};

// Function to get universidades más buscadas
export const getUniversidadesBuscadas = async (): Promise<UniversidadBuscadaData[]> => {
  const { data } = await userApi.get<UniversidadBuscadaData[]>("/dashboard/universidades-buscadas");
  return data;
};

// Function to get users
export const getUsers = async (): Promise<UserData[]> => {
  const { data } = await userApi.get<UserData[]>("/dashboard/users");
  return data;
};

// Function to get universidades with filters
export const getUniversidadesWithFilters = async (
  filters?: {
    name?: string;
    // Add other filters as needed
  }
): Promise<UniversidadData[]> => {
  const { data } = await userApi.get<UniversidadData[]>("/dashboard/universidades", {
    params: filters
  });
  return data;
};

// Function to get carreras with filters
export const getCarrerasWithFilters = async (
  filters?: {
    name?: string;
    // Add other filters as needed
  }
): Promise<CarreraData[]> => {
  const { data } = await userApi.get<CarreraData[]>("/dashboard/carreras", {
    params: filters
  });
  return data;
};

// Function to get universidades más buscadas with date range
export const getUniversidadesBuscadasByDateRange = async (
  startDate: string,
  endDate: string
): Promise<UniversidadBuscadaData[]> => {
  const { data } = await userApi.get<UniversidadBuscadaData[]>("/dashboard/universidades-buscadas", {
    params: {
      startDate,
      endDate
    }
  });
  return data;
};

// Function to get dashboard metrics
export const getDashboardMetrics = async (): Promise<{
  totalUniversidades: number;
  totalCarreras: number;
  totalUsers: number;
  // Add other metrics as needed
}> => {
  const { data } = await userApi.get("/dashboard/metrics");
  return data;
};