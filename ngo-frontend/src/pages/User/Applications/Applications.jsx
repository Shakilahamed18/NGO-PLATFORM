import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import api from "../../../api/api";
import "./Applications.css";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import { FaClipboardList } from "react-icons/fa";

function Applications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await api.get("/applications/my");

            setApplications(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <DashboardLayout>

            <div className="applications-container">

                <h1>My Applications</h1>

                {applications.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            <FaClipboardList />
                        </div>

                        <h2>No Applications Yet</h2>

                        <p>
                            You haven't applied for any events yet.
                        </p>

                        <button
                            className="browse-btn"
                            onClick={() => window.location.href = "/events"}
                        >
                            Browse Events
                        </button>

                    </div>

                ) : (

                    <div className="application-grid">

                        {applications.map((app) => (

                            <div
                                key={app.id}
                                className="application-card"
                            >

                                <h2>{app.eventTitle}</h2>

                                <p>
                                    <strong>Date:</strong> {formatDate(app.eventDate)}
                                </p>

                                <p>
                                    <strong>Status:</strong>

                                    <span className={`status ${app.status}`}>
                                        {app.status}
                                    </span>
                                </p>

                                {app.status === "COMPLETED" && app.attended && (

                                    <button
                                        className="certificate-btn"
                                        onClick={() =>
                                            window.open(
                                                `http://localhost:8080/api/certificate/${app.id}`,
                                                "_blank"
                                            )
                                        }
                                    >
                                        🏆 Download Certificate
                                    </button>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

}

export default Applications;