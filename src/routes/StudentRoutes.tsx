import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function StudentRoutes() {
    const { userType } = useAuthContext()

    if (userType === "STUDENT") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
