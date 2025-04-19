import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function TutorRoutes() {
    console.log("Aqui estoy en tutor routes")
    const { userType } = useAuthContext()
    if (userType === "TUTOR") {
        console.log("Estoy dentro del if")
        return <Outlet />
    }
    return <Navigate to="/auth" />
  
}