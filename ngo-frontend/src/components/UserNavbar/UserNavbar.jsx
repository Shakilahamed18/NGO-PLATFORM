import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "./UserNavbar.css";

function UserNavbar() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <h2>VolunteerHub</h2>

            {/* Desktop / Mobile Menu */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link to="/dashboard" onClick={closeMenu}>
                    Dashboard
                </Link>

                <Link to="/events" onClick={closeMenu}>
                    Events
                </Link>

                <Link to="/applications" onClick={closeMenu}>
                    Applications
                </Link>

                <button onClick={logout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

            {/* Mobile Hamburger */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

        </nav>
    );
}

export default UserNavbar;