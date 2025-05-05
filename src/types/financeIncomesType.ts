// Define the structure of a single income record
export interface ApiIncome {
  planType: string;
  costPerUnit: number;
  count: number;
  revenue: number;
  universities: {
    id: string;
    name: string;
  }[];
}

export interface totalRevenue {
  totalRevenue: number;
}
// Define financeIncomesType as an array of ApiIncome
export type financeIncomesType = ApiIncome[];