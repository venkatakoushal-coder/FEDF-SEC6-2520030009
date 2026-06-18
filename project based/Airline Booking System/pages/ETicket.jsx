import { useLocation, useNavigate } from "react-router-dom";

export default function ETicket() {
  const { state: booking } = useLocation();
  const navigate = useNavigate();

  if (!booking) { navigate("/"); return null; }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow border-success border-2" id="ticket">
            <div className="card-header bg-success text-white text-center py-3">
              <h4 className="fw-bold mb-0">✅ Booking Confirmed!</h4>
              <p className="mb-0">Your e-ticket is ready</p>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-3">
                <h2 className="fw-bold text-primary">✈ SkyBook</h2>
                <h5 className="text-muted">E-Ticket / Boarding Pass</h5>
                <div className="badge bg-warning text-dark fs-6 mt-1">PNR: {booking.id}</div>
              </div>
              <hr />
              <div className="row text-center mb-3">
                <div className="col">
                  <h3 className="fw-bold">{booking.flight.departure}</h3>
                  <h5>{booking.flight.from}</h5>
                </div>
                <div className="col text-muted">
                  <div>──✈──</div>
                  <small>{booking.flight.duration}</small>
                </div>
                <div className="col">
                  <h3 className="fw-bold">{booking.flight.arrival}</h3>
                  <h5>{booking.flight.to}</h5>
                </div>
              </div>
              <hr />
              <table className="table table-sm">
                <tbody>
                  {[
                    ["Passenger", booking.passenger],
                    ["Airline", booking.flight.airline],
                    ["Date", booking.flight.date],
                    ["Seat", booking.seat],
                    ["Class", booking.flight.class],
                    ["Booked On", booking.date],
                    ["Amount Paid", `₹${booking.flight.price}`],
                  ].map(([k, v]) => (
                    <tr key={k}><td className="text-muted">{k}</td><td className="fw-semibold">{v}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary flex-fill" onClick={() => window.print()}>🖨 Print Ticket</button>
                <button className="btn btn-outline-primary flex-fill" onClick={() => navigate("/history")}>📋 My Bookings</button>
                <button className="btn btn-outline-secondary flex-fill" onClick={() => navigate("/")}>🏠 Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}