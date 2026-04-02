import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        name,
        password
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-page-column">
      <div className="habit-icons">
        <span>📚</span>
        <span>💧</span>
        <span>🏃</span>
        <span>😴</span>
      </div>

      <div className="auth-card">
        <h2>Habit Tracker Login</h2>
        <p className="auth-subtext">Build better habits every day</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch-link" onClick={() => navigate("/register")}>
          Don&apos;t have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;