import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { flights } from "../data/flights";

export default function SearchResults() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setSelectedFlight, user, showNotification } = useApp();
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filterAirline, setFilterAirline] = useState("All");
  const [filterStops, setFilterStops] = useState("All");
  const [sortBy, setSortBy] = useState("price");

  if (!state) { navigate("/"); return null; }

  let results = flights.filter(f =>
    f.from.toLowerCase() === state.from.toLowerCase() &&
    f.to.toLowerCase() === state.to.toLowerCase()
  );

  if (filterAirline !== "All") results = results.filter(f => f.airline === filterAirline);
  if (filterStops !== "All") results = results.filter(f => f.stops === Number(filterStops));
  results = results.filter(f => f.price <= maxPrice);
  results = [...results].sort((a, b) => sortBy === "price" ? a.price - b.price : a.departure.localeCompare(b.departure));

  const airlines = ["All", ...new Set(flights.map(f => f.airline))];

  const handleSelect = (flight) => {
    if (!user) { showNotification("Please login to book a flight!", "error"); navigate("/login"); return; }
    setSelectedFlight(flight);
    navigate("/seats");
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-1">Flights from <span className="text-primary">{state.from}</span> to <span className="text-primary">{state.to}</span></h4>
      <p className="text-muted mb-4">{state.date} · {state.class} · {results.length} flights found</p>

      <div className="row g-4">
        {/* Filters */}
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-bold mb-3">Filters</h6>
            <label className="form-label">Max Price: ₹{maxPrice}</label>
            <input type="range" className="form-range mb-3" min="1000" max="10000" step="100"
              value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
            <label className="form-label">Airline</label>
            <select className="form-select mb-3" value={filterAirline} onChange={e => setFilterAirline(e.target.value)}>
              {airlines.map(a => <option key={a}>{a}</option>)}
            </select>
            <label className="form-label">Stops</label>
            <select className="form-select mb-3" value={filterStops} onChange={e => setFilterStops(e.target.value)}>
              <option value="All">All</option>
              <option value="0">Non-stop</option>
              <option value="1">1 Stop</option>
            </select>
            <label className="form-label">Sort By</label>
            <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="price">Price</option>
              <option value="departure">Departure</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="col-md-9">
          {results.length === 0 ? (
            <div className="alert alert-warning">No flights found. Try adjusting your filters.</div>
          ) : results.map(flight => (
            <div className="card shadow-sm mb-3 p-3" key={flight.id}>
              <div className="row align-items-center">
                <div className="col-md-2 fw-bold text-primary">{flight.airline}</div>
                <div className="col-md-3 text-center">
                  <div className="fw-bold fs-5">{flight.departure}</div>
                  <small className="text-muted">{flight.from}</small>
                </div>
                <div className="col-md-2 text-center text-muted small">
                  <div>──✈──</div>
                  <div>{flight.duration}</div>
                  <div>{flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop`}</div>
                </div>
                <div className="col-md-3 text-center">
                  <div className="fw-bold fs-5">{flight.arrival}</div>
                  <small className="text-muted">{flight.to}</small>
                </div>
                <div className="col-md-2 text-end">
                  <div className="fw-bold text-success fs-5">₹{flight.price}</div>
                  <button className="btn btn-primary btn-sm mt-1" onClick={() => handleSelect(flight)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}