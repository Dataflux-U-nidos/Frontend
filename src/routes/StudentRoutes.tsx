import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// si tienes un componente de carga, úsalo aquí
import { Spinner } from "@/components/atoms/Spinner";

export default function StudentRoutes() {
  const { user, userType, isAuthLoading } = useAuthContext();
  const { pathname } = useLocation();

  // 1. Mientras carga la sesión, mostramos spinner
  if (isAuthLoading) {
    return <Spinner />;
  }

  // 2. Sólo STUDENT puede entrar aquí
  if (userType !== "STUDENT") {
    return <Navigate to="/auth" replace />;
  }

  // 3. Si no ha completado el test y NO está ya en /student-grades, forzamos la ruta
  if (!user?.testCompleted && pathname !== "/student-grades") {
    return <Navigate to="/student-grades" replace />;
  }

  // 4. Si todo OK, renderizamos las rutas hijas
  return <Outlet />;
}
