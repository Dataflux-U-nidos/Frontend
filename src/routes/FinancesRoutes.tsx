import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function FinancesRoutes() {
  const { userType } = useAuthContext();
  if (userType === "FINANCES" || userType === "ADMIN") {
    return <Outlet />;
  }
  return <Navigate to="/auth" />;
}
