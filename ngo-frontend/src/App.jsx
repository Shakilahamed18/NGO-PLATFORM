import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/User/Profile/Profile";
import Certificates from "./pages/User/Certificates/Certificates";

// Auth
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// User
import Dashboard from "./pages/User/Dashboard/Dashboard";
import Events from "./pages/User/Events/Events";
import Applications from "./pages/User/Applications/Applications";
import ScanAttendance from "./pages/User/Attendance/ScanAttendance";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminEvents from "./pages/Admin/Events/AdminEvents";
import AdminApplications from "./pages/Admin/Applications/Applications";
import Attendance from "./pages/Admin/Attendance/Attendance";
import Users from "./pages/Admin/Users/Users";
import Reports from "./pages/Admin/Reports/Reports";

// Protected Routes
import UserProtectedRoute from "./components/ProtectedRoute/UserProtectedRoute";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* User */}

        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <Dashboard />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <UserProtectedRoute>
              <Events />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <UserProtectedRoute>
              <Applications />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <UserProtectedRoute>
              <Certificates />
            </UserProtectedRoute>
          }
        />
        {/* Admin */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminProtectedRoute>
              <AdminEvents />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <AdminApplications />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <AdminProtectedRoute>
              <Attendance />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Users />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminProtectedRoute>
              <Reports />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/scan-attendance"
          element={
            <UserProtectedRoute>
              <ScanAttendance />
            </UserProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;