import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { toast } from "react-toastify";
import "./Admin.css";
import { formatDate } from "../../../utils/formatDate";


import {
    FaCalendarAlt,
    FaClipboardList,
    FaUsers,
    FaCheckCircle
} from "react-icons/fa";

function AdminDashboard() {

    const [events, setEvents] = useState([]);
    const [applications, setApplications] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        location: "",
        date: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const eventRes = await api.get("/events");
            const appRes = await api.get("/applications/all");

            setEvents(eventRes.data);
            setApplications(appRes.data);

        } catch (err) {

            console.log(err);

        }

    };

    const deleteEvent = async (id) => {

        if (!window.confirm("Delete this event?")) {
            return;
        }

        try {

            await api.delete(`/events/delete/${id}`);

            toast.success("Event deleted successfully!");

            loadData();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to delete event"
            );

        }

    };

    const createEvent = async () => {

        if (
            !newEvent.title ||
            !newEvent.location ||
            !newEvent.date
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {

            await api.post("/events/create", {
                title: newEvent.title,
                description: newEvent.description,
                location: newEvent.location,
                date: newEvent.date
            });

            toast.success("Event created successfully!");

            setShowForm(false);

            setNewEvent({
                title: "",
                description: "",
                location: "",
                date: ""
            });

            loadData();

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Unable to create event."
            );

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(
                `/applications/${id}/status`,
                {
                    status: status
                }
            );

            toast.success(`Application ${status.toLowerCase()} successfully!`);
            loadData();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to update status"
            );

        }

    };
    const completed = applications.filter(
        app => app.status === "COMPLETED"
    ).length;

    const pending = applications.filter(
        app => app.status === "PENDING"
    ).length;

    return (

        <AdminLayout>

            <div className="admin">

                <div className="admin-header">

                    <h1>Admin Dashboard 👨‍💼</h1>

                    <p>Manage events and volunteers.</p>

                </div>

                <div className="stats">

                    <div className="stat-card">

                        <h2><FaCalendarAlt /></h2>

                        <h3>Total Events</h3>

                        <span>{events.length}</span>

                    </div>

                    <div className="stat-card">

                        <h2><FaClipboardList /></h2>

                        <h3>Applications</h3>

                        <span>{applications.length}</span>

                    </div>

                    <div className="stat-card">

                        <h2><FaUsers /></h2>

                        <h3>Pending</h3>

                        <span>{pending}</span>

                    </div>

                    <div className="stat-card">

                        <h2><FaCheckCircle /></h2>

                        <h3>Completed</h3>

                        <span>{completed}</span>

                    </div>

                </div>

                {/* Create Button */}

                <div className="admin-actions">

                    <button
                        className="create-btn"
                        onClick={() => setShowForm(true)}
                    >
                        + Create Event
                    </button>

                </div>

                {/* Modal */}

                {showForm && (

                    <div className="modal">

                        <div className="modal-content">

                            <h2>Create Event</h2>

                            <input
                                type="text"
                                placeholder="Title"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({
                                        ...newEvent,
                                        title: e.target.value
                                    })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                value={newEvent.description}
                                onChange={(e) =>
                                    setNewEvent({
                                        ...newEvent,
                                        description: e.target.value
                                    })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Location"
                                value={newEvent.location}
                                onChange={(e) =>
                                    setNewEvent({
                                        ...newEvent,
                                        location: e.target.value
                                    })
                                }
                            />

                            <input
                                type="datetime-local"
                                value={newEvent.date}
                                onChange={(e) =>
                                    setNewEvent({
                                        ...newEvent,
                                        date: e.target.value
                                    })
                                }
                            />

                            <div className="modal-buttons">

                                <button
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={createEvent}
                                >
                                    Create
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                <h2 className="section-title">
                    Manage Events
                </h2>

                <div className="event-list">

                    {events.slice(0, 3).map(event => (

                        <div
                            className="event-item"
                            key={event.id}
                        >

                            <div>

                                <h3>{event.title}</h3>

                                <p>📍 {event.location}</p>

                                <p>
                                    📅 {formatDate(event.date)}
                                </p>

                            </div>

                            <button
                                className="delete-btn"
                                onClick={() => deleteEvent(event.id)}
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>
                <div className="view-all-container">

                    <button
                        className="view-all-btn"
                        onClick={() => window.location.href = "/admin/events"}
                    >
                        View All Events →
                    </button>

                </div>

                <h2 className="section-title">
                    Manage Applications
                </h2>

                <div className="application-list">

                    {applications.slice(0, 3).map(app => (

                        <div
                            className="application-item"
                            key={app.id}
                        >

                            <div className="application-info">

                                <h3>👤 {app.userName}</h3>

                                <p>📅 {app.eventTitle}</p>

                                <span className={`status-badge ${app.status}`}>
                                    {app.status}
                                </span>

                            </div>

                            <div className="actions">

                                {app.status === "PENDING" && (

                                    <>
                                        <button
                                            className="approve-btn"
                                            onClick={() =>
                                                updateStatus(app.id, "APPROVED")
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() =>
                                                updateStatus(app.id, "REJECTED")
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
                                            updateStatus(app.id, "COMPLETED")
                                        }
                                    >
                                        Complete
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

                <div className="view-all-container">

                    <button
                        className="view-all-btn"
                        onClick={() => window.location.href = "/admin/applications"}
                    >
                        View All Applications →
                    </button>

                </div>

            </div>


        </AdminLayout>

    );

}

export default AdminDashboard;