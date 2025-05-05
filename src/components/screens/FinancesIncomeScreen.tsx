import { useGetIncomes } from "@/hooks/finances/useGetIncomesHook";
import PartialIncomesTemplate from "../templates/FinancesIncomeTemplate";
import { formatISO, subMonths, startOfDay } from "date-fns";

import LoadingTemplate from "../templates/LoadingTemplate";
import { useEffect, useMemo, useState } from "react";
import { ApiIncome } from "@/types/financeIncomesType";
import { useGetTotalIncome } from "@/hooks/finances/useGetTotalIncomeHook";

// Define the API response structure
// interface ApiIncome {
//   planType: string;
//   costPerUnit: number;
//   count: number;
//   revenue: number;
//   universities: { id: string; name: string }[];
// }

// Fallback data mimicking API structure
const fallbackIncomeData: ApiIncome[] = [
  {
    planType: "BASIC",
    costPerUnit: 9.99,
    count: 2,
    revenue: 19.98,
    universities: [
      { id: "681790325746ff7c53ade162", name: "Uni" },
      { id: "681793e62b0d5afac966d2f9", name: "Uni Basic" },
    ],
  },
  {
    planType: "PREMIUM",
    costPerUnit: 19.99,
    count: 3,
    revenue: 59.97,
    universities: [
      { id: "681790325746ff7c53ade163", name: "Uni Premium" },
      { id: "681793e62b0d5afac966d2fa", name: "Uni Elite" },
      { id: "681793e62b0d5afac966d2fb", name: "Uni Pro" },
    ],
  },
];

const PLAN_TYPES = ["BASIC", "STANDARD", "PREMIUM"];

export default function FinancesMainScreen() {
  const [range, setRange] = useState({
    from: startOfDay(subMonths(new Date(), 1)),
    to: startOfDay(new Date()),
  });

  const formattedStart = formatISO(range.from, { representation: "date" });
  const formattedEnd = formatISO(range.to, { representation: "date" });
  
  const { mutate, data: totalCost } = useGetTotalIncome(
    formattedStart,
    formattedEnd
  );

  // Trigger mutation when dates change
  useEffect(() => {
    if (formattedStart && formattedEnd) {
      mutate();
    }
  }, [formattedStart, formattedEnd, mutate]);

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
      displayColumns: ["university", "suscription", "cost"],
      columnHeaders: {
        university: "Universidad",
        suscription: "Suscripción",
        cost: "Ingresos Totales (COP)",
      },
    }));
  };

  // Use fallback data if there's an error or no data
  const dataToUse =error || !incomes || incomes.length === 0 ? fallbackIncomeData : incomes;
  const tables = useMemo(() => transformToTables(dataToUse), [dataToUse]);

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
        totalCost={totalCost ?? 0}
        range={range}
        onRangeChange={setRange}
      />
    </div>
  );
}
