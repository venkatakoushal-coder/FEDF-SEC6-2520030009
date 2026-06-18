import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function SeatSelection() {
  const { selectedFlight, setSelectedSeat, showNotification } = useApp();
  const navigate = useNavigate();
  const [picked, setPicked] = useState(null);

  if (!selectedFlight) { navigate("/"); return null; }

  const bookedSeats = selectedFlight.seats.slice(0, 2);
  const allSeats = ["A1","A2","A3","B1","B2","B3","C1","C2","C3","D1","D2","D3"];

  const handleContinue = () => {
    if (!picked) { showNotification("Please select a seat!", "error"); return; }
    setSelectedSeat(picked);
    navigate("/summary");
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-1">Select Your Seat</h4>
      <p className="text-muted mb-4">{selectedFlight.airline} · {selectedFlight.from} → {selectedFlight.to}</p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm text-center">
            <div className="d-flex justify-content-center gap-3 mb-3">
              <span><span className="badge bg-success me-1">&nbsp;&nbsp;</span>Available</span>
              <span><span className="badge bg-danger me-1">&nbsp;&nbsp;</span>Booked</span>
              <span><span className="badge bg-primary me-1">&nbsp;&nbsp;</span>Selected</span>
            </div>

            <div className="bg-secondary text-white rounded mb-3 p-2 fw-bold">✈ FRONT</div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              {allSeats.map(seat => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = picked === seat;
                return (
                  <button key={seat}
                    className={`btn btn-sm ${isBooked ? "btn-danger disabled" : isSelected ? "btn-primary" : "btn-outline-success"}`}
                    style={{ width: "55px" }}
                    onClick={() => !isBooked && setPicked(seat)}>
                    {seat}
                  </button>
                );
              })}
            </div>

            {picked && <div className="alert alert-info mt-3">Selected: <strong>{picked}</strong></div>}
            <button className="btn btn-primary mt-3 px-5" onClick={handleContinue}>Continue →</button>
          </div>
        </div>
      </div>
    </div>
  );
}