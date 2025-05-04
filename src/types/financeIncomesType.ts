// Tipo para un ítem individual de ingreso
export interface IncomeItem {
    university: string;
    suscription: string;
    cost: number;
  }
  
  // Tipo para la respuesta completa de la API
  export interface financeIncomesType {
    data: IncomeItem[];
    scholarTotal: number;
    universityTotal: number;
    total: number;
  }