import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function TutorRoutes() {
  const { userType } = useAuthContext();
  if (userType === "TUTOR") {
    return <Outlet />;
  }
  return <Navigate to="/auth" />;
}
