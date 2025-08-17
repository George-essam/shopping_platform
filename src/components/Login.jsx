import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { STATUS } from "./status.js";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    STATUS.isLogged = true;
    if (location.state?.previousUrl) {
      navigate(location.state.previousUrl);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card shadow">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            id="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            required
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};
