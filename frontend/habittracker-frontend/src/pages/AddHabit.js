import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./AddHabit.css";

function AddHabit() {
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Error reading user:", error);
  }

  const [title, setTitle] = useState("");
  const [goalDays, setGoalDays] = useState("");
  const [showDaysInput, setShowDaysInput] = useState(false);
  const [message, setMessage] = useState("");

  const saveHabit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (!title.trim()) {
        setMessage("Please enter habit title");
        return;
      }

      if (!user || !user.id) {
        setMessage("User not found. Please login again.");
        return;
      }

      const habitData = {
        title: title.trim(),
        goalDays: showDaysInput ? Number(goalDays || 0) : 0,
        completedToday: false,
        currentStreak: 0,
        longestStreak: 0,
        userId: user.id,
      };

      console.log("Sending habit:", habitData);

      await API.post("/habits", habitData);

      alert("Habit added successfully");

      setTitle("");
      setGoalDays("");
      setShowDaysInput(false);

      navigate("/dashboard");
    } catch (error) {
      console.log("Error adding habit:", error);
      setMessage("Failed to save habit");
    }
  };

  return (
    <div className="add-habit-page">
      <div className="add-habit-card">
        <h2>Add New Habit</h2>

        {message && <p className="error-msg">{message}</p>}

        <form onSubmit={saveHabit}>
          <input
            type="text"
            placeholder="Enter habit title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <button
            type="button"
            className="toggle-days-btn"
            onClick={() => setShowDaysInput((prev) => !prev)}
          >
            {showDaysInput ? "Hide Goal Days" : "Set Goal Days"}
          </button>

          {showDaysInput && (
            <input
              type="number"
              placeholder="Enter goal days"
              value={goalDays}
              onChange={(e) => setGoalDays(e.target.value)}
              min="1"
            />
          )}

          <button type="submit" className="save-btn">
            Save Habit
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHabit;