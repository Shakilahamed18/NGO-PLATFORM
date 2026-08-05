import "./EventCard.css";
import { formatDate } from "../../utils/formatDate";

function EventCard({ event, onApply }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="event-card">

      <h2>{event.title}</h2>

      <div className="event-info">

        <p>
          <strong>📍 Location</strong>
          <br />
          {event.location}
        </p>

        <p>
          <strong>📅 Date</strong>
          <br />
          {formatDate(event.date)}
        </p>

      </div>

      <p className="event-description">
        {event.description}
      </p>

      <button
        className="apply-btn"
        onClick={() => onApply(event.id)}
      >
        Apply Now
      </button>

    </div>
  );
}

export default EventCard;