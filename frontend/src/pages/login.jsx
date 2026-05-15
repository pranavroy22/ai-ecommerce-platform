import { useState } from "react";
import API from "../api";
import "./login.css";
import { toast } from "react-toastify";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // 🔥 LOGIN
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
      console.error("LOGIN ERROR:", err.response?.data || err.message);

      toast.error("Invalid credentials or server waking up 🚀");
    }
  };

  // 🔥 SIGNUP
  const handleSignup = async () => {
    try {
      await API.post("/users/", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🎉");

      // 🔥 AUTO LOGIN
      const loginRes = await API.post("/login", {
        email,
        password,
      });

      const token = loginRes.data.access_token;

      localStorage.setItem("token", token);

      window.location.reload();
    } catch (err) {
      console.error("SIGNUP ERROR:", err.response?.data || err.message);

      toast.error("Signup failed ❌");
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
          <h2>{isSignup ? "Create Account 🚀" : "Welcome Back 👋"}</h2>

          <p className="subtitle">
            {isSignup
              ? "Signup to continue shopping"
              : "Login to continue shopping"}
          </p>

          {/* 🔥 NAME FIELD */}
          {isSignup && (
            <input
              className="login-input"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

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

          {/* 🔥 BUTTON */}
          <button
            className="login-btn"
            onClick={isSignup ? handleSignup : handleLogin}
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          {/* 🔥 TOGGLE */}
          <p className="toggle-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}

            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Signup"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
