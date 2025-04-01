import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function ViewerRoutes() {
    const { userType } = useAuthContext()

    if (userType === "VIEWER") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
