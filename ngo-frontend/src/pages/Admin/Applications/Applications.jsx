import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { formatDate } from "../../../utils/formatDate";
import { toast } from "react-toastify";
import "./Applications.css";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await api.get("/applications/all");

            setApplications(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load applications");

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/applications/${id}/status`, {
                status: status
            });

            toast.success(
                `Application ${status.toLowerCase()} successfully!`
            );

            loadApplications();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to update status"
            );

        }

    };

    const filteredApplications = applications.filter(app => {

        const keyword = search.toLowerCase();

        return (

            app.userName.toLowerCase().includes(keyword) ||

            app.userEmail.toLowerCase().includes(keyword) ||

            app.eventTitle.toLowerCase().includes(keyword)

        );

    });

    return (

        <AdminLayout>

            <div className="admin-applications">

                <div className="page-header">

                    <h1>Volunteer Applications</h1>

                    <input
                        className="search-box"
                        type="text"
                        placeholder="🔍 Search volunteer or event..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Statistics */}

                <div className="stats">

                    <div className="stat-card">
                        <h3>Total</h3>
                        <span>{applications.length}</span>
                    </div>

                    <div className="stat-card">
                        <h3>Pending</h3>
                        <span>
                            {
                                applications.filter(
                                    app => app.status === "PENDING"
                                ).length
                            }
                        </span>
                    </div>

                    <div className="stat-card">
                        <h3>Approved</h3>
                        <span>
                            {
                                applications.filter(
                                    app => app.status === "APPROVED"
                                ).length
                            }
                        </span>
                    </div>

                    <div className="stat-card">
                        <h3>Completed</h3>
                        <span>
                            {
                                applications.filter(
                                    app => app.status === "COMPLETED"
                                ).length
                            }
                        </span>
                    </div>

                </div>

                {/* Application Cards */}

                <div className="application-list">

                    {filteredApplications.length === 0 ? (

                        <div className="empty-state">

                            <h2>No Applications Found</h2>

                            <p>Try another search.</p>

                        </div>

                    ) : (

                        filteredApplications.map((app) => (

                            <div
                                className="application-card"
                                key={app.id}
                            >

                                <h2>{app.userName}</h2>

                                <p>
                                    <strong>Email:</strong> {app.userEmail}
                                </p>

                                <p>
                                    <strong>Event:</strong> {app.eventTitle}
                                </p>

                                <p>
                                    <strong>Date:</strong> {formatDate(app.eventDate)}
                                </p>

                                <p>

                                    <strong>Status:</strong>

                                    <span className={`status ${app.status}`}>

                                        {app.status === "PENDING" && "🟡 Pending"}

                                        {app.status === "APPROVED" && "🟢 Approved"}

                                        {app.status === "REJECTED" && "🔴 Rejected"}

                                        {app.status === "COMPLETED" && "🔵 Completed"}

                                    </span>

                                </p>

                                <div className="buttons">

                                    {app.status === "PENDING" && (

                                        <>

                                            <button
                                                className="approve-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        app.id,
                                                        "APPROVED"
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    updateStatus(
                                                        app.id,
                                                        "REJECTED"
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </>

                                    )}

                                    {app.status === "APPROVED" && (

                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    app.id,
                                                    "COMPLETED"
                                                )
                                            }
                                        >
                                            Complete
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </AdminLayout>

    );

}

export default Applications;