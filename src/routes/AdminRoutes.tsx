import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function AdminRoutes() {
    const { userType } = useAuthContext()

    if (userType === "ADMIN") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
