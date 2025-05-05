import { DataTable } from '../organisms/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/ui/card";
import { DollarSign } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../atoms/ui/tabs";

interface IncomeData {
  university: string;
  suscription: string;
  cost: number;
}

interface TableData {
  data: IncomeData[];
  title?: string;
  caption?: string;
  displayColumns: string[];
  columnHeaders: Record<string, string>;
}

interface PartialIncomesTemplateProps {
  tables: TableData[];
  mainTitle?: string;
  totalCost: number;
}

export default function PartialIncomesTemplate({
  tables,
  mainTitle,
  totalCost,
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
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {mainTitle && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {mainTitle}
          </h1>
        )}

        {/* Tabs for Multiple Tables */}
        <Tabs defaultValue="table-0" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2">
            {tables.map((table, index) => (
              <TabsTrigger key={index} value={`table-${index}`}>
                {table.title || `Tabla ${index + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>

          {tables.map((table, index) => (
            <TabsContent key={index} value={`table-${index}`} className="space-y-6">
              {table.title && (
                <h2 className="text-lg font-semibold text-gray-800">
                  {table.title}
                </h2>
              )}
              <DataTable<IncomeData>
                data={table.data}
                caption={table.caption}
                rowsPerPage={5}
                displayColumns={table.displayColumns}
                columnHeaders={table.columnHeaders}
              />
            </TabsContent>
          ))}
        </Tabs>

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