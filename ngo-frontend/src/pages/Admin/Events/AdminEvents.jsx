import { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/formatDate";
import "./AdminEvents.css";

function AdminEvents() {

    const [events, setEvents] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingEvent, setEditingEvent] = useState(null);

    const [selectedQr, setSelectedQr] = useState(null);

    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        location: "",
        date: ""
    });

    const showQr = (id) => {
        setSelectedQr(id);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            const response = await api.get("/events");

            setEvents(response.data);

        } catch (err) {

            console.log(err);

            toast.error("Unable to load events");

        }

    };

    const deleteEvent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/events/delete/${id}`);

            toast.success("Event deleted successfully!");

            loadEvents();

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Unable to delete event."
            );

        }

    };

    const createEvent = async () => {

        if (
            !newEvent.title ||
            !newEvent.location ||
            !newEvent.date
        ) {
            toast.error("Please fill all required fields.");
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

            setEditingEvent(null);

            setNewEvent({
                title: "",
                description: "",
                location: "",
                date: ""
            });

            loadEvents();

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Unable to create event."
            );

        }

    };

    const editEvent = (event) => {

        setEditingEvent(event);

        setNewEvent({
            title: event.title,
            description: event.description,
            location: event.location,
            date: event.date.slice(0, 16)
        });

        setShowForm(true);

    };

    const updateEvent = async () => {

        console.log("Updating Event:", newEvent);

        try {

            await api.put(
                `/events/update/${editingEvent.id}`,
                newEvent
            );

            toast.success("Event updated successfully!");

            setShowForm(false);

            setEditingEvent(null);

            loadEvents();

        } catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Unable to update event."
            );

        }

    };


    return (

        <AdminLayout>
            {showForm && (

                <div className="modal">

                    <div className="modal-content">

                        <h2>
                            {editingEvent ? "Edit Event" : "Create Event"}
                        </h2>

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
                                onClick={() => {

                                    setShowForm(false);

                                    setEditingEvent(null);

                                    setNewEvent({
                                        title: "",
                                        description: "",
                                        location: "",
                                        date: ""
                                    });

                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={
                                    editingEvent
                                        ? updateEvent : createEvent
                                }
                            >
                                {editingEvent ? "Update" : "Create"}
                            </button>

                        </div>

                    </div>

                </div>

            )}
            <div className="admin-events">

                <div className="page-header">

                    <h1>Manage Events</h1>

                    <button
                        className="create-btn"
                        onClick={() => {

                            setEditingEvent(null);

                            setNewEvent({
                                title: "",
                                description: "",
                                location: "",
                                date: ""
                            });

                            setShowForm(true);

                        }}
                    >
                        + Create Event
                    </button>

                </div>

                <div className="event-list">

                    {events.map((event) => (

                        <div
                            className="event-card"
                            key={event.id}
                        >

                            <h2>{event.title}</h2>

                            <p>📍 {event.location}</p>

                            <p>📅 {formatDate(event.date)}</p>

                            <p>{event.description}</p>

                            <div className="event-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => editEvent(event)}

                                >
                                    Edit
                                </button>

                                <button
                                    className="qr-btn"
                                    onClick={() => showQr(event.id)}
                                >
                                    Show QR
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteEvent(event.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {selectedQr && (

                <div className="modal">

                    <div className="modal-content">

                        <h2>Event QR Code</h2>

                        <img
                            src={`http://localhost:8080/api/events/${selectedQr}/qr`}
                            alt="QR Code"
                            className="qr-image"
                        />

                        <div className="modal-buttons">

                            <button
                                onClick={() => setSelectedQr(null)}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </AdminLayout>

    );

}

export default AdminEvents;