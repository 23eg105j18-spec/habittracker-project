import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userName = user ? user.name : "User";

  const [habits, setHabits] = useState([]);
  const [motivation, setMotivation] = useState("");
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const motivationalQuotes = [
    "Great things happen when you stay committed to your goals.",
    "Small daily progress leads to big success.",
    "Discipline is the bridge between goals and achievement.",
    "Every habit you build shapes your future.",
    "Stay consistent. Results will follow.",
    "Success starts with one small step every day."
  ];

  const fetchHabits = async () => {
    try {
      if (!user || !user.id) return;

      const res = await API.get(`/habits/user/${user.id}`);
      setHabits(res.data || []);
    } catch (error) {
      console.log("Error fetching dashboard habits:", error);
    }
  };

  const refreshQuote = () => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setMotivation(randomQuote);
  };

  useEffect(() => {
    fetchHabits();
    refreshQuote();
    // eslint-disable-next-line
  }, []);

  const totalHabits = habits.length;
  const completedToday = habits.filter((habit) => habit.completedToday).length;

  const currentStreak =
    habits.length > 0
      ? Math.max(...habits.map((habit) => habit.currentStreak || 0))
      : 0;

  const successRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const getUnlockedReward = (streak) => {
    if (streak >= 15) return "🛍 Buy something you like";
    if (streak >= 10) return "🎬 Watch a movie";
    if (streak >= 5) return "🍫 Enjoy your favorite snack";
    if (streak >= 1) return "🎧 Listen to your favorite song";
    return "";
  };

  const getNextRewardText = (streak) => {
    if (streak < 1) return "Complete streak 1 to unlock your first reward";
    if (streak < 5) return "Complete streak 5 to unlock your next reward";
    if (streak < 10) return "Complete streak 10 to unlock your next reward";
    if (streak < 15) return "Complete streak 15 to unlock your next reward";
    return "All rewards unlocked";
  };

  const rewardText = getUnlockedReward(currentStreak);
  const hasUnlockedReward = currentStreak >= 1;

  return (
    <div className="dashboard-page">
      <div className="top-banner">
        <div className="banner-left">
          <h1>Welcome, {userName}</h1>
          <div className="wave-icon">👋</div>
          <p>Track your progress and stay consistent every day</p>
        </div>

        <button
          className="refresh-btn"
          onClick={() => {
            fetchHabits();
            refreshQuote();
          }}
        >
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-box purple">
          <div className="stat-icon">🕸</div>
          <h3>Total Habits</h3>
          <h2>{totalHabits}</h2>
        </div>

        <div className="stat-box green">
          <div className="stat-icon">✅</div>
          <h3>Completed Today</h3>
          <h2>{completedToday}</h2>
        </div>

        <div className="stat-box orange">
          <div className="stat-icon">🔥</div>
          <h3>Current Streak</h3>
          <h2>{currentStreak}</h2>
        </div>

        <div className="stat-box blue">
          <div className="stat-icon">➕</div>
          <h3>Success Rate</h3>
          <h2>{successRate}%</h2>
        </div>
      </div>

      <div className="dashboard-lower">
        <div className="motivation-card">
          <h2>🌱 Today's Motivation</h2>
          <p>{motivation}</p>

          <div className="reward-box">
            <h3>🎁 Streak Rewards</h3>

            {hasUnlockedReward ? (
              <div className="reward-action-box">
                <p className="reward-success">
                  ✅ You completed streak {currentStreak}. Unlock your reward.
                </p>

                <button
                  className="unlock-btn"
                  onClick={() => setShowRewardPopup(true)}
                >
                  Unlock Reward
                </button>
              </div>
            ) : (
              <p className="reward-pending">{getNextRewardText(currentStreak)}</p>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <button onClick={() => navigate("/today")}>Today's Activities</button>
          <button onClick={() => navigate("/add-habit")}>Add Habit</button>
          <button onClick={() => navigate("/reminders")}>Reminder System 🔔</button>
        </div>
      </div>

      {showRewardPopup && (
        <div className="reward-popup-overlay">
          <div className="reward-popup">
            <h2>🎉 Reward Unlocked!</h2>
            <p className="popup-streak-text">
              You completed streak {currentStreak}
            </p>

            <div className="popup-reward-box">
              <p>{rewardText}</p>
            </div>

            <button
              className="close-popup-btn"
              onClick={() => setShowRewardPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;