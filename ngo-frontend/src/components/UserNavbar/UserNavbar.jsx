import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./UserNavbar.css";

function UserNavbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar">

            <h2>VolunteerHub</h2>

            <div>

                <Link to="/dashboard">Dashboard</Link>
                <Link to="/events">Events</Link>
                <Link to="/applications">Applications</Link>

                <button onClick={logout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

        </nav>
    );
}

export default UserNavbar;