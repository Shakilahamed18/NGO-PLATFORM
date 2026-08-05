import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default AdminProtectedRoute;