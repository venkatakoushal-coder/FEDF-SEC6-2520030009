import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { flights } from "../data/flights";

export default function Home() {
  const navigate = useNavigate();
  const { showNotification } = useApp();
  const [form, setForm] = useState({ from: "", to: "", date: "", class: "Economy" });

  const cities = [...new Set(flights.map(f => f.from).concat(flights.map(f => f.to)))];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) {
      showNotification("Please fill all fields!", "error");
      return;
    }
    if (form.from === form.to) {
      showNotification("Source and destination can't be same!", "error");
      return;
    }
    navigate("/results", { state: form });
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center py-4">
          <h1 className="display-4 fw-bold">✈ Find Your Perfect Flight</h1>
          <p className="lead">Search, compare and book flights instantly</p>

          <div className="card shadow-lg mt-4 p-4 mx-auto" style={{ maxWidth: "800px" }}>
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label text-dark fw-semibold">From</label>
                  <select className="form-select" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })}>
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label text-dark fw-semibold">To</label>
                  <select className="form-select" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })}>
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label text-dark fw-semibold">Date</label>
                  <input type="date" className="form-control" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <label className="form-label text-dark fw-semibold">Class</label>
                  <select className="form-select" value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}>
                    <option>Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg mt-4 px-5">Search Flights</button>
            </form>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Why Choose SkyBook?</h2>
        <div className="row g-4 text-center">
          {[
            { icon: "🔍", title: "Smart Search", desc: "Search flights across all major airlines instantly" },
            { icon: "💺", title: "Seat Selection", desc: "Pick your preferred seat on an interactive map" },
            { icon: "🎫", title: "Instant E-Ticket", desc: "Get your ticket with PNR right after booking" },
            { icon: "📋", title: "Booking History", desc: "Track all your past and upcoming flights" },
          ].map((f, i) => (
            <div className="col-md-3" key={i}>
              <div className="card h-100 shadow-sm border-0 p-3">
                <div className="fs-1 mb-2">{f.icon}</div>
                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-light py-4">
        <div className="container">
          <div className="row text-center">
            {[["200+", "Airlines"], ["500+", "Destinations"], ["50K+", "Bookings"], ["4.8★", "Rating"]].map(([num, lbl]) => (
              <div className="col-6 col-md-3" key={lbl}>
                <h3 className="fw-bold text-primary">{num}</h3>
                <p className="text-muted">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}