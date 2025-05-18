import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function JobOpportunityRoutes() {
  const { userType } = useAuthContext();

  // Según el backend, solo STUDENT y ADMIN pueden acceder a las rutas de JobOpportunity
  if (userType === "STUDENT" || userType === "ADMIN") {
    return <Outlet />;
  }

  return <Navigate to="/auth" />;
}