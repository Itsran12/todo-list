import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContex"

// Tipe props untuk PrivateRoute
interface PrivateRouteProps {
    children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn } = useAuth()

    console.log("PrivateRoute - isLoggedIn:", isLoggedIn) // Debugging

    return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />
}
