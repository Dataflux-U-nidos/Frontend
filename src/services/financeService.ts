import { financeIncomesType } from "@/types/financeIncomesType";
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

export const getIncomes = async (): Promise<financeIncomesType> => {
  try {
    const { data } = await userApi.get<financeIncomesType>("/campaign/total"); // CAMBIAR RUTA
    return data;
  } catch (error) {
    console.error("Error al obtener costos de campañas:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el hook
  }
};