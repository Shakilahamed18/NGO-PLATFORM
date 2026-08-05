import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./AdminNavbar.css";

function AdminNavbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();
        navigate("/");

    };

    return (

        <nav className="admin-navbar">

            <h2>VolunteerHub Admin</h2>

            <div>

                <Link to="/admin">Dashboard</Link>

                <Link to="/admin/events">Manage Events</Link>

                <Link to="/admin/applications">Applications</Link>

                <Link to="/admin/attendance">Attendance</Link>

                <Link to="/admin/users">Users</Link>

                <Link to="/admin/reports">Reports</Link>

                <button onClick={logout}>

                    <FaSignOutAlt />

                    <span>Logout</span>

                </button>

            </div>

        </nav>

    );

}

export default AdminNavbar;