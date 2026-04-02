import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });
      

      setError("");
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-page-column">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtext">Start your consistency journey</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <p className="switch-link" onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
export default Register;