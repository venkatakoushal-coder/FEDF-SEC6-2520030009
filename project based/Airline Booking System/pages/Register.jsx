import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { showNotification } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", username: "", password: "", confirm: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.password || !form.confirm) {
      showNotification("Please fill all fields!", "error"); return;
    }
    if (form.password !== form.confirm) {
      showNotification("Passwords do not match!", "error"); return;
    }
    const users = JSON.parse(localStorage.getItem("skybook_users") || "[]");
    if (users.find(u => u.username === form.username)) {
      showNotification("Username already taken!", "error"); return;
    }
    users.push({ name: form.name, username: form.username, password: form.password });
    localStorage.setItem("skybook_users", JSON.stringify(users));
    showNotification("Account created! Please login.");
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center fw-bold mb-4">✈ Create Account</h3>
            <form onSubmit={handleSubmit}>
              {[["Full Name", "name", "text", "Enter your name"],
                ["Username", "username", "text", "Choose a username"],
                ["Password", "password", "password", "Create a password"],
                ["Confirm Password", "confirm", "password", "Repeat password"]
              ].map(([label, key, type, ph]) => (
                <div className="mb-3" key={key}>
                  <label className="form-label">{label}</label>
                  <input type={type} className="form-control" placeholder={ph}
                    value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-100">Create Account</button>
            </form>
            <p className="text-center mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}