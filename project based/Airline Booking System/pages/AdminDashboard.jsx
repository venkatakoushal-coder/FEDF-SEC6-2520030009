import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { flights } from "../data/flights";

export default function AdminDashboard() {
  const { user, bookings } = useApp();
  const navigate = useNavigate();

  if (!user?.isAdmin) { navigate("/"); return null; }

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">🛠 Admin Dashboard</h4>

      <div className="row g-3 mb-4">
        {[
          ["Total Flights", flights.length, "primary"],
          ["Total Bookings", bookings.length, "success"],
          ["Users Registered", JSON.parse(localStorage.getItem("skybook_users") || "[]").length, "info"],
          ["Revenue", `₹${bookings.reduce((s, b) => s + b.flight.price, 0)}`, "warning"],
        ].map(([label, val, color]) => (
          <div className="col-md-3" key={label}>
            <div className={`card text-white bg-${color} p-3 text-center shadow`}>
              <h3 className="fw-bold">{val}</h3>
              <p className="mb-0">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <h5 className="fw-bold mb-3">All Flights</h5>
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover table-sm">
          <thead className="table-primary">
            <tr>{["ID","Airline","From","To","Date","Dep","Arr","Price","Stops"].map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {flights.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td><td>{f.airline}</td><td>{f.from}</td><td>{f.to}</td>
                <td>{f.date}</td><td>{f.departure}</td><td>{f.arrival}</td>
                <td>₹{f.price}</td><td>{f.stops === 0 ? "Non-stop" : f.stops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 className="fw-bold mb-3">All Bookings</h5>
      {bookings.length === 0 ? <p className="text-muted">No bookings yet.</p> : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-sm">
            <thead className="table-success">
              <tr>{["PNR","Passenger","Airline","From","To","Seat","Price","Date"].map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.id}</td><td>{b.passenger}</td><td>{b.flight.airline}</td>
                  <td>{b.flight.from}</td><td>{b.flight.to}</td><td>{b.seat}</td>
                  <td>₹{b.flight.price}</td><td>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}