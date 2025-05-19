import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atoms/ui/tabs";
import { BarChartComponent } from "../../molecules/graphics/Bar-Chart";
import { LineChartComponent } from "../../molecules/graphics/Line-Chart";
import { DynamicTable } from "../../organisms/DynamicTable";

type DashboardProps = {
  barChartTendenciasUniversidades: {
    name: string;
    total: number;
  }[];
  lineChartData: {
    name: string;
    [key: string]: string | number;
  }[];
  barChartTendenciasCarreras: {
    name: string;
    total: number;
  }[];
  usersData: {
    Nombre: string;
    Apellidos: string;
    TipoDocumento: string;
    NoDocumento: string;
    Edad: number;
    NombreAcudiente?: string;
    CelularContacto: string;
    EmailContacto: string;
  }[];
};

export default function Dashboard({
  barChartTendenciasUniversidades,
  lineChartData,
  barChartTendenciasCarreras,
  usersData,
}: DashboardProps) {
  return (
    <div className="px-4 md:px-6 py-6 w-full max-w-screen-xl mx-auto">
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="students">
            Posibles nuevos Estudiantes
          </TabsTrigger>
          <TabsTrigger value="universities">
            Popularidad de Universidad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Universidades más buscadas en el mes
            </h2>
            <BarChartComponent data={barChartTendenciasUniversidades} />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Carreras más buscadas en el mes
            </h2>
            <BarChartComponent data={barChartTendenciasCarreras} />
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Información de estudiantes potenciales
          </h2>
          <DynamicTable data={usersData} />
        </TabsContent>

        <TabsContent value="universities" className="space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Popularidad por universidad en el tiempo
          </h2>
          <LineChartComponent data={lineChartData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
