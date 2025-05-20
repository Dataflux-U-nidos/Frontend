// hooks/useViewerHooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/api";
import {
  getUniversidades,
  getCarreras,
  getUniversidadesBuscadas,
  getUsers,
  getUniversidadesWithFilters,
  getCarrerasWithFilters,
  getUniversidadesBuscadasByDateRange,
  getDashboardMetrics,
  UniversidadData,
  CarreraData,
  UniversidadBuscadaData,
  UserData
} from "@/services/viewerService";

// Define query keys for dashboard data
export const DASHBOARD_KEYS = {
  UNIVERSIDADES: 'universidades',
  CARRERAS: 'carreras',
  UNIVERSIDADES_BUSCADAS: 'universidades-buscadas',
  DASHBOARD_USERS: 'dashboard-users',
  DASHBOARD_METRICS: 'dashboard-metrics'
};

// Hook to get universities
export function useGetUniversidades() {
  return useQuery<UniversidadData[], Error>({
    queryKey: [DASHBOARD_KEYS.UNIVERSIDADES],
    queryFn: getUniversidades
  });
}

// Hook to get careers/majors
export function useGetCarreras() {
  return useQuery<CarreraData[], Error>({
    queryKey: [DASHBOARD_KEYS.CARRERAS],
    queryFn: getCarreras
  });
}

// Hook to get most searched universities
export function useGetUniversidadesBuscadas() {
  return useQuery<UniversidadBuscadaData[], Error>({
    queryKey: [DASHBOARD_KEYS.UNIVERSIDADES_BUSCADAS],
    queryFn: getUniversidadesBuscadas
  });
}

// Hook to get dashboard users
export function useGetDashboardUsers() {
  return useQuery<UserData[], Error>({
    queryKey: [DASHBOARD_KEYS.DASHBOARD_USERS],
    queryFn: getUsers
  });
}

// Hook to get universities with filters
export function useGetUniversidadesWithFilters(filters?: {
  name?: string;
}) {
  return useMutation<UniversidadData[], Error>({
    mutationFn: async () => {
      return await getUniversidadesWithFilters(filters);
    }
  });
}

// Hook to get careers/majors with filters
export function useGetCarrerasWithFilters(filters?: {
  name?: string;
}) {
  return useMutation<CarreraData[], Error>({
    mutationFn: async () => {
      return await getCarrerasWithFilters(filters);
    }
  });
}

// Hook to get most searched universities by date range
export function useGetUniversidadesBuscadasByDateRange() {
  const queryClient = useQueryClient();
  
  return useMutation<UniversidadBuscadaData[], Error, { startDate: string; endDate: string }>({
    mutationFn: async ({ startDate, endDate }) => {
      return await getUniversidadesBuscadasByDateRange(startDate, endDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.UNIVERSIDADES_BUSCADAS],
      });
    },
  });
}

// Hook to get dashboard metrics
export function useGetDashboardMetrics() {
  return useQuery({
    queryKey: [DASHBOARD_KEYS.DASHBOARD_METRICS],
    queryFn: getDashboardMetrics
  });
}

// Refresh hooks - to manually trigger refresh of data
export function useRefreshUniversidades() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error>({
    mutationFn: async () => {
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.UNIVERSIDADES],
      });
    },
  });
}

export function useRefreshCarreras() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error>({
    mutationFn: async () => {
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.CARRERAS],
      });
    },
  });
}

export function useRefreshDashboardData() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error>({
    mutationFn: async () => {
      return;
    },
    onSuccess: () => {
      // Invalidate all dashboard related queries
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.UNIVERSIDADES],
      });
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.CARRERAS],
      });
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.UNIVERSIDADES_BUSCADAS],
      });
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.DASHBOARD_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [DASHBOARD_KEYS.DASHBOARD_METRICS],
      });
    },
  });
}