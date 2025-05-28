import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export default function InfoManagerRoutes() {
    const { userType } = useAuthContext()

    if (userType === "INFOMANAGER" || userType === "UNIVERSITY") {
        return <Outlet />
    }

    return <Navigate to="/auth" />
}
