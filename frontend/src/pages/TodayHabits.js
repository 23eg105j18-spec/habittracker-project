import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./TodayHabits.css";

function TodayHabits() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user ? user.name : "User";

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayHabits = async () => {
      try {
        if (!user || !user.id) {
          setLoading(false);
          return;
        }

        const res = await API.get(`/habits/user/${user.id}`);
        setHabits(res.data || []);
      } catch (error) {
        console.log("Error fetching habits:", error);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayHabits();
  }, [user]);

  const updateHabitStatus = async (habitId, completed) => {
    try {
      const res = await API.put(`/habits/${habitId}/status`, {
        completedToday: completed,
      });

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === habitId ? res.data : habit
        )
      );
    } catch (error) {
      console.log("Error updating habit status:", error);
      alert("Failed to update habit");
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await API.delete(`/habits/${habitId}`);
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== habitId)
      );
      alert("Habit deleted successfully");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete habit");
    }
  };

  const completedCount = habits.filter((habit) => habit.completedToday).length;
  const pendingCount = habits.length - completedCount;
  const score =
    habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="today-page">
      <div className="today-container">
        <div className="today-header">
          <h1>{userName}'s Today Activities</h1>
          <p>Track your habits for today</p>

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="today-stats">
          <div className="today-stat-box completed-box">
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div className="today-stat-box pending-box">
            <h2>{pendingCount}</h2>
            <p>Pending</p>
          </div>

          <div className="today-stat-box score-box">
            <h2>{score}%</h2>
            <p>Score</p>
          </div>
        </div>

        <div className="today-habits-section">
          <h2>Today's Habits</h2>

          {loading ? (
            <p>Loading habits...</p>
          ) : habits.length === 0 ? (
            <p>No habits found for today.</p>
          ) : (
            habits.map((habit) => (
              <div key={habit.id} className="habit-card">
                <div className="habit-left">
                  <h3>{habit.title}</h3>
                  <p>
                    Goal Days:{" "}
                    {habit.goalDays && habit.goalDays > 0
                      ? habit.goalDays
                      : "Not set"}
                  </p>
                  <p>
                    Status:{" "}
                    {habit.completedToday ? "Completed Today" : "Pending"}
                  </p>
                </div>

                <div className="habit-right">
                  <div className="habit-actions">
                    <button
                      className="icon-btn complete"
                      onClick={() => updateHabitStatus(habit.id, true)}
                      title="Mark Complete"
                    >
                      ✔
                    </button>

                    <button
                      className="icon-btn not-complete"
                      onClick={() => updateHabitStatus(habit.id, false)}
                      title="Mark Pending"
                    >
                      ✖
                    </button>

                    <button
                      className="icon-btn edit"
                      onClick={() => navigate(`/edit/${habit.id}`)}
                      title="Edit Habit"
                    >
                      ✏
                    </button>

                    <button
                      className="icon-btn delete"
                      onClick={() => deleteHabit(habit.id)}
                      title="Delete Habit"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodayHabits;