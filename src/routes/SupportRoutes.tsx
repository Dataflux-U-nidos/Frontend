import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function SupportRoutes() {
  const { userType } = useAuthContext();

  if (userType === "SUPPORT") {
    return <Outlet />;
  }

  return <Navigate to="/auth" />;
}
