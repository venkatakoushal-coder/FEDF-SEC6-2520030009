import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Payment() {
  const { selectedFlight, selectedSeat, user, addBooking, showNotification } = useApp();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ card: "", name: "", expiry: "", cvv: "", upi: "" });
  const [loading, setLoading] = useState(false);

  if (!selectedFlight) { navigate("/"); return null; }

  const handlePay = (e) => {
    e.preventDefault();
    if (method === "card" && (!form.card || !form.name || !form.expiry || !form.cvv)) {
      showNotification("Please fill all card details!", "error"); return;
    }
    if (method === "upi" && !form.upi) {
      showNotification("Please enter UPI ID!", "error"); return;
    }
    setLoading(true);
    setTimeout(() => {
      const booking = {
        id: "PNR" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        flight: selectedFlight,
        seat: selectedSeat,
        passenger: user.name,
        date: new Date().toLocaleDateString(),
      };
      addBooking(booking);
      showNotification("Payment Successful! Booking Confirmed 🎉");
      navigate("/ticket", { state: booking });
    }, 1500);
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Payment</h4>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <div className="alert alert-info">Amount to Pay: <strong>₹{selectedFlight?.price}</strong></div>

            <div className="d-flex gap-3 mb-4">
              {["card", "upi"].map(m => (
                <button key={m} className={`btn ${method === m ? "btn-primary" : "btn-outline-secondary"} flex-fill`}
                  onClick={() => setMethod(m)}>
                  {m === "card" ? "💳 Card" : "📱 UPI"}
                </button>
              ))}
            </div>

            <form onSubmit={handlePay}>
              {method === "card" ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input className="form-control" placeholder="1234 5678 9012 3456" maxLength={19}
                      value={form.card} onChange={e => setForm({ ...form, card: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cardholder Name</label>
                    <input className="form-control" placeholder="Name on card"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="row">
                    <div className="col mb-3">
                      <label className="form-label">Expiry</label>
                      <input className="form-control" placeholder="MM/YY"
                        value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
                    </div>
                    <div className="col mb-3">
                      <label className="form-label">CVV</label>
                      <input className="form-control" placeholder="***" maxLength={3}
                        value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input className="form-control" placeholder="yourname@upi"
                    value={form.upi} onChange={e => setForm({ ...form, upi: e.target.value })} />
                </div>
              )}
              <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? "Processing..." : `Pay ₹${selectedFlight?.price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}