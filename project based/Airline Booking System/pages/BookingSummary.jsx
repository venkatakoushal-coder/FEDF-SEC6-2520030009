import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BookingSummary() {
  const { selectedFlight, selectedSeat, user } = useApp();
  const navigate = useNavigate();

  if (!selectedFlight || !selectedSeat) { navigate("/"); return null; }

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Booking Summary</h4>
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow p-4">
            <h5 className="fw-bold text-primary mb-3">✈ Flight Details</h5>
            <table className="table table-bordered">
              <tbody>
                {[
                  ["Airline", selectedFlight.airline],
                  ["From", selectedFlight.from],
                  ["To", selectedFlight.to],
                  ["Date", selectedFlight.date],
                  ["Departure", selectedFlight.departure],
                  ["Arrival", selectedFlight.arrival],
                  ["Duration", selectedFlight.duration],
                  ["Stops", selectedFlight.stops === 0 ? "Non-stop" : `${selectedFlight.stops} Stop`],
                  ["Seat", selectedSeat],
                  ["Passenger", user?.name],
                ].map(([k, v]) => (
                  <tr key={k}><td className="fw-semibold text-muted">{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">Total Amount</h5>
              <h4 className="text-success fw-bold">₹{selectedFlight.price}</h4>
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/payment")}>
              Proceed to Payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}