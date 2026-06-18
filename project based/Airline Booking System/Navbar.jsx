import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout, showNotification } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">✈ SkyBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {user && <li className="nav-item"><Link className="nav-link" to="/history">My Bookings</Link></li>}
            {user?.isAdmin && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
          </ul>
          <div className="d-flex gap-2">
            {user ? (
              <>
                <span className="navbar-text text-white me-2">👤 {user.name}</span>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                <Link to="/register" className="btn btn-light btn-sm text-primary fw-bold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
