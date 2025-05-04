import { DataTable } from '../organisms/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/ui/card";
import { DollarSign } from "lucide-react";

interface IncomeData {
  university: string;
  suscription: string;
  cost: number;
}

interface PartialIncomesTemplateProps {
  data: IncomeData[];
  title?: string;
  caption?: string;
  totalCost: number;
  displayColumns: string[];
  columnHeaders: Record<string, string>;
}

export default function PartialIncomesTemplate({
  data,
  title,
  caption,
  totalCost,
  displayColumns,
  columnHeaders,
}: PartialIncomesTemplateProps) {
  // Format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h1>

        {/* Data Table */}
        <DataTable<IncomeData>
          data={data}
          caption={caption}
          rowsPerPage={5}
          displayColumns={displayColumns}
          columnHeaders={columnHeaders}
        />

        <div className="mb-6"></div>
        {/* Total Income Card */}
        <div className="mb-6 w-full">
          <Card className="bg-gradient-to-r from-cyan-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium text-green-800">Total Ingresos</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {formatCurrency(totalCost)}
              </div>
              <p className="text-sm text-green-600 mt-1">
                Total de ingresos por suscripciones
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}