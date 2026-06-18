import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BookingHistory() {
  const { bookings, user } = useApp();
  const navigate = useNavigate();

  if (!user) { navigate("/login"); return null; }

  const myBookings = bookings.filter(b => b.passenger === user.name);

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">My Bookings</h4>
      {myBookings.length === 0 ? (
        <div className="alert alert-info text-center">
          No bookings yet. <a href="/" className="alert-link">Search for flights</a>
        </div>
      ) : myBookings.map((b, i) => (
        <div className="card shadow-sm mb-3 p-3" key={i}>
          <div className="row align-items-center">
            <div className="col-md-1"><span className="badge bg-warning text-dark">PNR</span></div>
            <div className="col-md-2 fw-bold text-primary small">{b.id}</div>
            <div className="col-md-2 fw-semibold">{b.flight.airline}</div>
            <div className="col-md-3">{b.flight.from} → {b.flight.to}</div>
            <div className="col-md-2 text-muted small">{b.flight.date}</div>
            <div className="col-md-1">Seat: <strong>{b.seat}</strong></div>
            <div className="col-md-1 text-success fw-bold">₹{b.flight.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}