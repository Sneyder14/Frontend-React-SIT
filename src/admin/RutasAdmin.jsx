import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const { isAdmin } = useAuth();
    return isAdmin ? children : <Navigate to="/unauthorized" />;
}
