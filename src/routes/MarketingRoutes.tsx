import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function MarketingRoutes() {
  const { userType } = useAuthContext();
  if (userType === "MARKETING" || userType === "ADMIN") {
    return <Outlet />;
  }
  return <Navigate to="/auth" />;
}
