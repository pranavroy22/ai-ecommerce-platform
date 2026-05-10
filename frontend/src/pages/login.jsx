import { useState } from "react";
import API from "../api";
import "./login.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      toast.success("Login successful 🚀");

      window.location.reload();
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data);

      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="overlay">
          <h1>Pranav's Shop</h1>

          <p>Modern ecommerce experience built with React + FastAPI</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p className="subtitle">Login to continue shopping</p>

          <input
            className="login-input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
