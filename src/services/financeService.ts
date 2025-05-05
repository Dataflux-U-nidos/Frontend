import { ApiIncome, financeIncomesType } from "@/types/financeIncomesType";
import { userApi } from "../lib/api";
import { campaingsCosts } from "@/types/campaingsCostsType";


export const getCampaingsCosts = async (): Promise<campaingsCosts> => {
  try {
    const { data } = await userApi.get<campaingsCosts>("/campaign/total");
    return data;
  } catch (error) {
    console.error("Error al obtener costos de campañas:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el hook
  }
};

// Fetch income data for a single plan type
export const getIncomes = async (planType: string): Promise<ApiIncome> => {
  try {
    const { data } = await userApi.get<ApiIncome>(`/subscription-plan/revenue/${planType}`);
    return data;
  } catch (error) {
    console.error(`Error al obtener costos parciales para el plan ${planType}:`, error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el hook
  }
};

// Fetch income data for all plan types
export const getAllIncomes = async (planTypes: string[]): Promise<financeIncomesType> => {
  try {
    const incomePromises = planTypes.map((planType) => getIncomes(planType));
    const incomes = await Promise.all(incomePromises);
    console.log("Data de ingresos para todos los planes:", incomes);
    return incomes;
  } catch (error) {
    console.error('Error al obtener costos parciales para todos los planes:', error);
    throw error;
  }
};

export const getTotalIncome = async (): Promise<number> => {
  try {
    const { data } = await userApi.get<number>("/campaign/total"); // CAMBIAR RUTA
    return data;
  } catch (error) {
    console.error("Error al obtener costo total:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el hook
  }
};