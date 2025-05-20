import DashboardTemplate from "../templates/Dashboard/DashboardTemplate";
import {
  useGetUniversidades, 
  useGetCarreras, 
  useGetUniversidadesBuscadas, 
  useGetDashboardUsers 
} from "@/hooks/dashboard/useViewerHooks";

export default function ViewerDashboardScreen() {
  const { 
    data: universidadesData, 
    isLoading: loadingUniversidades, 
    error: errorUniversidades 
  } = useGetUniversidades();
  
  const { 
    data: carrerasData, 
    isLoading: loadingCarreras, 
    error: errorCarreras 
  } = useGetCarreras();
  
  const { 
    data: universidadesBuscadasData, 
    isLoading: loadingUniversidadesBuscadas, 
    error: errorUniversidadesBuscadas 
  } = useGetUniversidadesBuscadas();
  
  const { 
    data: usersData, 
    isLoading: loadingUsers, 
    error: errorUsers 
  } = useGetDashboardUsers();

  const isLoading = loadingUniversidades || loadingCarreras || loadingUniversidadesBuscadas || loadingUsers;
  
  const hasError = errorUniversidades || errorCarreras || errorUniversidadesBuscadas || errorUsers;
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando información del dashboard...</div>;
  }
  
  if (hasError) {
    return <div className="flex justify-center items-center h-screen text-red-600">
      Error al cargar la información. Por favor intente de nuevo más tarde.
    </div>;
  }

  return (
    <div>
      <DashboardTemplate
        barChartTendenciasUniversidades={universidadesData || []}
        lineChartData={universidadesBuscadasData || []}
        barChartTendenciasCarreras={carrerasData || []}
        usersData={usersData || []}
      />
    </div>
  );
}