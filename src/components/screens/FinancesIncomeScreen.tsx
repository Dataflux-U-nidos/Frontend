import { useGetIncomes } from '@/hooks/finances/useGetIncomesHook';
import PartialIncomesTemplate from '../templates/FinancesIncomeTemplate';
import LoadingTemplate from '../templates/LoadingTemplate';

// Define the API response structure
interface ApiIncome {
  planType: string;
  costPerUnit: number;
  count: number;
  revenue: number;
  universities: { id: string; name: string }[];
}

// Fallback data mimicking API structure
const fallbackIncomeData: ApiIncome[] = [
  {
    planType: 'BASIC',
    costPerUnit: 9.99,
    count: 2,
    revenue: 19.98,
    universities: [
      { id: '681790325746ff7c53ade162', name: 'Uni' },
      { id: '681793e62b0d5afac966d2f9', name: 'Uni Basic' },
    ],
  },
  {
    planType: 'PREMIUM',
    costPerUnit: 19.99,
    count: 3,
    revenue: 59.97,
    universities: [
      { id: '681790325746ff7c53ade163', name: 'Uni Premium' },
      { id: '681793e62b0d5afac966d2fa', name: 'Uni Elite' },
      { id: '681793e62b0d5afac966d2fb', name: 'Uni Pro' },
    ],
  },
];

const PLAN_TYPES = ['BASIC', 'PREMIUM', 'STANDARD'];

export default function FinancesMainScreen() {
  const { incomes, loading, error } = useGetIncomes(PLAN_TYPES);

  // Transform data into tables format
  const transformToTables = (incomeData: ApiIncome[]) => {
    return incomeData.map((plan) => ({
      title: `Ingresos Plan ${plan.planType}`,
      caption: `Suscripciones activas para el plan ${plan.planType}`,
      data: plan.universities.map((uni) => ({
        university: uni.name,
        suscription: plan.planType,
        cost: plan.revenue,
      })),
      displayColumns: ['university', 'suscription', 'cost'],
      columnHeaders: {
        university: 'Universidad',
        suscription: 'Suscripción',
        cost: 'Ingresos Totales (COP)',
      },
    }));
  };

  // Use fallback data if there's an error or no data
  const dataToUse = error || !incomes || incomes.length === 0 ? fallbackIncomeData : incomes;
  const tables = transformToTables(dataToUse);
  const totalCost = dataToUse.reduce((acc, plan) => acc + plan.revenue, 0);

  // Show loading template while data is being fetched
  if (loading) {
    return (
      <div>
        <LoadingTemplate />
      </div>
    );
  }

  return (
    <div>
      <PartialIncomesTemplate
        tables={tables}
        mainTitle="Ingresos por Suscripción"
        totalCost={totalCost}
      />
    </div>
  );
}