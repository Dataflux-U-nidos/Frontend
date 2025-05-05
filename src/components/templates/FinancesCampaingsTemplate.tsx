import { Card, CardContent, CardHeader, CardTitle } from "../atoms/ui/card";
import { Book, DollarSign, University } from "lucide-react";

type CampaignCostsTemplateProps = {
  schoolCampaignCost: number;
  universityCampaignCost: number;
  totalCampaignCosts: number;
};

export default function FinancesCapaingsTemplate({
  schoolCampaignCost,
  universityCampaignCost,
  totalCampaignCosts,
}: CampaignCostsTemplateProps) {
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
    <div className="px-4 md:px-6 py-6 w-full max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Costos de Campañas</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {/* School Campaign Card */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Campaña de Colegios</CardTitle>
            <Book className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(schoolCampaignCost)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Total invertido en campaña de colegios
            </p>
          </CardContent>
        </Card>

        {/* University Campaign Card */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Campaña de Universidades</CardTitle>
            <University className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(universityCampaignCost)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Total invertido en campaña de universidades
            </p>
          </CardContent>
        </Card>

        {/* Total Campaigns Card */}
        <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Total Campañas</CardTitle>
            <DollarSign className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {formatCurrency(totalCampaignCosts)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Total invertido en todas las campañas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}