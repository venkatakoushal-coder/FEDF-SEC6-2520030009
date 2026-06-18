import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login, showNotification } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      showNotification("Please fill all fields!", "error"); return;
    }
    // Admin check
    if (form.username === "admin" && form.password === "admin123") {
      login({ name: "Admin", username: "admin", isAdmin: true });
      showNotification("Welcome Admin!");
      navigate("/admin"); return;
    }
    // Regular user
    const users = JSON.parse(localStorage.getItem("skybook_users") || "[]");
    const found = users.find(u => u.username === form.username && u.password === form.password);
    if (!found) { showNotification("Invalid username or password!", "error"); return; }
    login({ name: found.name, username: found.username, isAdmin: false });
    showNotification(`Welcome back, ${found.name}!`);
    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center fw-bold mb-4">✈ Login to SkyBook</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" placeholder="Enter username"
                  value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="text-center mt-3 mb-0">Don't have an account? <Link to="/register">Sign Up</Link></p>
            <p className="text-center text-muted small mt-1">Admin: username <strong>admin</strong> / password <strong>admin123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}