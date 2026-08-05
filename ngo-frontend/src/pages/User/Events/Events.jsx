import { useEffect, useState } from "react";
import api from "../../../api/api";
import DashboardLayout from "../../../layouts/UserLayout/UserLayout";
import EventCard from "../../../components/EventCard/EventCard";
import "./Events.css";
import { toast } from "react-toastify";

function Events() {

    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadEvents(page);
    }, [page]);

    const loadEvents = async (currentPage) => {

        try {

            const response = await api.get(
                `/events/page?page=${currentPage}&size=5`
            );

            setEvents(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (err) {

            console.error(err);
            toast.error("Unable to load events");

        }

    };

    const apply = async (id) => {

        try {

            await api.post(`/applications/apply/${id}`);

            toast.success("Applied Successfully!");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Application Failed"
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="events-container">

                <h1>Available Events</h1>

                <div className="events-grid">

                    {events.map((event) => (

                        <EventCard
                            key={event.id}
                            event={event}
                            onApply={apply}
                        />

                    ))}

                </div>

                {totalPages > 1 && (

                    <div className="pagination">

                        <button
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            &laquo;
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (

                            <button
                                key={index}
                                className={page === index ? "active-page" : ""}
                                onClick={() => setPage(index)}
                            >
                                {index + 1}
                            </button>

                        ))}

                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(page + 1)}
                        >
                            &raquo;
                        </button>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}

export default Events;