import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import api from "../../../api/api";
import "./Dashboard.css";

import {
    FaCalendarAlt,
    FaClipboardList,
    FaAward,
    FaUser,
    FaQrcode
} from "react-icons/fa";

function Dashboard() {

    const navigate = useNavigate();

    const [name, setName] = useState("Volunteer");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await api.get("/profile");

            setName(response.data.name);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout>

            <div className="dashboard">

                <div className="welcome">

                    <h1>
                        Welcome Back, {name} 👋
                    </h1>

                    <p>
                        Ready to make a difference today?
                    </p>

                </div>

                <div className="cards">

                    <div
                        className="card"
                        onClick={() => navigate("/events")}
                    >

                        <div className="icon">
                            <FaCalendarAlt />
                        </div>

                        <h3>Browse Events</h3>

                        <p>
                            Explore volunteering opportunities near you.
                        </p>

                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/applications")}
                    >

                        <div className="icon">
                            <FaClipboardList />
                        </div>

                        <h3>My Applications</h3>

                        <p>
                            Track all your event applications.
                        </p>

                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/scan-attendance")}
                    >

                        <div className="icon">
                            <FaQrcode />
                        </div>

                        <h3>Scan Attendance</h3>

                        <p>
                            Scan the QR code to mark your attendance.
                        </p>

                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/certificates")}
                    >

                        <div className="icon">
                            <FaAward />
                        </div>

                        <h3>Certificates</h3>

                        <p>
                            Download certificates after completing events.
                        </p>

                    </div>

                    <div
                        className="card"
                        onClick={() => navigate("/profile")}
                    >

                        <div className="icon">
                            <FaUser />
                        </div>

                        <h3>My Profile</h3>

                        <p>
                            View your volunteer profile and achievements.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;