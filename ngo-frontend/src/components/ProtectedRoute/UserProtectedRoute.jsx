import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {

    const role = localStorage.getItem("role");

    if (role !== "USER") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default UserProtectedRoute;