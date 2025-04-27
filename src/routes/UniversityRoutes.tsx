import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function UniversityRoutes() {
  const { userType } = useAuthContext();
  if (userType === "UNIVERSITY") {
    return <Outlet />;
  }
  return <Navigate to="/auth" />;
}
